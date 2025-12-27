
// import React from "react";
// import { useGetSolarUnitForUserQuery, useGetAnomalyStatsQuery } from "@/lib/redux/query";
// import { useUser } from "@clerk/clerk-react";
// import { AlertTriangle, CheckCircle, Clock, ThermometerSun, AlertCircle, TrendingUp } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// // Import Task 3 Components
// import WeatherWidget from "../wather/WeatherWidget";
// import CapacityFactorChart from "../dashboard/components/CapacityFactorChart";

// // Helper Button Component
// const ActionButton = ({ children, className, ...props }) => (
//   <button
//     className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const AnalyticsPage = () => {
//   const { user } = useUser();

//   const { data: solarUnit, isLoading } = useGetSolarUnitForUserQuery();
//   const { data: anomalyData } = useGetAnomalyStatsQuery(solarUnit?._id, {
//     skip: !solarUnit
//   });

//   if (isLoading) {
//     return (
//       <div className="flex h-[50vh] items-center justify-center">
//         <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mr-2"></div>
//         <p>Loading analytics...</p>
//       </div>
//     );
//   }

//   if (!solarUnit) {
//     return (
//       <div className="p-8">
//         <div className="border border-dashed p-12 rounded-lg text-center">
//           <AlertCircle className="w-10 h-10 mx-auto mb-3" />
//           <h2 className="text-xl font-semibold">No System Linked</h2>
//           <p className="max-w-sm mx-auto mt-2">
//             Please ask an administrator to assign a solar unit to your account to view analytics.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 space-y-8 max-w-7xl mx-auto pb-20">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">System Analytics</h1>
//         <p className="mt-1">
//           Performance metrics and anomaly detection for
//           <span className="font-mono px-2 py-0.5 rounded ml-1">
//             {solarUnit.serialNumber}
//           </span>
//         </p>
//       </div>

//       {/* PERFORMANCE SECTION */}
//       <section className="space-y-4">
//         <h2 className="text-lg font-semibold flex items-center gap-2">
//           <ThermometerSun className="w-5 h-5" /> Performance Overview
//         </h2>

//         <div className="grid gap-6 lg:grid-cols-2">
//           <WeatherWidget solarUnit={solarUnit} />
//           <CapacityFactorChart solarUnitId={solarUnit._id} />
//         </div>
//       </section>

//       {/* ANOMALY SECTION */}
//       <section className="space-y-4 pt-6 border-t">
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-semibold flex items-center gap-2">
//             <AlertTriangle className="w-5 h-5" /> Anomaly Detection
//           </h2>
//           <span className="text-xs font-medium px-2 py-1 rounded">
//             Last 30 Days Analysis
//           </span>
//         </div>

//         {/* KPI CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="border-l-4 shadow-sm">
//             <div className="p-6 flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium">Active Anomalies</p>
//                 <h3 className="text-3xl font-bold">
//                   {anomalyData?.summary?.active || 0}
//                 </h3>
//               </div>
//               <div className="p-3 rounded-full">
//                 <AlertTriangle className="w-6 h-6" />
//               </div>
//             </div>
//           </div>

//           <div className="border-l-4 shadow-sm">
//             <div className="p-6 flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium">Under Review</p>
//                 <h3 className="text-3xl font-bold">
//                   {anomalyData?.summary?.review || 0}
//                 </h3>
//               </div>
//               <div className="p-3 rounded-full">
//                 <Clock className="w-6 h-6" />
//               </div>
//             </div>
//           </div>

//           <div className="border-l-4 shadow-sm">
//             <div className="p-6 flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium">Resolved</p>
//                 <h3 className="text-3xl font-bold">
//                   {anomalyData?.summary?.resolved || 0}
//                 </h3>
//               </div>
//               <div className="p-3 rounded-full">
//                 <CheckCircle className="w-6 h-6" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CHARTS */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//           {/* PIE */}
//           <div className="border rounded-lg">
//             <div className="p-4">
//               <h3 className="text-base font-semibold">Distribution by Type</h3>
//             </div>
//             <div className="h-[300px] p-4">
//               {anomalyData?.distribution?.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={anomalyData?.distribution}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={80}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {anomalyData?.distribution?.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.fill} />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       contentStyle={{ background: "transparent", border: "none", boxShadow: "none" }}
//                       wrapperStyle={{ background: "transparent" }}
//                     />
//                     <Legend verticalAlign="bottom" height={36} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <div className="h-full flex items-center justify-center text-sm">
//                   No anomalies detected
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* BAR */}
//           <div className="border rounded-lg">
//             <div className="p-4">
//               <h3 className="text-base font-semibold">Trend Analysis (Daily)</h3>
//             </div>
//             <div className="h-[300px] p-4">
//               {anomalyData?.trends?.length > 0 ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={anomalyData?.trends} style={{ background: "transparent" }}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                     <XAxis dataKey="date" tickFormatter={(v) => new Date(v).getDate()} fontSize={12} />
//                     <YAxis allowDecimals={false} fontSize={12} />
//                     <Tooltip
//                       contentStyle={{ background: "transparent", border: "none", boxShadow: "none" }}
//                       wrapperStyle={{ background: "transparent" }}
//                       labelFormatter={(l) => new Date(l).toLocaleDateString()}
//                     />
//                     <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <div className="h-full flex items-center justify-center text-sm">
//                   No trends available
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>

//         {/* RECENT LIST */}
//         <div className="border rounded-lg">
//           <div className="flex flex-row items-center justify-between p-4">
//             <h3 className="text-base font-semibold">Recent Activity</h3>
//             <TrendingUp className="w-4 h-4" />
//           </div>

