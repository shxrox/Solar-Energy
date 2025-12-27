
// import React from 'react';
// import { useGetSolarUnitForUserQuery, useGetAnomalyStatsQuery, useResolveAnomalyMutation } from '../../lib/redux/query';
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
// import { CheckCircle, Clock, ShieldAlert } from 'lucide-react';

// const AnomaliesPage = () => {
//   const { data: unit, isLoading: unitLoading } = useGetSolarUnitForUserQuery();
  
//   const { data: stats, isLoading: statsLoading } = useGetAnomalyStatsQuery(unit?._id, {
//     skip: !unit?._id,
//   });

//   const [resolveAnomaly] = useResolveAnomalyMutation();

//   if (unitLoading || statsLoading) return <div className="p-10 text-center">Loading system health data...</div>;
//   if (!unit) return <div className="p-10 text-center">No solar unit linked to this account.</div>;

//   const { summary, distribution, recent } = stats || {};

//   return (
//     <div className="p-6 space-y-8 max-w-7xl mx-auto">
//       <header className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>
//         <div className="flex items-center gap-2 text-green-700 px-3 py-1 text-sm font-medium">
//           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//           Live Monitoring Active
//         </div>
//       </header>

//       {/* KPI Section - No background/borders */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//         <div className="flex items-center gap-4">
//           <div className="text-red-600"><ShieldAlert size={32} /></div>
//           <div>
//             <p className="text-sm text-gray-500 uppercase tracking-wider">Active Anomalies</p>
//             <p className="text-3xl font-bold text-red-600">{summary?.active || 0}</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="text-green-600"><CheckCircle size={32} /></div>
//           <div>
//             <p className="text-sm text-gray-500 uppercase tracking-wider">Resolved Today</p>
//             <p className="text-3xl font-bold text-green-600">{summary?.resolved || 0}</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="text-blue-600"><Clock size={32} /></div>
//           <div>
//             <p className="text-sm text-gray-500 uppercase tracking-wider">Total Events (30d)</p>
//             <p className="text-3xl font-bold text-blue-600">{summary?.total || 0}</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//         {/* Visualization Section */}
//         <div className="lg:col-span-1">
//           <h2 className="text-lg font-semibold mb-6 border-b border-gray-200 pb-2">Issue Distribution</h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie data={distribution} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
//                   {distribution?.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
//                 </Pie>
//                 <Tooltip />
//                 <Legend verticalAlign="bottom" height={36}/>
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Activity List Section */}
//         <div className="lg:col-span-2">
//           <h2 className="text-lg font-semibold mb-6 border-b border-gray-200 pb-2">Recent Incident Log</h2>
//           <div className="divide-y divide-gray-200">
//             {recent?.length > 0 ? (
//               recent.map((item) => (
//                 <div key={item._id} className="py-5 flex items-center justify-between transition-colors">
//                   <div className="flex items-center gap-6">
//                     <div className={`w-1.5 h-12 rounded-full ${item.severity === 'Critical' ? 'bg-red-500' : 'bg-blue-400'}`}></div>
//                     <div>
//                       <h4 className="font-bold text-gray-800">{item.type}</h4>
//                       <p className="text-sm text-gray-600">{item.description}</p>
//                       <span className="text-xs text-gray-400">{new Date(item.time).toLocaleString()}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-6">
//                     <span className={`text-xs font-bold uppercase ${item.status === 'OPEN' ? 'text-orange-600' : 'text-gray-400'}`}>
//                       {item.status}
//                     </span>
//                     {item.status === 'OPEN' && (
//                       <button 
//                         onClick={() => resolveAnomaly(item._id)}
//                         className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-md text-sm hover:bg-blue-600 hover:text-white transition-all font-medium"
//                       >
//                         Resolve
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="py-20 text-center text-gray-400 italic">No anomalies detected. System is healthy.</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnomaliesPage;

import React from 'react';
import { 
  useGetSolarUnitForUserQuery, 
  useGetAnomalyStatsQuery, 
  useGetMyAnomaliesQuery, // ✅ Import the List Hook
  useResolveAnomalyMutation 
} from '../../lib/redux/query';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CheckCircle, Clock, ShieldAlert, Loader2 } from 'lucide-react'; // ✅ Import Loader2

const AnomaliesPage = () => {
  const { data: unit, isLoading: unitLoading } = useGetSolarUnitForUserQuery();
  
  // 1. Fetch Stats (KPI Cards & Pie Chart)
  const { data: stats, isLoading: statsLoading } = useGetAnomalyStatsQuery(unit?._id, {
    skip: !unit?._id,
  });

  // 2. Fetch List (Recent Incident Log) - Polls every 2s for fresh updates
  const { data: anomaliesList, isLoading: listLoading } = useGetMyAnomaliesQuery(undefined, {
    pollingInterval: 2000, 
  });

  // 3. Resolve Mutation with Loading State
  const [resolveAnomaly, { isLoading: isResolving }] = useResolveAnomalyMutation();

  if (unitLoading || statsLoading || listLoading) {
     return <div className="p-10 text-center animate-pulse">Loading system health data...</div>;
  }
  
  if (!unit) return <div className="p-10 text-center">No solar unit linked to this account.</div>;

  const { summary, distribution } = stats || {};

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>
        <div className="flex items-center gap-2 text-green-700 px-3 py-1 text-sm font-medium">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live Monitoring Active
        </div>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Active Anomalies */}
        <div className="flex items-center gap-4">
          <div className="text-red-600"><ShieldAlert size={32} /></div>
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider">Active Anomalies</p>
            {/* Fallback to list length if summary is empty */}
            <p className="text-3xl font-bold text-red-600">
               {summary?.active ?? anomaliesList?.filter(a => a.status === 'OPEN').length ?? 0}
            </p>
          </div>
        </div>

        {/* Total Resolved */}
        <div className="flex items-center gap-4">
          <div className="text-green-600"><CheckCircle size={32} /></div>
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider">Total Resolved</p>
            <p className="text-3xl font-bold text-green-600">{summary?.resolved || 0}</p>
          </div>
        </div>

        {/* Total Events */}
        <div className="flex items-center gap-4">
          <div className="text-blue-600"><Clock size={32} /></div>
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider">Total Events</p>
            <p className="text-3xl font-bold text-blue-600">{summary?.total || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Visualization Section */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold mb-6 border-b border-gray-200 pb-2">Issue Distribution</h2>
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
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
            {(!distribution || distribution.length === 0) && (
                <div className="text-center text-gray-400 text-xs mt-2">No data to display</div>
            )}
          </div>
        </div>

        {/* Activity List Section (Using 'anomaliesList' directly) */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-6 border-b border-gray-200 pb-2">Recent Incident Log</h2>
          <div className="divide-y divide-gray-200">
            {anomaliesList?.length > 0 ? (
              anomaliesList.map((item) => (
                <div key={item._id} className="py-5 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-6">
                    <div className={`w-1.5 h-12 rounded-full ${item.severity === 'Critical' ? 'bg-red-500' : 'bg-blue-400'}`}></div>
                    <div>
                      <h4 className="font-bold text-gray-800">{item.type}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <span className="text-xs text-gray-400">
                        {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'Just now'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className={`text-xs font-bold uppercase ${item.status === 'OPEN' ? 'text-orange-600' : 'text-green-600'}`}>
                      {item.status}
                    </span>
                    {item.status === 'OPEN' && (
                      <button 
                        onClick={() => resolveAnomaly(item._id)}
                        disabled={isResolving} // Prevent double clicks
                        className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-1.5 rounded-md text-sm hover:bg-blue-600 hover:text-white transition-all font-medium disabled:opacity-50"
                      >
                         {/* ✅ Show Spinner while saving */}
                        {isResolving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Resolve"}
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-gray-400 italic">No anomalies detected. System is healthy.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnomaliesPage;