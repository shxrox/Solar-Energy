

import React from "react";
import { useGetSolarUnitForUserQuery, useGetAnomalyStatsQuery } from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";
import { AlertTriangle, CheckCircle, Clock, TrendingUp, Loader2, AlertCircle } from "lucide-react";
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
            <Loader2 className="h-8 w-8 animate-spin opacity-50 mr-2" />
            <p className="opacity-60">Loading anomaly detection...</p>
        </div>
    );
  }

  // --- ERROR / NO UNIT STATE ---
  if (!solarUnit || isError) {
    return (
      <div className="p-8">
        <div className="border border-dashed p-12 rounded-xl text-center opacity-70">
            <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <h2 className="text-xl font-semibold">No System Linked</h2>
            <p className="opacity-70 max-w-sm mx-auto mt-2">
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
        <h1 className="text-3xl font-bold tracking-tight">Anomaly Detection</h1>
        <p className="opacity-70 mt-1">
          Real-time monitoring and issue tracking for <span className="font-mono font-medium opacity-100">{solarUnit.serialNumber}</span>.
        </p>
      </div>

      {/* 1. KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Active Issues */}
        <div className="rounded-xl border shadow-sm border-l-4 border-l-red-500 overflow-hidden">
            <div className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium opacity-70">Active Issues</p>
                    <h3 className="text-3xl font-bold text-red-600">{anomalyData?.summary?.active || 0}</h3>
                </div>
                <div className="p-3 rounded-full bg-red-500/10 text-red-600">
                    <AlertTriangle className="w-6 h-6" />
                </div>
            </div>
        </div>

        {/* Under Review */}
        <div className="rounded-xl border shadow-sm border-l-4 border-l-yellow-500 overflow-hidden">
            <div className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium opacity-70">Under Review</p>
                    <h3 className="text-3xl font-bold text-yellow-600">{anomalyData?.summary?.review || 0}</h3>
                </div>
                <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-600">
                    <Clock className="w-6 h-6" />
                </div>
            </div>
        </div>

        {/* Resolved */}
        <div className="rounded-xl border shadow-sm border-l-4 border-l-green-500 overflow-hidden">
            <div className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium opacity-70">Resolved</p>
                    <h3 className="text-3xl font-bold text-green-600">{anomalyData?.summary?.resolved || 0}</h3>
                </div>
                <div className="p-3 rounded-full bg-green-500/10 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                </div>
            </div>
        </div>
      </div>

      {/* 2. Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Distribution Chart */}
        <div className="rounded-xl border shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 pb-2 border-b border-opacity-10 border-current">
                <h3 className="font-semibold text-lg">Anomaly Distribution</h3>
            </div>
            <div className="p-6 h-[300px]">
                {anomalyData?.distribution?.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={anomalyData.distribution} 
                                cx="50%" cy="50%" 
                                innerRadius={60} outerRadius={80} 
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
                                    borderRadius: '8px', 
                                    border: 'none', 
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: 'hsl(var(--b1))', 
                                    color: 'currentColor'
                                }}
                            />
                            <Legend verticalAlign="bottom" />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center opacity-50">No anomalies detected</div>
                )}
            </div>
        </div>

        {/* Trend Chart */}
        <div className="rounded-xl border shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 pb-2 border-b border-opacity-10 border-current">
                <h3 className="font-semibold text-lg">Daily Trends</h3>
            </div>
            <div className="p-6 h-[300px]">
                {anomalyData?.trends?.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={anomalyData.trends}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.1} />
                            <XAxis 
                                dataKey="date" 
                                tickFormatter={(v) => new Date(v).getDate()} 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ opacity: 0.6, fill: "currentColor" }} 
                            />
                            <YAxis 
                                allowDecimals={false} 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ opacity: 0.6, fill: "currentColor" }} 
                            />
                            <Tooltip 
                                labelFormatter={(l) => new Date(l).toLocaleDateString()}
                                contentStyle={{ 
                                    borderRadius: '8px', 
                                    border: 'none', 
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    backgroundColor: 'hsl(var(--b1))', 
                                    color: 'currentColor'
                                }}
                                cursor={{ fill: 'currentColor', opacity: 0.1 }}
                            />
                            <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center opacity-50">No trends available</div>
                )}
            </div>
        </div>
      </div>

      {/* 3. Recent Activity List */}
      <div className="rounded-xl border shadow-sm overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 pb-4 border-b border-opacity-10 border-current">
            <h3 className="font-semibold text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 opacity-70" />
                Recent Anomalies
            </h3>
        </div>
        <div className="p-6">
            <div className="space-y-4">
                {anomalyData?.recent?.map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:opacity-80 transition-opacity gap-4">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-full ${
                                item.severity === 'Critical' ? 'bg-red-500/10 text-red-600' : 'bg-orange-500/10 text-orange-600'
                            }`}>
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-medium">{item.type}</p>
                                <p className="text-xs opacity-60">Detected: {new Date(item.time).toLocaleString()}</p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            item.severity === 'Critical' ? 'border-red-200 text-red-600 bg-red-500/5' : 
                            'border-orange-200 text-orange-600 bg-orange-500/5'
                        }`}>
                            {item.severity}
                        </span>
                    </div>
                ))}
                
                {(!anomalyData?.recent || anomalyData.recent.length === 0) && (
                    <div className="flex flex-col items-center justify-center py-8 opacity-50">
                        <CheckCircle className="w-8 h-8 mb-2 text-green-500 opacity-60" />
                        <p>System is healthy. No recent anomalies detected.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </main>
  );
};

export default AnomaliesPage;