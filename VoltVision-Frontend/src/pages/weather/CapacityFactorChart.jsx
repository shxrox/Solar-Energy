// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// import { useGetCapacityFactorQuery } from "@/lib/redux/query";

// export default function CapacityFactorChart({ solarUnitId }) {
//   const { data: stats, isLoading } = useGetCapacityFactorQuery(solarUnitId);

//   if (isLoading) return <div>Loading chart...</div>;

//   return (
//     <Card className="col-span-2"> {/* Spans 2 columns on large screens */}
//       <CardHeader>
//         <CardTitle>Efficiency (Capacity Factor)</CardTitle>
//         <p className="text-sm text-gray-500">
//           How much energy your system produces vs. its theoretical maximum (Last 7 Days)
//         </p>
//       </CardHeader>
//       <CardContent>
//         <div className="h-[300px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={stats}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis unit="%" />
//               <Tooltip 
//                 formatter={(value) => [`${value}%`, 'Efficiency']}
//                 labelStyle={{ color: 'black' }}
//               />
//               <Bar dataKey="capacityFactor" radius={[4, 4, 0, 0]}>
//                 {stats?.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.capacityFactor > 15 ? "#22c55e" : "#eab308"} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
// import { useGetCapacityFactorQuery } from "@/lib/redux/query";
// import { AlertCircle } from "lucide-react";

// export default function CapacityFactorChart({ solarUnitId }) {
//   const { data: stats, isLoading } = useGetCapacityFactorQuery(solarUnitId);

//   if (isLoading) return <div className="h-[300px] flex items-center justify-center text-muted-foreground text-sm">Loading chart...</div>;

//   if (!stats || stats.length === 0) {
//     return (
//       <Card className="col-span-1 lg:col-span-2 h-full min-h-[350px]">
//         <CardHeader>
//           <CardTitle>System Efficiency</CardTitle>
//           <p className="text-sm text-muted-foreground">Capacity Factor (Last 30 Days)</p>
//         </CardHeader>
//         <CardContent className="flex flex-col items-center justify-center h-[250px] text-gray-400">
//           <AlertCircle className="w-10 h-10 mb-2 opacity-20" />
//           <p className="text-sm">No efficiency data available yet.</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className="col-span-1 lg:col-span-2 h-full">
//       <CardHeader>
//         <CardTitle>System Efficiency (Capacity Factor)</CardTitle>
//         <p className="text-sm text-muted-foreground">
//           Percentage of theoretical maximum output achieved per day.
//         </p>
//       </CardHeader>
//       <CardContent>
//         <div className="h-[300px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={stats}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <XAxis 
//                 dataKey="date" 
//                 tickFormatter={(val) => new Date(val).getDate()} 
//                 tickLine={false}
//                 axisLine={false}
//                 fontSize={12}
//               />
//               <YAxis 
//                 unit="%" 
//                 tickLine={false}
//                 axisLine={false}
//                 fontSize={12}
//               />
//               <Tooltip 
//                 cursor={{ fill: 'transparent' }}
//                 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
//                 formatter={(value) => [`${value}%`, 'Efficiency']}
//                 labelFormatter={(label) => new Date(label).toLocaleDateString()}
//               />
//               <Bar dataKey="capacityFactor" radius={[4, 4, 0, 0]}>
//                 {stats.map((entry, index) => (
//                   <Cell 
//                     key={`cell-${index}`} 
//                     fill={entry.capacityFactor > 15 ? "hsl(var(--primary))" : "#eab308"} 
//                   />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useGetCapacityFactorQuery } from "@/lib/redux/query";
import { AlertCircle } from "lucide-react";

export default function CapacityFactorChart({ solarUnitId }) {
  const { data: stats, isLoading } = useGetCapacityFactorQuery(solarUnitId);

  if (isLoading)
    return (
      <div className="h-[300px] flex items-center justify-center text-sm">
        Loading chart...
      </div>
    );

  if (!stats || stats.length === 0) {
    return (
      <div className="col-span-1 lg:col-span-2 h-full min-h-[350px] border rounded-xl p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">System Efficiency</h2>
          <p className="text-sm">Capacity Factor (Last 30 Days)</p>
        </div>

        <div className="flex flex-col items-center justify-center h-[250px]">
          <AlertCircle className="w-10 h-10 mb-2 opacity-20" />
          <p className="text-sm">No efficiency data available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-1 lg:col-span-2 h-full border rounded-xl p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">System Efficiency (Capacity Factor)</h2>
        <p className="text-sm">
          Percentage of theoretical maximum output achieved per day.
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(val) => new Date(val).getDate()}
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis
              unit="%"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              formatter={(value) => [`${value}%`, 'Efficiency']}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Bar dataKey="capacityFactor" radius={[4, 4, 0, 0]}>
              {stats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.capacityFactor > 15 ? "hsl(var(--primary))" : "#eab308"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