//           <div className="p-4 space-y-4">
//             {anomalyData?.recent?.map((item, i) => (
//               <div
//                 key={i}
//                 className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="p-2 rounded-full flex-shrink-0">
//                     <AlertTriangle className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="font-medium">{item.type}</p>
//                     <p className="text-xs">
//                       Detected: {new Date(item.time).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border">
//                     {item.severity}
//                   </span>
//                   <ActionButton>
//                     Investigate
//                   </ActionButton>
//                 </div>
//               </div>
//             ))}

//             {(!anomalyData?.recent || anomalyData.recent.length === 0) && (
//               <div className="flex flex-col items-center justify-center py-8">
//                 <CheckCircle className="w-8 h-8 mb-2 opacity-50" />
//                 <p>System is healthy. No recent anomalies detected.</p>
//               </div>
//             )}
//           </div>
//         </div>

//       </section>
//     </div>
//   );
// };

// export default AnalyticsPage;
import React from "react";
import { 
  useGetSolarUnitForUserQuery, 
  useGetAnomalyStatsQuery, 
  useResolveAnomalyMutation 
} from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";
import { AlertTriangle, CheckCircle, Clock, ThermometerSun, AlertCircle, TrendingUp, Check } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Import Task 3 Components
import WeatherWidget from "../weather/WeatherWidget";
import CapacityFactorChart from "../dashboard/components/CapacityFactorChart";

const AnalyticsPage = () => {
  const { user } = useUser();
  const { data: solarUnit, isLoading } = useGetSolarUnitForUserQuery();
  
  // ✅ 1. Connect to your real Anomaly Stats endpoint
  const { data: anomalyData, refetch } = useGetAnomalyStatsQuery(solarUnit?._id, {
    skip: !solarUnit
  });

  // ✅ 2. Hook for the Resolution Action
  const [resolveAnomaly, { isLoading: isResolving }] = useResolveAnomalyMutation();

  const handleResolve = async (id) => {
    try {
      await resolveAnomaly(id).unwrap();
      // Refetch stats to update the charts immediately
      refetch(); 
    } catch (err) {
      console.error("Failed to resolve anomaly:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mr-2"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (!solarUnit) {
    return (
      <div className="p-8 text-center border border-dashed rounded-lg">
        <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-50" />
        <h2 className="text-xl font-semibold">No System Linked</h2>
        <p className="mt-2 text-gray-500">Please contact an administrator to assign a solar unit.</p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-20">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Analytics</h1>
        <p className="text-gray-500 mt-1">
          Performance and health monitoring for <span className="font-mono font-bold text-blue-600">{solarUnit.serialNumber}</span>
        </p>
      </div>

      {/* PERFORMANCE SECTION */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ThermometerSun className="w-5 h-5 text-orange-500" /> Performance Overview
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <WeatherWidget solarUnit={solarUnit} />
          <CapacityFactorChart solarUnitId={solarUnit._id} />
        </div>
      </section>

      {/* ANOMALY SECTION */}
      <section className="space-y-4 pt-6 border-t">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" /> Anomaly Detection
          </h2>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">Live 30-Day Analysis</span>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 border rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Issues</p>
              <h3 className="text-3xl font-bold text-red-600">{anomalyData?.summary?.active || 0}</h3>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500 opacity-20" />
          </div>
          <div className="p-6 border rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <h3 className="text-3xl font-bold text-green-600">{anomalyData?.summary?.resolved || 0}</h3>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500 opacity-20" />
          </div>
          <div className="p-6 border rounded-xl flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Events</p>
              <h3 className="text-3xl font-bold text-blue-600">{anomalyData?.summary?.total || 0}</h3>
            </div>
            <Clock className="w-8 h-8 text-blue-500 opacity-20" />
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border rounded-xl p-4 bg-white shadow-sm">
            <h3 className="text-sm font-semibold mb-4 text-gray-500 uppercase tracking-wider">Distribution by Type</h3>
            <div className="h-[300px]">
              {anomalyData?.distribution?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={anomalyData.distribution}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {anomalyData.distribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-gray-400 italic">No anomalies to display</div>
              )}
            </div>
          </div>

          <div className="border rounded-xl p-4 bg-white shadow-sm">
            <h3 className="text-sm font-semibold mb-4 text-gray-500 uppercase tracking-wider">7-Day Incident Trend</h3>
            <div className="h-[300px]">
              {anomalyData?.trends?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={anomalyData.trends}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickFormatter={(v) => new Date(v).getDate()} fontSize={12} />
                    <YAxis allowDecimals={false} fontSize={12} />
                    <Tooltip labelFormatter={(l) => new Date(l).toLocaleDateString()} />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-gray-400 italic">No trend data available</div>
              )}
            </div>
          </div>
        </div>

        {/* RECENT LIST */}
        <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Recent Incident Log</h3>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>

          <div className="divide-y max-h-[400px] overflow-y-auto">
            {anomalyData?.recent?.length > 0 ? (
              anomalyData.recent.map((item) => (
                <div key={item._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-1.5 h-10 rounded-full ${item.severity === 'Critical' ? 'bg-red-500' : 'bg-blue-400'}`}></div>
                    <div>
                      <p className="font-bold text-gray-800">{item.type}</p>
                      <p className="text-xs text-gray-400">{new Date(item.time).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                      item.status === 'OPEN' ? 'border-orange-200 text-orange-600 bg-orange-50' : 'border-gray-200 text-gray-400'
                    }`}>
                      {item.status}
                    </span>
                    {item.status === 'OPEN' && (
                      <button 
                        onClick={() => handleResolve(item._id)}
                        disabled={isResolving}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-400 italic">No anomalies detected. System is healthy.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;