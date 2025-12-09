

import React from "react";
import { useGetSolarUnitForUserQuery, useGetAnomalyStatsQuery } from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";
import { AlertTriangle, CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const AnomaliesPage = () => {
  const { user } = useUser();

  // 1. Fetch Solar Unit
  const { 
    data: solarUnit, 
    isLoading: isLoadingUnit, 
    isError 
  } = useGetSolarUnitForUserQuery();

  // 2. Fetch Anomaly Data (Only if unit exists)
  const { 
    data: anomalyData, 
    isLoading: isLoadingAnomalies 
  } = useGetAnomalyStatsQuery(solarUnit?._id, {
    skip: !solarUnit 
  });

  // --- LOADING STATE ---
  if (isLoadingUnit || isLoadingAnomalies) {
    return (
        <div className="flex h-[50vh] items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>
            <p className="text-muted-foreground">Loading anomaly detection...</p>
        </div>
    );
  }

  // --- ✅ CRITICAL FIX: ERROR / NO UNIT STATE ---
  // This prevents the "Cannot read properties of null" crash
  if (!solarUnit || isError) {
    return (
      <div className="p-8">
        <div className="border border-dashed p-12 rounded-lg text-center bg-muted/10">
            <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h2 className="text-xl font-semibold">No System Linked</h2>
            <p className="text-muted-foreground max-w-sm mx-auto mt-2">
              We cannot monitor anomalies because no solar unit is assigned to this account yet.
            </p>
        </div>
      </div>
    );
  }

  return (
    <main className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Anomaly Detection</h1>
        <p className="text-muted-foreground mt-1">
          Real-time monitoring and issue tracking for <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{solarUnit.serialNumber}</span>.
        </p>
      </div>

      {/* 1. KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-red-500 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Issues</p>
                    <h3 className="text-3xl font-bold text-red-600">{anomalyData?.summary?.active || 0}</h3>
                </div>
                <div className="p-3 bg-red-100 rounded-full"><AlertTriangle className="w-6 h-6 text-red-600" /></div>
            </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500 shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">Under Review</p>
                    <h3 className="text-3xl font-bold text-yellow-600">{anomalyData?.summary?.review || 0}</h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full"><Clock className="w-6 h-6 text-yellow-600" /></div>
            </CardContent>
        </Card>
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

      {/* 2. Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader><CardTitle className="text-base">Anomaly Distribution</CardTitle></CardHeader>
            <CardContent className="h-[300px]">
                {anomalyData?.distribution?.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={anomalyData.distribution} 
                                cx="50%" cy="50%" 
                                innerRadius={60} outerRadius={80} 
                                paddingAngle={5} 
                                dataKey="value"
                            >
                                {anomalyData.distribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                ) : <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No anomalies detected</div>}
            </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle className="text-base">Daily Trends</CardTitle></CardHeader>
            <CardContent className="h-[300px]">
                {anomalyData?.trends?.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={anomalyData.trends}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" tickFormatter={(v) => new Date(v).getDate()} fontSize={12} />
                            <YAxis allowDecimals={false} fontSize={12} />
                            <Tooltip labelFormatter={(l) => new Date(l).toLocaleDateString()} />
                            <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No trends available</div>}
            </CardContent>
        </Card>
      </div>

      {/* 3. Recent Activity List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Anomalies</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {anomalyData?.recent?.map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/30 transition-colors gap-4">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-full flex-shrink-0 ${item.severity === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">{item.type}</p>
                                <p className="text-xs text-muted-foreground">Detected: {new Date(item.time).toLocaleString()}</p>
                            </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            item.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                        }`}>
                            {item.severity}
                        </span>
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
    </main>
  );
};

export default AnomaliesPage;