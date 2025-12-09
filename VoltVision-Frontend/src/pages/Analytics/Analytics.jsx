

// import React from "react";
// import { useGetSolarUnitForUserQuery, useGetAnomalyStatsQuery } from "@/lib/redux/query";
// import { useUser } from "@clerk/clerk-react";
// import { AlertTriangle, CheckCircle, Clock, ThermometerSun, AlertCircle, TrendingUp } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// // Import Task 3 Components
// import WeatherWidget from "../wather/WeatherWidget";
// import CapacityFactorChart from "../dashboard/components/CapacityFactorChart";

// // Helper Button Component for "Investigate" actions
// const ActionButton = ({ children, className, ...props }) => (
//     <button className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${className}`} {...props}>
//         {children}
//     </button>
// );

// const AnalyticsPage = () => {
//   const { user } = useUser();
  
//   // 1. Fetch Solar Unit
//   const { data: solarUnit, isLoading } = useGetSolarUnitForUserQuery();
  
//   // 2. Fetch Anomaly Data (Task 5) - Depends on solarUnit existing
//   const { data: anomalyData, isLoading: isLoadingAnomalies } = useGetAnomalyStatsQuery(solarUnit?._id, {
//     skip: !solarUnit 
//   });

//   // Global Loading State
//   if (isLoading) {
//     return (
//         <div className="flex h-[50vh] items-center justify-center">
//             <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>
//             <p className="text-muted-foreground">Loading analytics...</p>
//         </div>
//     );
//   }

//   // No Unit State
//   if (!solarUnit) {
//     return (
//       <div className="p-8">
//         <div className="border border-dashed p-12 rounded-lg text-center bg-muted/10">
//             <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
//             <h2 className="text-xl font-semibold">No System Linked</h2>
//             <p className="text-muted-foreground max-w-sm mx-auto mt-2">
//               Please ask an administrator to assign a solar unit to your account to view analytics.
//             </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 space-y-8 max-w-7xl mx-auto pb-20">
      
//       {/* HEADER */}
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">System Analytics</h1>
//         <p className="text-muted-foreground mt-1">
//           Performance metrics and anomaly detection for <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{solarUnit.serialNumber}</span>.
//         </p>
//       </div>

//       {/* --- SECTION 1: PERFORMANCE (Task 3) --- */}
//       <section className="space-y-4">
//         <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
//             <ThermometerSun className="w-5 h-5 text-orange-500" /> Performance Overview
//         </h2>
//         <div className="grid gap-6 lg:grid-cols-2">
//             {/* Task 3.1: Weather Widget */}
//             <WeatherWidget solarUnit={solarUnit} />
//             {/* Task 3.2: Efficiency Chart */}
//             <CapacityFactorChart solarUnitId={solarUnit._id} />
//         </div>
//       </section>

//       {/* --- SECTION 2: ANOMALY DETECTION (Task 5) --- */}
//       <section className="space-y-4 pt-6 border-t">
//         <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
//                 <AlertTriangle className="w-5 h-5 text-red-500" /> Anomaly Detection
//             </h2>
//             <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">Last 30 Days Analysis</span>
//         </div>

//         {/* 1. KPI Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Active Anomalies */}
//             <Card className="border-l-4 border-l-red-500 shadow-sm">
//                 <CardContent className="p-6 flex items-center justify-between">
//                     <div>
//                         <p className="text-sm font-medium text-muted-foreground">Active Anomalies</p>
//                         <h3 className="text-3xl font-bold text-red-600">{anomalyData?.summary?.active || 0}</h3>
//                     </div>
//                     <div className="p-3 bg-red-100 rounded-full"><AlertTriangle className="w-6 h-6 text-red-600" /></div>
//                 </CardContent>
//             </Card>
            
//             {/* Under Review */}
//             <Card className="border-l-4 border-l-yellow-500 shadow-sm">
//                 <CardContent className="p-6 flex items-center justify-between">
//                     <div>
//                         <p className="text-sm font-medium text-muted-foreground">Under Review</p>
//                         <h3 className="text-3xl font-bold text-yellow-600">{anomalyData?.summary?.review || 0}</h3>
//                     </div>
//                     <div className="p-3 bg-yellow-100 rounded-full"><Clock className="w-6 h-6 text-yellow-600" /></div>
//                 </CardContent>
//             </Card>
            
