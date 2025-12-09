
import { CloudSun, Sun, Cloud, Wind, Zap, Activity, Battery, Thermometer, Loader2 } from "lucide-react";
import { useGetWeatherQuery } from "@/lib/redux/query";

export default function WeatherWidget({ solarUnit }) {
  const { data: weather, isLoading } = useGetWeatherQuery();

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center min-h-[300px] rounded-xl border border-gray-200  shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-xs text-gray-500 font-medium">Syncing weather data...</span>
        </div>
      </div>
    );
  }

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
  const totalEnergy = (capacityKW * 5 * 30 / 1000).toFixed(2); 

  // Icon & Color Logic
  let WeatherIcon = Sun;
  let weatherColor = "text-yellow-500";
  
  if (clouds > 20) { WeatherIcon = CloudSun; weatherColor = "text-orange-400"; }
  if (clouds > 60) { WeatherIcon = Cloud; weatherColor = "text-gray-400"; }
  if (!isDay) { weatherColor = "text-blue-600"; }

  // Clean, minimal stat item component (Pure Tailwind)
  const StatItem = ({ label, value, subValue, icon: Icon, iconClass }) => (
    <div className="flex flex-col justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-600 hover:border-blue-100 hover:shadow-sm transition-all duration-200 group">
        <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-black transition-colors">
              {label}
            </span>
            <Icon className={`w-4 h-4 ${iconClass} opacity-80`} />
        </div>
        <div>
            <div className="text-2xl font-bold text-gray-900 tracking-tight">{value}</div>
            {subValue && (
              <div className="text-xs  font-medium mt-1">
                {subValue}
              </div>
            )}
        </div>
    </div>
  );

  return (
    // Main Container (Replaces Card)
    <div className="h-full rounded-xl border border-gray-200  shadow-sm">
      
      {/* Header (Replaces CardHeader) */}
      <div className="flex flex-row items-center justify-between p-6 pb-4 border-b border-gray-100">
        <div className="space-y-1">
          <h3 className="text-base font-semibold leading-none tracking-tight flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-blue-600" />
            Environmental Context
          </h3>
          <p className="text-xs text-gray-500">Real-time impact on generation</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-gray-50">
           <WeatherIcon className={`h-4 w-4 ${weatherColor}`} />
           <span className="text-xs font-medium text-gray-700">{isDay ? "Daytime" : "Nighttime"}</span>
        </div>
      </div>
      
      {/* Content (Replaces CardContent) */}
      <div className="p-6 pt-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Row 1: Weather Factors */}
            <StatItem 
                label="Temperature" 
                value={`${temp}°C`} 
                subValue="Ambient Air" 
                icon={Thermometer} 
                iconClass={weatherColor} 
            />
            <StatItem 
                label="Wind Speed" 
                value={`${windSpeed} m/s`} 
                subValue="Panel Cooling" 
                icon={Wind} 
                iconClass="text-blue-400" 
            />
            <StatItem 
                label="Cloud Cover" 
                value={`${clouds}%`} 
                subValue={clouds > 50 ? "High Coverage" : "Clear Sky"} 
                icon={Cloud} 
                iconClass="text-gray-400" 
            />

            {/* Row 2: System Performance */}
            <StatItem 
                label="Current Output" 
                value={`${realTimePower} kW`} 
                subValue={`${(efficiency * 100).toFixed(0)}% Efficiency`} 
                icon={Zap} 
                iconClass="text-yellow-500 fill-yellow-500" 
            />
             <StatItem 
                label="System Size" 
                value={`${peakPower} kW`} 
                subValue="Rated Capacity" 
                icon={Activity} 
                iconClass="text-blue-600" 
            />
            <StatItem 
                label="Est. Monthly" 
                value={`${totalEnergy} MWh`} 
                subValue="Projected Yield" 
                icon={Battery} 
                iconClass="text-green-500" 
            />
        </div>
      </div>
    </div>
  );
}