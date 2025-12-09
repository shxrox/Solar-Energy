

import { CloudSun, Sun, Cloud, Wind, Zap, Activity, Battery, Thermometer, Droplets } from "lucide-react";
import { useGetWeatherQuery } from "@/lib/redux/query";

export default function WeatherWidget({ solarUnit }) {
  const { data: weather, isLoading } = useGetWeatherQuery();

  // --- 1. SKELETON LOADING STATE ---
  if (isLoading) {
    return (
      <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
          <div className="h-8 w-24 bg-gray-100 rounded-full animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-gray-50 rounded-xl animate-pulse" />
          <div className="h-24 bg-gray-50 rounded-xl animate-pulse" />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-auto">
          <div className="h-16 bg-gray-50 rounded-xl animate-pulse" />
          <div className="h-16 bg-gray-50 rounded-xl animate-pulse" />
          <div className="h-16 bg-gray-50 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  const current = weather?.current;
  
  // Weather Data
  const temp = current?.temperature_2m || 0;
  const windSpeed = current?.wind_speed_10m || 0;
  const clouds = current?.cloud_cover || 0;
  const isDay = current?.is_day === 1;

  // Solar Calculations
  const capacityKW = (solarUnit?.capacity || 0) / 1000;
  
  // Efficiency Logic
  let efficiency = 1;
  if (clouds > 50) efficiency = 0.6;
  if (!isDay) efficiency = 0;
  const efficiencyPercent = (efficiency * 100).toFixed(0);

  const realTimePower = (capacityKW * efficiency).toFixed(1);
  const peakPower = capacityKW.toFixed(1);
  const totalEnergy = (capacityKW * 5 * 30 / 1000).toFixed(2); // Est. Monthly MWh

  // Dynamic Theme Logic
  let WeatherIcon = Sun;
  let themeColor = "text-amber-500";
  let themeBg = "bg-amber-50";
  let statusText = "Excellent Conditions";
  
  if (clouds > 20) { WeatherIcon = CloudSun; themeColor = "text-orange-500"; themeBg = "bg-orange-50"; statusText = "Good Output"; }
  if (clouds > 60) { WeatherIcon = Cloud; themeColor = "text-slate-500"; themeBg = "bg-slate-50"; statusText = "Low Light"; }
  if (!isDay) { themeColor = "text-indigo-500"; themeBg = "bg-indigo-50"; statusText = "System Offline"; }

  return (
    <div className="h-full rounded-2xl border  shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300">
      
      {/* --- HEADER --- */}
      <div className="px-6 py-5 border-b border-gray-100 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${themeBg}`}>
            <WeatherIcon className={`w-5 h-5 ${themeColor}`} />
          </div>
          <div>
            <h3 className="text-sm font-bold  leading-none">Environmental Context</h3>
            <p className="text-xs  mt-1">{statusText}</p>
          </div>
        </div>
        
        {/* Day/Night Badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${isDay ? "bg-sky-50 text-sky-700 border-sky-100" : "bg-slate-900 text-slate-300 border-slate-700"}`}>
           {isDay ? "Daytime" : "Nighttime"}
        </div>
      </div>
      
      <div className="p-6 flex flex-col gap-6 flex-1">
        
        {/* --- HERO METRICS (Split 50/50) --- */}
        <div className="grid grid-cols-2 gap-4">
            
            {/* 1. Ambient Temp */}
            <div className="relative overflow-hidden rounded-2xl  from-orange-50 to-white border border-orange-100 p-4 group">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-orange-600/70 uppercase tracking-wider">Temperature</span>
                    <Thermometer className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-bold tracking-tight">{temp}°</div>
                <div className="text-xs  mt-1">Local Ambient</div>
            </div>

            {/* 2. Real-Time Output */}
            <div className="relative overflow-hidden rounded-2xl  from-yellow-50 to-white border border-yellow-100 p-4 group">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-yellow-600/70 uppercase tracking-wider">Current Output</span>
                    <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold  tracking-tight">{realTimePower}</span>
                    <span className="text-sm font-medium ">kW</span>
                </div>
                {/* Efficiency Bar */}
                <div className="mt-3 w-full bg-yellow-100/50 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full transition-all duration-1000" style={{ width: `${efficiencyPercent}%` }} />
                </div>
            </div>
        </div>

        {/* --- SECONDARY METRICS GRID --- */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MiniStat 
                icon={Wind} color="text-blue-500" bg="bg-blue-50"
                label="Wind Speed" value={`${windSpeed} m/s`} 
            />
            <MiniStat 
                icon={Cloud} color="text-slate-500" bg="bg-slate-50"
                label="Cloud Cover" value={`${clouds}%`} 
            />
            <MiniStat 
                icon={Activity} color="text-emerald-500" bg="bg-emerald-50"
                label="Capacity" value={`${peakPower} kW`} 
            />
            <MiniStat 
                icon={Battery} color="text-purple-500" bg="bg-purple-50"
                label="Est. MWh" value={totalEnergy} 
            />
        </div>

      </div>
    </div>
  );
}

// Helper: Compact Stat Item
function MiniStat({ icon: Icon, label, value, color, bg }) {
    return (
        <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-gray-50 bg-gray-50/30 hover:bg-slate-900 hover:shadow-sm hover:border-gray-200 transition-all duration-200">
            <div className={`p-1.5 rounded-lg ${bg} ${color} mb-2`}>
                <Icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold ">{value}</span>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide text-center">{label}</span>
        </div>
    );
}