//             {/* Resolved */}
//             <Card className="border-l-4 border-l-green-500 shadow-sm">
//                 <CardContent className="p-6 flex items-center justify-between">
//                     <div>
//                         <p className="text-sm font-medium text-muted-foreground">Resolved</p>
//                         <h3 className="text-3xl font-bold text-green-600">{anomalyData?.summary?.resolved || 0}</h3>
//                     </div>
//                     <div className="p-3 bg-green-100 rounded-full"><CheckCircle className="w-6 h-6 text-green-600" /></div>
//                 </CardContent>
//             </Card>
//         </div>

//         {/* 2. Charts Row (Pie & Trends) */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
//             {/* Pie Chart: Distribution by Type */}
//             <Card>
//                 <CardHeader><CardTitle className="text-base">Distribution by Type</CardTitle></CardHeader>
//                 <CardContent className="h-[300px]">
//                     {anomalyData?.distribution?.length > 0 ? (
//                         <ResponsiveContainer width="100%" height="100%">
//                             <PieChart>
//                                 <Pie 
//                                     data={anomalyData?.distribution} 
//                                     cx="50%" cy="50%" 
//                                     innerRadius={60} outerRadius={80} 
//                                     paddingAngle={5} 
//                                     dataKey="value"
//                                 >
//                                     {anomalyData?.distribution?.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={entry.fill} />
//                                     ))}
//                                 </Pie>
//                                 <Tooltip />
//                                 <Legend verticalAlign="bottom" height={36}/>
//                             </PieChart>
//                         </ResponsiveContainer>
//                     ) : (
//                         <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No anomalies detected</div>
//                     )}
//                 </CardContent>
//             </Card>

//             {/* Bar Chart: Trend Analysis */}
//             <Card>
//                 <CardHeader><CardTitle className="text-base">Trend Analysis (Daily)</CardTitle></CardHeader>
//                 <CardContent className="h-[300px]">
//                     {anomalyData?.trends?.length > 0 ? (
//                         <ResponsiveContainer width="100%" height="100%">
//                             <BarChart data={anomalyData?.trends}>
//                                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                                 <XAxis dataKey="date" tickFormatter={(v) => new Date(v).getDate()} fontSize={12} />
//                                 <YAxis allowDecimals={false} fontSize={12} />
//                                 <Tooltip labelFormatter={(l) => new Date(l).toLocaleDateString()} />
//                                 <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     ) : (
//                         <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No trends available</div>
//                     )}
//                 </CardContent>
//             </Card>
//         </div>

//         {/* 3. Recent Anomalies List */}
//         <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//                 <CardTitle className="text-base">Recent Activity</CardTitle>
//                 <TrendingUp className="w-4 h-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//                 <div className="space-y-4">
//                     {anomalyData?.recent?.map((item, i) => (
//                         <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg  hover:bg-muted/30 transition-colors gap-4">
//                             <div className="flex items-center gap-4">
//                                 <div className={`p-2 rounded-full flex-shrink-0 ${item.severity === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
//                                     <AlertTriangle className="w-5 h-5" />
//                                 </div>
//                                 <div>
//                                     <p className="font-medium text-foreground">{item.type}</p>
//                                     <p className="text-xs text-muted-foreground">Detected: {new Date(item.time).toLocaleString()}</p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
//                                     item.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' : 
//                                     item.severity === 'Warning' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
//                                     'bg-blue-50 text-blue-700 border-blue-200'
//                                 }`}>
//                                     {item.severity}
//                                 </span>
//                                 <ActionButton className="text-primary hover:bg-primary/10">
//                                     Investigate
//                                 </ActionButton>
//                             </div>
//                         </div>
//                     ))}
//                     {(!anomalyData?.recent || anomalyData.recent.length === 0) && (
//                         <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
//                             <CheckCircle className="w-8 h-8 mb-2 text-green-500 opacity-50" />
//                             <p>System is healthy. No recent anomalies detected.</p>
//                         </div>
//                     )}
//                 </div>
//             </CardContent>
//         </Card>
//       </section>

//     </div>
//   );
// };

// export default AnalyticsPage;


