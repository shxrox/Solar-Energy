
import React from 'react';
import { 
  useGetSolarUnitForUserQuery, 
  useGetAnomalyStatsQuery, 
  useGetMyAnomaliesQuery, 
  useResolveAnomalyMutation 
} from '../../lib/redux/query';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CheckCircle, Clock, ShieldAlert, Loader2 } from 'lucide-react';

const AnomaliesPage = () => {
  const { data: unit, isLoading: unitLoading } = useGetSolarUnitForUserQuery();
  
  // 1. Fetch Stats (KPI Cards & Pie Chart)
  const { data: stats, isLoading: statsLoading } = useGetAnomalyStatsQuery(unit?._id, {
    skip: !unit?._id,
  });

  // 2. Fetch List (Recent Incident Log)
  const { data: anomaliesList, isLoading: listLoading } = useGetMyAnomaliesQuery(undefined, {
    pollingInterval: 2000, 
  });

  // 3. Resolve Mutation
  const [resolveAnomaly, { isLoading: isResolving }] = useResolveAnomalyMutation();

  // --- LOADING STATE ---
  if (unitLoading || statsLoading || listLoading) {
     return (
       <div className="p-10 text-center flex flex-col items-center justify-center space-y-3">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
         <p className="animate-pulse text-base-content/60">Loading system health data...</p>
       </div>
     );
  }
  
  // --- EMPTY STATE ---
  if (!unit) return <div className="p-10 text-center text-base-content/60">No solar unit linked to this account.</div>;

  const { summary, distribution } = stats || {};

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-base-content">System Monitoring</h1>
        
        {/* Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-success/10 text-success border border-success/20">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          Live Monitoring Active
        </div>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Active Anomalies (Red/Error) */}
        <div className="flex items-center gap-4">
          <div className="text-error"><ShieldAlert size={32} /></div>
          <div>
            <p className="text-sm text-base-content/60 uppercase tracking-wider">Active Anomalies</p>
            <p className="text-3xl font-bold text-error">
               {summary?.active ?? anomaliesList?.filter(a => a.status === 'OPEN').length ?? 0}
            </p>
          </div>
        </div>

        {/* Total Resolved (Green/Success) */}
        <div className="flex items-center gap-4">
          <div className="text-success"><CheckCircle size={32} /></div>
          <div>
            <p className="text-sm text-base-content/60 uppercase tracking-wider">Total Resolved</p>
            <p className="text-3xl font-bold text-success">{summary?.resolved || 0}</p>
          </div>
        </div>

        {/* Total Events (Blue/Info) */}
        <div className="flex items-center gap-4">
          <div className="text-info"><Clock size={32} /></div>
          <div>
            <p className="text-sm text-base-content/60 uppercase tracking-wider">Total Events</p>
            <p className="text-3xl font-bold text-info">{summary?.total || 0}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Visualization Section (Pie Chart) */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold mb-6 border-b border-base-200 pb-2 text-base-content">
            Issue Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                    data={distribution || []} 
                    innerRadius={60} 
                    outerRadius={80} 
                    paddingAngle={5} 
                    dataKey="value"
                >
                  {distribution?.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--b1))', 
                    borderColor: 'hsl(var(--b2))', 
                    borderRadius: '0.5rem',
                    color: 'hsl(var(--bc))'
                  }} 
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
            {(!distribution || distribution.length === 0) && (
                <div className="text-center text-base-content/40 text-xs mt-2">No data to display</div>
            )}
          </div>
        </div>

        {/* Activity List Section */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-6 border-b border-base-200 pb-2 text-base-content">
            Recent Incident Log
          </h2>
          <div className="divide-y divide-base-200">
            {anomaliesList?.length > 0 ? (
              anomaliesList.map((item) => (
                <div key={item._id} className="py-5 flex items-center justify-between transition-colors hover:bg-base-200/30 px-2 -mx-2 rounded-lg">
                  <div className="flex items-center gap-6">
                    {/* Severity Bar Indicator */}
                    <div className={`w-1.5 h-12 rounded-full ${
                      item.severity === 'Critical' ? 'bg-error' : 'bg-info'
                    }`}></div>
                    
                    <div>
                      <h4 className="font-bold text-base-content">{item.type}</h4>
                      <p className="text-sm text-base-content/70">{item.description}</p>
                      <span className="text-xs text-base-content/40">
                        {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Just now'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Status Badge */}
                    <span className={`text-xs font-bold uppercase ${
                      item.status === 'OPEN' ? 'text-warning' : 'text-success'
                    }`}>
                      {item.status}
                    </span>

                    {/* Resolve Button */}
                    {item.status === 'OPEN' && (
                      <button 
                        onClick={() => resolveAnomaly(item._id)}
                        disabled={isResolving}
                        className="flex items-center gap-2 border border-primary text-primary px-4 py-1.5 rounded-md text-sm hover:bg-primary hover:text-primary-content transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isResolving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Resolve"}
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-base-content/40 italic">
                No anomalies detected. System is healthy.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnomaliesPage;