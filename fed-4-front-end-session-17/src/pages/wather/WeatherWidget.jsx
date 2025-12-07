// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CloudSun, Sun, CloudRain, Cloud } from "lucide-react";
// import { useGetWeatherQuery } from "@/lib/redux/query";

// export default function WeatherWidget() {
//   const { data: weather, isLoading } = useGetWeatherQuery();

//   if (isLoading) return <div>Loading weather...</div>;

//   const current = weather?.current;
//   const isDay = current?.is_day === 1;
//   const temp = current?.temperature_2m;
//   const clouds = current?.cloud_cover;

//   // Simple icon logic
//   let Icon = Sun;
//   let statusText = "Excellent for Solar";
//   let color = "text-yellow-500";

//   if (clouds > 20 && clouds < 60) {
//     Icon = CloudSun;
//     statusText = "Good Production";
//     color = "text-orange-400";
//   } else if (clouds >= 60) {
//     Icon = Cloud;
//     statusText = "Low Production";
//     color = "text-gray-500";
//   }
//   if (!isDay) {
//      statusText = "Night Time";
//      color = "text-blue-900";
//   }

//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">Live Weather</CardTitle>
//         <Icon className={`h-4 w-4 ${color}`} />
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">{temp}°C</div>
//         <p className="text-xs text-muted-foreground">
//           Cloud Cover: {clouds}%
//         </p>
//         <div className={`mt-2 text-sm font-semibold ${color}`}>
//             {statusText}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CloudSun, Sun, CloudRain, Cloud, Wind, Zap, Activity, Battery } from "lucide-react";
// import { useGetWeatherQuery } from "@/lib/redux/query";

// export default function WeatherWidget({ solarUnit }) {
//   const { data: weather, isLoading } = useGetWeatherQuery();

//   if (isLoading) return <div className="p-4 text-sm">Loading weather...</div>;

//   const current = weather?.current;
  
//   // 1. Weather Data
//   const temp = current?.temperature_2m || 0;
//   const windSpeed = current?.wind_speed_10m || 0;
//   const clouds = current?.cloud_cover || 0;
//   const isDay = current?.is_day === 1;

//   // 2. Solar Data (Derived from the passed solarUnit prop)
//   // Note: In a real app, "Real-Time" would come from a live socket. 
//   // We will estimate based on Capacity and Weather for now.
//   const capacityKW = (solarUnit?.capacity || 0) / 1000;
  
//   // Simple simulation: Less power if cloudy or night
//   let efficiency = 1;
//   if (clouds > 50) efficiency = 0.6;
//   if (!isDay) efficiency = 0;

//   const realTimePower = (capacityKW * efficiency).toFixed(1);
//   const peakPower = capacityKW.toFixed(1);
  
//   // Mocking Total Energy for display (e.g., Capacity * 30 days * 5 hours)
//   const totalEnergy = (capacityKW * 5 * 30 / 1000).toFixed(1); // GWh placeholder

//   // Determine Icon
//   let WeatherIcon = Sun;
//   let color = "text-yellow-500";
//   if (clouds > 20) { WeatherIcon = CloudSun; color = "text-orange-400"; }
//   if (clouds > 60) { WeatherIcon = Cloud; color = "text-gray-500"; }
//   if (!isDay) { color = "text-blue-900"; }

//   // Helper Component for the grid items
//   const StatItem = ({ label, value, subValue, icon: Icon, iconColor }) => (
//     <div className="flex flex-col space-y-1 p-3 bg-secondary/20 rounded-lg">
//         <div className="flex items-center gap-2 text-muted-foreground mb-1">
//             <Icon className={`w-4 h-4 ${iconColor}`} />
//             <span className="text-xs font-medium uppercase">{label}</span>
//         </div>
//         <div className="text-xl font-bold text-foreground">{value}</div>
//         {subValue && <div className="text-xs text-muted-foreground">{subValue}</div>}
//     </div>
//   );

//   return (
//     <Card className="col-span-1 md:col-span-2 lg:col-span-2"> {/* Made wider to fit data */}
//       <CardHeader className="flex flex-row items-center justify-between pb-2">
//         <CardTitle className="text-base font-semibold">System & Weather Conditions</CardTitle>
//         <WeatherIcon className={`h-6 w-6 ${color}`} />
//       </CardHeader>
      
//       <CardContent>
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            
//             {/* Weather Column */}
//             <StatItem 
//                 label="Temperature" 
//                 value={`${temp}°C`} 
//                 subValue={isDay ? "Daytime" : "Nighttime"}
//                 icon={WeatherIcon} 
//                 iconColor={color} 
//             />
//             <StatItem 
//                 label="Wind Speed" 
//                 value={`${windSpeed} m/s`} 
//                 subValue="Avg (10 min)"
//                 icon={Wind} 
//                 iconColor="text-blue-400" 
//             />

