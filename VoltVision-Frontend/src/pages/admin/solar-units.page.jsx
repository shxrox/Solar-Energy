


import { SolarUnitsTab } from "./components/SolarUnitsTab";
import { useGetSolarUnitsQuery } from "@/lib/redux/query";
import { Sun, Zap, CheckCircle, AlertTriangle, Activity, Server } from "lucide-react";

export default function SolarUnitsPage() {
  // Fetch data here too for the KPI Summary Cards
  const { data: solarUnits, isLoading } = useGetSolarUnitsQuery();

  // Calculate Summary Stats
  const totalUnits = solarUnits?.length || 0;
  const activeUnits = solarUnits?.filter(u => u.status === 'ACTIVE').length || 0;
  const maintenanceUnits = solarUnits?.filter(u => u.status === 'MAINTENANCE').length || 0;
  // Sum capacity (Watts) -> Convert to kW
  const totalCapacity = solarUnits?.reduce((acc, curr) => acc + (curr.capacity || 0), 0) || 0;

  return (
    <main className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto pb-20 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3">
          <Sun className="h-8 w-8 text-yellow-500 fill-yellow-500" />
          Solar Fleet Management
        </h1>
        <p className="text-lg opacity-70 max-w-2xl">
          Monitor operational status, track total capacity, and manage infrastructure across all connected systems.
        </p>
      </div>

      {/* --- KPI STATS GRID (New Feature) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Units */}
        <div className="p-6 rounded-2xl border bg-base-100/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Server className="h-5 w-5" />
            </div>
            {isLoading && <div className="h-4 w-12 bg-base-300 rounded animate-pulse" />}
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold opacity-60 uppercase tracking-wider">Total Units</p>
            <p className="text-3xl font-extrabold">{totalUnits}</p>
          </div>
        </div>

        {/* Card 2: Total Capacity */}
        <div className="p-6 rounded-2xl border bg-base-100/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Zap className="h-5 w-5 fill-current" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold opacity-60 uppercase tracking-wider">Grid Capacity</p>
            <p className="text-3xl font-extrabold">
              {(totalCapacity / 1000).toFixed(1)} <span className="text-base font-normal opacity-70">kW</span>
            </p>
          </div>
        </div>

        {/* Card 3: Online Status */}
        <div className="p-6 rounded-2xl border bg-base-100/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold opacity-60 uppercase tracking-wider">Online Systems</p>
            <p className="text-3xl font-extrabold text-emerald-600">{activeUnits}</p>
          </div>
        </div>

        {/* Card 4: Maintenance */}
        <div className="p-6 rounded-2xl border bg-base-100/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold opacity-60 uppercase tracking-wider">Maintenance</p>
            <p className="text-3xl font-extrabold text-orange-600">{maintenanceUnits}</p>
          </div>
        </div>

      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="mt-8">
        <SolarUnitsTab />
      </div>
      
    </main>
  );
}
