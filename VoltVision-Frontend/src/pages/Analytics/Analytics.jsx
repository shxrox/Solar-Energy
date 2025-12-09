// import React from "react";
// import { useGetSolarUnitForUserQuery } from "@/lib/redux/query";
// import { useUser } from "@clerk/clerk-react";
// import { AlertCircle, LineChart, ThermometerSun } from "lucide-react";

// // Import the components we built
// import WeatherWidget from "../wather/WeatherWidget";
// import CapacityFactorChart from "../dashboard/components/CapacityFactorChart";

// const Analytics = () => {
//   const { user } = useUser();
  
//   // 1. Fetch the Solar Unit linked to this user
//   const { 
//     data: solarUnit, 
//     isLoading, 
//     isError 
//   } = useGetSolarUnitForUserQuery();

//   // 2. Loading State
//   if (isLoading) {
//     return (
//       <div className="flex h-[50vh] items-center justify-center">
//         <div className="text-center">
//             <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//             <p className="text-muted-foreground">Loading analytics data...</p>
//         </div>
//       </div>
//     );
//   }

//   // 3. No Unit State (or Error)
//   if (!solarUnit || isError) {
//     return (
//       <div className="p-8">
//         <div className="border border-dashed p-12 rounded-lg text-center bg-muted/20">
//             <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
//             <h2 className="text-xl font-semibold">No Analytics Available</h2>
//             <p className="text-muted-foreground max-w-sm mx-auto mt-2">
//               Please link a active solar unit to your account to view performance analytics.
//             </p>
//         </div>
//       </div>
//     );
//   }

//   // 4. Main Analytics Layout
//   return (
//     <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
//       {/* Page Header */}
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight text-foreground">System Analytics</h1>
//         <p className="text-muted-foreground mt-1">
//           Deep dive into weather impact and system efficiency for <span className="font-mono font-medium text-primary">{solarUnit.serialNumber}</span>.
//         </p>
//       </div>

//       {/* Section 1: Environmental Analysis */}
//       <section className="space-y-4">
//         <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
//           <ThermometerSun className="w-5 h-5 text-orange-500" />
//           <h2>Environmental Analysis</h2>
//         </div>
//         {/* Pass solarUnit so widget can calculate estimated power */}
//         <WeatherWidget solarUnit={solarUnit} />
//       </section>

//       {/* Section 2: Performance Metrics */}
//       <section className="space-y-4">
//         <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
//           <LineChart className="w-5 h-5 text-blue-500" />
//           <h2>Performance Metrics</h2>
//         </div>
        
//         <div className="grid gap-6 lg:grid-cols-3">
//             {/* The Bar Chart - Takes up 2 columns */}
//             <div className="lg:col-span-2 h-full">
//                 <CapacityFactorChart solarUnitId={solarUnit._id} />
//             </div>

//             {/* Summary / KPI Cards - Takes up 1 column */}
//             <div className="grid gap-4 content-start">
//                 <div className="p-6 border rounded-xl bg-card shadow-sm">
//                     <h3 className="font-medium text-sm text-muted-foreground mb-2">Theoretical Max Output</h3>
//                     <div className="text-3xl font-bold text-foreground">
//                         {((solarUnit.capacity * 24) / 1000).toFixed(1)} <span className="text-lg font-normal text-muted-foreground">kWh/day</span>
//                     </div>
//                     <p className="text-xs text-muted-foreground mt-2">
//                         If running at 100% capacity for 24 hours.
//                     </p>
//                 </div>

//                 <div className="p-6 border rounded-xl bg-card shadow-sm">
//                      <h3 className="font-medium text-sm text-muted-foreground mb-2">System Health</h3>
//                      <div className="flex items-center gap-2 text-green-600 font-bold text-xl">
//                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//                         <span>Optimal</span>
//                      </div>
//                      <p className="text-xs text-muted-foreground mt-2">
//                         Performing within expected parameters.
//                      </p>
//                 </div>
//             </div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Analytics;

