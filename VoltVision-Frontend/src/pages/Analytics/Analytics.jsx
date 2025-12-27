

 import React, { useEffect } from "react";
import { 
  useGetSolarUnitForUserQuery, 
  useGetAnomalyStatsQuery, 
  useResolveAnomalyMutation 
} from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ThermometerSun, 
  AlertCircle, 
  TrendingUp, 
  Check, 
  Loader2 
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Task 3 Components
import WeatherWidget from "../weather/WeatherWidget";
import CapacityFactorChart from "../weather/CapacityFactorChart";

const AnalyticsPage = () => {
  const { user } = useUser();
  const { data: solarUnit, isLoading } = useGetSolarUnitForUserQuery();
  
  const { data: anomalyData, refetch } = useGetAnomalyStatsQuery(solarUnit?._id, {
    skip: !solarUnit
  });

  const [resolveAnomaly, { isLoading: isResolving, isSuccess, isError }] = useResolveAnomalyMutation();

  const handleResolve = async (id) => {
    try {
      await resolveAnomaly(id).unwrap();
      refetch(); 
    } catch (err) {
      console.error("Failed to resolve:", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Issue resolved! Updating system metrics...", {
        position: "top-right",
        theme: "colored",
        autoClose: 3000
      });
    }
    if (isError) {
      toast.error("Failed to update status. Please try again.", {
        position: "top-right",
        theme: "colored"
      });
    }
  }, [isSuccess, isError]);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="animate-pulse text-sm font-medium text-base-content/60">Loading analytics engine...</p>
      </div>
    );
  }

  if (!solarUnit) {
    return (
      <div className="p-10 flex flex-col items-center justify-center text-center border-2 border-dashed border-base-300 rounded-3xl m-8">
        <AlertCircle className="w-12 h-12 mb-4 text-base-content/20" />
        <h2 className="text-xl font-bold text-base-content">No System Linked</h2>
        <p className="mt-2 text-base-content/60">Please contact an administrator to assign a solar unit.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto pb-20">
      <ToastContainer />

      {/* HEADER: Updated to Solid Background */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm sticky top-0 z-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-base-content">
            System Analytics
          </h1>
          <p className="text-sm text-base-content/60 mt-1">
            Performance monitoring for <span className="font-mono font-bold ">{solarUnit.serialNumber}</span>
          </p>
        </div>
        <div className="badge badge-primary badge-outline gap-2 p-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            Live Data
        </div>
      </header>

      {/* PERFORMANCE SECTION */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-base-content">
          <ThermometerSun className="w-5 h-5 text-warning" /> Performance Overview
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-full">
             <WeatherWidget solarUnit={solarUnit} />
          </div>
          <div className="h-full">
             <CapacityFactorChart solarUnitId={solarUnit._id} />
          </div>
        </div>
      </section>

      {/* ANOMALY SECTION */}
      <section className="space-y-6 pt-8 border-t border-base-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2 text-base-content">
            <AlertTriangle className="w-5 h-5 text-error" /> Anomaly Detection
          </h2>
          <span className="text-xs font-mono bg-base-200 text-base-content/70 px-3 py-1 rounded-full">
            30-Day Analysis
          </span>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stats shadow border border-base-200 bg-base-100">
            <div className="stat">
              <div className="stat-figure text-error">
                <AlertTriangle className="w-8 h-8 opacity-80" />
              </div>
              <div className="stat-title">Active Issues</div>
              <div className="stat-value text-error">{anomalyData?.summary?.active || 0}</div>
              <div className="stat-desc">Requires attention</div>
            </div>
          </div>

          <div className="stats shadow border border-base-200 bg-base-100">
            <div className="stat">
              <div className="stat-figure text-success">
                <CheckCircle className="w-8 h-8 opacity-80" />
              </div>
              <div className="stat-title">Resolved</div>
              <div className="stat-value text-success">{anomalyData?.summary?.resolved || 0}</div>
              <div className="stat-desc">Fixed successfully</div>
            </div>
          </div>

          <div className="stats shadow border border-base-200 bg-base-100">
            <div className="stat">
              <div className="stat-figure text-info">
                <Clock className="w-8 h-8 opacity-80" />
              </div>
              <div className="stat-title">Total Events</div>
              <div className="stat-value text-info">{anomalyData?.summary?.total || 0}</div>
              <div className="stat-desc">Past 30 days</div>
            </div>
          </div>
        </div>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Pie Chart Card */}
          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body p-6">
              <h3 className="text-sm font-bold text-base-content/60 uppercase tracking-wider mb-4">Distribution by Type</h3>
              <div className="h-[300px] w-full">
                {anomalyData?.distribution?.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={anomalyData.distribution}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {anomalyData.distribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'hsl(var(--b1))', 
                            borderColor: 'hsl(var(--b3))', 
                            borderRadius: '0.5rem',
                            color: 'hsl(var(--bc))'
                        }} 
                      />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-base-content/40 italic">No anomalies to display</div>
                )}
              </div>
            </div>
          </div>

          {/* Bar Chart Card */}
          <div className="card bg-base-100 shadow-sm border border-base-200">
            <div className="card-body p-6">
              <h3 className="text-sm font-bold text-base-content/60 uppercase tracking-wider mb-4">7-Day Incident Trend</h3>
              <div className="h-[300px] w-full">
                {anomalyData?.trends?.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={anomalyData.trends}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--b3))" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(v) => new Date(v).getDate()} 
                        fontSize={12} 
                        tick={{ fill: "hsl(var(--bc))", opacity: 0.7 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        allowDecimals={false} 
                        fontSize={12} 
                        tick={{ fill: "hsl(var(--bc))", opacity: 0.7 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        cursor={{ fill: "hsl(var(--b2))" }}
                        contentStyle={{ 
                            backgroundColor: 'hsl(var(--b1))', 
                            borderColor: 'hsl(var(--b3))', 
                            borderRadius: '0.5rem',
                            color: 'hsl(var(--bc))'
                        }}
                        labelFormatter={(l) => new Date(l).toLocaleDateString()} 
                      />
                      <Bar dataKey="count" fill="hsl(var(--p))" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-base-content/40 italic">No trend data available</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RECENT LIST */}
        <div className="card bg-base-100 shadow-sm border border-base-200 overflow-hidden">
          <div className="p-4 border-b border-base-200 flex items-center justify-between bg-base-50/50">
            <h3 className="font-bold text-base-content flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Recent Incident Log
            </h3>
          </div>

          <div className="divide-y divide-base-200 max-h-[400px] overflow-y-auto">
            {anomalyData?.recent?.length > 0 ? (
              anomalyData.recent.map((item) => (
                <div key={item._id} className="p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-base-200/50 transition-colors gap-4">
                  
                  {/* Left: Info */}
                  <div className="flex items-center gap-4">
                    <div className={`w-1.5 h-10 rounded-full ${item.severity === 'Critical' ? 'bg-error shadow-[0_0_8px_rgba(255,0,0,0.4)]' : 'bg-info'}`}></div>
                    <div>
                      <p className="font-bold text-base-content">{item.type}</p>
                      <p className="text-xs text-base-content/50 font-mono">
                        {new Date(item.time).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Right: Status & Action */}
                  <div className="flex items-center gap-4 self-end md:self-auto">
                    <span className={`badge font-bold ${
                      item.status === 'OPEN' ? 'badge-warning badge-outline' : 'badge-success badge-outline'
                    }`}>
                      {item.status}
                    </span>
                    
                    {item.status === 'OPEN' && (
                      <button 
                        onClick={() => handleResolve(item._id)}
                        disabled={isResolving}
                        className="btn btn-sm btn-ghost text-primary hover:bg-primary/10"
                      >
                        {isResolving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        <span className="ml-1">Mark Resolved</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 flex flex-col items-center justify-center text-base-content/40">
                <CheckCircle className="w-10 h-10 mb-2 opacity-20" />
                <p className="text-sm italic">No anomalies detected. System is healthy.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;