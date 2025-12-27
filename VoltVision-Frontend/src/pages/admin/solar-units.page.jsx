

import { SolarUnitsTab } from "./components/SolarUnitsTab";
import { useGetSolarUnitsQuery } from "@/lib/redux/query";
import { Sun, Zap, CheckCircle, AlertTriangle, Server } from "lucide-react";

export default function SolarUnitsPage() {
  const { data: solarUnits, isLoading } = useGetSolarUnitsQuery();

  // Calculate Summary Stats
  const totalUnits = solarUnits?.length || 0;
  const activeUnits = solarUnits?.filter(u => u.status?.toUpperCase() === 'ACTIVE').length || 0;
  const maintenanceUnits = solarUnits?.filter(u => u.status?.toUpperCase() === 'MAINTENANCE').length || 0;
  
  // Sum capacity (Watts)
  const totalCapacity = solarUnits?.reduce((acc, curr) => acc + (curr.capacity || 0), 0) || 0;

  return (
    <main className="p-4 md:p-8 space-y-12 max-w-7xl mx-auto pb-20 animate-in fade-in duration-500">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3 text-base-content">
          {/* Use 'text-warning' for Sun to keep it yellow/warm in all themes */}
          <Sun className="h-8 w-8 text-warning fill-warning" />
          Solar Fleet Management
        </h1>
        <p className="text-lg text-base-content/60 max-w-2xl">
          Monitor operational status, track total capacity, and manage infrastructure across all connected systems.
        </p>
      </div>

      {/* --- KPI STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Card 1: Total Units (Blue -> Info) */}
        <div className="flex flex-col gap-4">
          <div className="text-info">
            <Server className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">Total Units</p>
            <p className="text-4xl font-black text-base-content">
              {isLoading ? (
                <span className="opacity-20 animate-pulse">--</span>
              ) : (
                totalUnits
              )}
            </p>
          </div>
        </div>

        {/* Card 2: Total Capacity (Purple -> Primary) */}
        <div className="flex flex-col gap-4">
          <div className="text-primary">
            <Zap className="h-6 w-6 fill-current" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">Grid Capacity</p>
            <p className="text-4xl font-black text-base-content">
              {isLoading ? (
                <span className="opacity-20 animate-pulse">--.-</span>
              ) : (
                <>
                  {(totalCapacity / 1000).toFixed(1)} 
                  <span className="text-xl font-medium opacity-50 ml-1 text-base-content/60">kW</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Card 3: Online Status (Emerald -> Success) */}
        <div className="flex flex-col gap-4">
          <div className="text-success">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">Online Systems</p>
            <p className="text-4xl font-black text-success">
              {isLoading ? (
                <span className="opacity-20 animate-pulse">--</span>
              ) : (
                activeUnits
              )}
            </p>
          </div>
        </div>

        {/* Card 4: Maintenance (Orange -> Warning) */}
        <div className="flex flex-col gap-4">
          <div className="text-warning">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">Maintenance</p>
            <p className="text-4xl font-black text-warning">
              {isLoading ? (
                <span className="opacity-20 animate-pulse">--</span>
              ) : (
                maintenanceUnits
              )}
            </p>
          </div>
        </div>

      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="mt-12 pt-8 border-t border-base-200">
        <SolarUnitsTab />
      </div>
      
    </main>
  );
}