import React from "react";
import { useGetSolarUnitForUserQuery, useGetAnomalyStatsQuery } from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";
import { AlertTriangle, CheckCircle, Clock, ThermometerSun, AlertCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// Import Task 3 Components
import WeatherWidget from "../wather/WeatherWidget";
import CapacityFactorChart from "../dashboard/components/CapacityFactorChart";

// Helper Button Component for "Investigate" actions
const ActionButton = ({ children, className, ...props }) => (
    <button className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${className}`} {...props}>
        {children}
    </button>
);

const AnalyticsPage = () => {
  const { user } = useUser();
  
  // 1. Fetch Solar Unit
  const { data: solarUnit, isLoading } = useGetSolarUnitForUserQuery();
  
  // 2. Fetch Anomaly Data (Task 5) - Depends on solarUnit existing
  const { data: anomalyData, isLoading: isLoadingAnomalies } = useGetAnomalyStatsQuery(solarUnit?._id, {
    skip: !solarUnit 
  });

  // Global Loading State
  if (isLoading) {
    return (
        <div className="flex h-[50vh] items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>
            <p className="text-muted-foreground">Loading analytics...</p>
        </div>
    );
  }

  // No Unit State
  if (!solarUnit) {
    return (
      <div className="p-8">
        <div className="border border-dashed p-12 rounded-lg text-center bg-muted/10">
            <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h2 className="text-xl font-semibold">No System Linked</h2>
            <p className="text-muted-foreground max-w-sm mx-auto mt-2">
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">System Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Performance metrics and anomaly detection for <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{solarUnit.serialNumber}</span>.
        </p>
      </div>

      {/* --- SECTION 1: PERFORMANCE (Task 3) --- */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
            <ThermometerSun className="w-5 h-5 text-orange-500" /> Performance Overview
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Task 3.1: Weather Widget */}
            <WeatherWidget solarUnit={solarUnit} />
            {/* Task 3.2: Efficiency Chart */}
            <CapacityFactorChart solarUnitId={solarUnit._id} />
        </div>
      </section>

      {/* --- SECTION 2: ANOMALY DETECTION (Task 5) --- */}
      <section className="space-y-4 pt-6 border-t">
        <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                <AlertTriangle className="w-5 h-5 text-red-500" /> Anomaly Detection
            </h2>
            <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">Last 30 Days Analysis</span>
        </div>

        {/* 1. KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Active Anomalies */}
            <Card className="border-l-4 border-l-red-500 shadow-sm">
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Anomalies</p>
                        <h3 className="text-3xl font-bold text-red-600">{anomalyData?.summary?.active || 0}</h3>
                    </div>
                    <div className="p-3 bg-red-100 rounded-full"><AlertTriangle className="w-6 h-6 text-red-600" /></div>
                </CardContent>
            </Card>
            
            {/* Under Review */}
            <Card className="border-l-4 border-l-yellow-500 shadow-sm">
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Under Review</p>
                        <h3 className="text-3xl font-bold text-yellow-600">{anomalyData?.summary?.review || 0}</h3>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-full"><Clock className="w-6 h-6 text-yellow-600" /></div>
                </CardContent>
            </Card>
            
            {/* Resolved */}
            <Card className="border-l-4 border-l-green-500 shadow-sm">
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                        <h3 className="text-3xl font-bold text-green-600">{anomalyData?.summary?.resolved || 0}</h3>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full"><CheckCircle className="w-6 h-6 text-green-600" /></div>
                </CardContent>
            </Card>
        </div>

        {/* 2. Charts Row (Pie & Trends) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Pie Chart: Distribution by Type */}
            <Card>
                <CardHeader><CardTitle className="text-base">Distribution by Type</CardTitle></CardHeader>
                <CardContent className="h-[300px]">
                    {anomalyData?.distribution?.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={anomalyData?.distribution} 
                                    cx="50%" cy="50%" 
                                    innerRadius={60} outerRadius={80} 
                                    paddingAngle={5} 
                                    dataKey="value"
                                >
                                    {anomalyData?.distribution?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No anomalies detected</div>
                    )}
                </CardContent>
            </Card>

            {/* Bar Chart: Trend Analysis */}
            <Card>
                <CardHeader><CardTitle className="text-base">Trend Analysis (Daily)</CardTitle></CardHeader>
                <CardContent className="h-[300px]">
                    {anomalyData?.trends?.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={anomalyData?.trends}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" tickFormatter={(v) => new Date(v).getDate()} fontSize={12} />
                                <YAxis allowDecimals={false} fontSize={12} />
                                <Tooltip labelFormatter={(l) => new Date(l).toLocaleDateString()} />
                                <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No trends available</div>
                    )}
                </CardContent>
            </Card>
        </div>

        {/* 3. Recent Anomalies List */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Recent Activity</CardTitle>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {anomalyData?.recent?.map((item, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg  hover:bg-muted/30 transition-colors gap-4">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full flex-shrink-0 ${item.severity === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">{item.type}</p>
                                    <p className="text-xs text-muted-foreground">Detected: {new Date(item.time).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                    item.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' : 
                                    item.severity === 'Warning' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                                    'bg-blue-50 text-blue-700 border-blue-200'
                                }`}>
                                    {item.severity}
                                </span>
                                <ActionButton className="text-primary hover:bg-primary/10">
                                    Investigate
                                </ActionButton>
                            </div>
                        </div>
                    ))}
                    {(!anomalyData?.recent || anomalyData.recent.length === 0) && (
                        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                            <CheckCircle className="w-8 h-8 mb-2 text-green-500 opacity-50" />
                            <p>System is healthy. No recent anomalies detected.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
      </section>

    </div>
  );
};

export default AnalyticsPage;