import React from "react";
import { useGetSolarUnitForUserQuery, useGetAnomalyStatsQuery } from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";
import { AlertTriangle, CheckCircle, Clock, ThermometerSun, AlertCircle, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Import Task 3 Components
import WeatherWidget from "../wather/WeatherWidget";
import CapacityFactorChart from "../dashboard/components/CapacityFactorChart";

// Helper Button Component
const ActionButton = ({ children, className, ...props }) => (
  <button
    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

const AnalyticsPage = () => {
  const { user } = useUser();

  const { data: solarUnit, isLoading } = useGetSolarUnitForUserQuery();
  const { data: anomalyData } = useGetAnomalyStatsQuery(solarUnit?._id, {
    skip: !solarUnit
  });

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
      <div className="p-8">
        <div className="border border-dashed p-12 rounded-lg text-center">
          <AlertCircle className="w-10 h-10 mx-auto mb-3" />
          <h2 className="text-xl font-semibold">No System Linked</h2>
          <p className="max-w-sm mx-auto mt-2">
            Please ask an administrator to assign a solar unit to your account to view analytics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto pb-20">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Analytics</h1>
        <p className="mt-1">
          Performance metrics and anomaly detection for
          <span className="font-mono px-2 py-0.5 rounded ml-1">
            {solarUnit.serialNumber}
          </span>
        </p>
      </div>

      {/* PERFORMANCE SECTION */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ThermometerSun className="w-5 h-5" /> Performance Overview
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
            <AlertTriangle className="w-5 h-5" /> Anomaly Detection
          </h2>
          <span className="text-xs font-medium px-2 py-1 rounded">
            Last 30 Days Analysis
          </span>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border-l-4 shadow-sm">
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Active Anomalies</p>
                <h3 className="text-3xl font-bold">
                  {anomalyData?.summary?.active || 0}
                </h3>
              </div>
              <div className="p-3 rounded-full">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="border-l-4 shadow-sm">
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Under Review</p>
                <h3 className="text-3xl font-bold">
                  {anomalyData?.summary?.review || 0}
                </h3>
              </div>
              <div className="p-3 rounded-full">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="border-l-4 shadow-sm">
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Resolved</p>
                <h3 className="text-3xl font-bold">
                  {anomalyData?.summary?.resolved || 0}
                </h3>
              </div>
              <div className="p-3 rounded-full">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* PIE */}
          <div className="border rounded-lg">
            <div className="p-4">
              <h3 className="text-base font-semibold">Distribution by Type</h3>
            </div>
            <div className="h-[300px] p-4">
              {anomalyData?.distribution?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={anomalyData?.distribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {anomalyData?.distribution?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "transparent", border: "none", boxShadow: "none" }}
                      wrapperStyle={{ background: "transparent" }}
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm">
                  No anomalies detected
                </div>
              )}
            </div>
          </div>

          {/* BAR */}
          <div className="border rounded-lg">
            <div className="p-4">
              <h3 className="text-base font-semibold">Trend Analysis (Daily)</h3>
            </div>
            <div className="h-[300px] p-4">
              {anomalyData?.trends?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={anomalyData?.trends} style={{ background: "transparent" }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickFormatter={(v) => new Date(v).getDate()} fontSize={12} />
                    <YAxis allowDecimals={false} fontSize={12} />
                    <Tooltip
                      contentStyle={{ background: "transparent", border: "none", boxShadow: "none" }}
                      wrapperStyle={{ background: "transparent" }}
                      labelFormatter={(l) => new Date(l).toLocaleDateString()}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-sm">
                  No trends available
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RECENT LIST */}
        <div className="border rounded-lg">
          <div className="flex flex-row items-center justify-between p-4">
            <h3 className="text-base font-semibold">Recent Activity</h3>
            <TrendingUp className="w-4 h-4" />
          </div>

          <div className="p-4 space-y-4">
            {anomalyData?.recent?.map((item, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full flex-shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{item.type}</p>
                    <p className="text-xs">
                      Detected: {new Date(item.time).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border">
                    {item.severity}
                  </span>
                  <ActionButton>
                    Investigate
                  </ActionButton>
                </div>
              </div>
            ))}

            {(!anomalyData?.recent || anomalyData.recent.length === 0) && (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle className="w-8 h-8 mb-2 opacity-50" />
                <p>System is healthy. No recent anomalies detected.</p>
              </div>
            )}
          </div>
        </div>

      </section>
    </div>
  );
};

export default AnalyticsPage;
