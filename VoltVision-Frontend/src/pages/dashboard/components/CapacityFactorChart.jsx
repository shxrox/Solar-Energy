import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useGetCapacityFactorQuery } from "@/lib/redux/query";
import { AlertCircle } from "lucide-react";

export default function CapacityFactorChart({ solarUnitId }) {
  const { data: stats, isLoading } = useGetCapacityFactorQuery(solarUnitId);

  if (isLoading) return <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading chart...</div>;

  // Handle Empty Data
  if (!stats || stats.length === 0) {
    return (
      <Card className="col-span-1 lg:col-span-2 h-full min-h-[350px]">
        <CardHeader>
          <CardTitle>System Efficiency</CardTitle>
          <p className="text-sm text-muted-foreground">Capacity Factor (Last 30 Days)</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[250px] text-gray-400">
          <AlertCircle className="w-10 h-10 mb-2 opacity-20" />
          <p>No efficiency data available yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1 lg:col-span-2 h-full">
      <CardHeader>
        <CardTitle>System Efficiency (Capacity Factor)</CardTitle>
        <p className="text-sm text-muted-foreground">
          Percentage of theoretical maximum output achieved per day.
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tickFormatter={(val) => new Date(val).getDate()} // Show only day number
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                unit="%" 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`${value}%`, 'Efficiency']}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              {/* Conditional Coloring: Green for good days, Yellow for low output */}
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
      </CardContent>
    </Card>
  );
}