//             {/* Power Column */}
//             <StatItem 
//                 label="Real-Time Power" 
//                 value={`${realTimePower} kW`} 
//                 subValue={`${(efficiency * 100).toFixed(0)}% Efficiency`}
//                 icon={Zap} 
//                 iconColor="text-yellow-500" 
//             />
//              <StatItem 
//                 label="Peak Power" 
//                 value={`${peakPower} kW`} 
//                 subValue="System Capacity"
//                 icon={Activity} 
//                 iconColor="text-red-500" 
//             />

//             {/* Energy Column */}
//             <StatItem 
//                 label="Total Energy" 
//                 value={`${totalEnergy} GWh`} 
//                 subValue="Lifetime"
//                 icon={Battery} 
//                 iconColor="text-green-500" 
//             />
//              <StatItem 
//                 label="Cloud Cover" 
//                 value={`${clouds}%`} 
//                 subValue={clouds > 50 ? "High Coverage" : "Clear Sky"}
//                 icon={Cloud} 
//                 iconColor="text-gray-400" 
//             />
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, Sun, Cloud, Wind, Zap, Activity, Battery } from "lucide-react";
import { useGetWeatherQuery } from "@/lib/redux/query";

export default function WeatherWidget({ solarUnit }) {
  const { data: weather, isLoading } = useGetWeatherQuery();

  if (isLoading) return <div className="p-4 text-sm text-muted-foreground">Loading weather...</div>;

  const current = weather?.current;
  
  // 1. Weather Data
  const temp = current?.temperature_2m || 0;
  const windSpeed = current?.wind_speed_10m || 0;
  const clouds = current?.cloud_cover || 0;
  const isDay = current?.is_day === 1;

  // 2. Solar Data Calculations
  // Get capacity in kW (default to 0 if unit not loaded yet)
  const capacityKW = (solarUnit?.capacity || 0) / 1000;
  
  // Simple efficiency simulation: Less power if cloudy or night
  let efficiency = 1;
  if (clouds > 50) efficiency = 0.6;
  if (!isDay) efficiency = 0;

  const realTimePower = (capacityKW * efficiency).toFixed(1);
  const peakPower = capacityKW.toFixed(1);
  
  // Mocking Total Energy for display (e.g., Capacity * 5 hours * 30 days)
  // In a real app, this would come from the database aggregation
  const totalEnergy = (capacityKW * 5 * 30 / 1000).toFixed(1); 

  // Icon Logic
  let WeatherIcon = Sun;
  let color = "text-yellow-500";
  if (clouds > 20) { WeatherIcon = CloudSun; color = "text-orange-400"; }
  if (clouds > 60) { WeatherIcon = Cloud; color = "text-gray-500"; }
  if (!isDay) { color = "text-blue-900"; }

  // Sub-component for individual stat items
  const StatItem = ({ label, value, subValue, icon: Icon, iconColor }) => (
    <div className="flex flex-col space-y-1 p-3 bg-secondary/20 rounded-lg border border-border/50">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Icon className={`w-4 h-4 ${iconColor}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
        </div>
        <div className="text-xl font-bold text-foreground">{value}</div>
        {subValue && <div className="text-xs text-muted-foreground">{subValue}</div>}
    </div>
  );

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Environmental Analysis</CardTitle>
        <WeatherIcon className={`h-6 w-6 ${color}`} />
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Weather Stats */}
            <StatItem 
                label="Temperature" 
                value={`${temp}°C`} 
                subValue={isDay ? "Daytime" : "Nighttime"} 
                icon={WeatherIcon} 
                iconColor={color} 
            />
            <StatItem 
                label="Wind Speed" 
                value={`${windSpeed} m/s`} 
                subValue="Avg (10 min)" 
                icon={Wind} 
                iconColor="text-blue-400" 
            />
            <StatItem 
                label="Cloud Cover" 
                value={`${clouds}%`} 
                subValue={clouds > 50 ? "Overcast" : "Clear Sky"} 
                icon={Cloud} 
                iconColor="text-gray-400" 
            />

            {/* Power Stats */}
            <StatItem 
                label="Real-Time Power" 
                value={`${realTimePower} kW`} 
                subValue={`${(efficiency * 100).toFixed(0)}% Efficiency`} 
                icon={Zap} 
                iconColor="text-yellow-500" 
            />
             <StatItem 
                label="Peak Capacity" 
                value={`${peakPower} kW`} 
                subValue="System Max" 
                icon={Activity} 
                iconColor="text-red-500" 
            />
            <StatItem 
                label="Total Energy" 
                value={`${totalEnergy} GWh`} 
                subValue="Lifetime Est." 
                icon={Battery} 
                iconColor="text-green-500" 
            />
        </div>
      </CardContent>
    </Card>
  );
}