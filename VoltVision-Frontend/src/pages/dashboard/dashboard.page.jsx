
import { useGetSolarUnitForUserQuery } from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";
import { AlertCircle, Zap, LayoutDashboard, BarChart3, Loader2 } from "lucide-react";

// Import Components
import DataChart from "./components/DataChart";
import WeatherWidget from "../weather/WeatherWidget"; // New
import CapacityFactorChart from "../weather/CapacityFactorChart"; // New

const DashboardPage = () => {
  const { user, isLoaded } = useUser();

  const { 
    data: solarUnit, 
    isLoading: isLoadingSolarUnit, 
    isError: isErrorSolarUnit, 
    error: errorSolarUnit 
  } = useGetSolarUnitForUserQuery();

  // --- LOADING STATE ---
  if (isLoadingSolarUnit || !isLoaded) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse text-sm font-medium">Loading dashboard...</p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (isErrorSolarUnit) {
    return (
      <div className="p-8 flex justify-center">
        <div className="max-w-lg w-full rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-sm">Error loading data</h3>
            <div className="text-xs mt-1 text-red-700 opacity-90">
              {errorSolarUnit?.message || "Please check your connection."}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- NO UNIT STATE ---
  if (!solarUnit) {
    return (
      <div className="p-8 max-w-4xl mx-auto mt-10">
        <div className="flex flex-col items-center text-center p-12 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
            <Zap className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user?.firstName}!
          </h1>
          <p className="text-gray-500 max-w-md mb-6 leading-relaxed">
            You don't have a solar unit linked to your account yet. 
            Please ask an administrator to assign one to you to start monitoring.
          </p>
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-500 shadow-sm">
            No Active Units
          </span>
        </div>
      </div>
    );
  }

  // --- MAIN DASHBOARD CONTENT ---
  return (
    <main className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto pb-20 animate-in fade-in duration-500">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight ">
             {user?.firstName}'s House
          </h1>
          <div className="flex items-center gap-2 mt-2 ">
             <LayoutDashboard className="w-4 h-4" />
             <span className="text-sm font-medium">Monitoring Unit:</span>
             <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-mono font-medium text-gray-700 ring-1 ring-inset ring-gray-500/10">
                {solarUnit.serialNumber}
             </span>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className={`px-4 py-2 rounded-full border flex items-center gap-2 font-medium text-sm shadow-sm ${
            solarUnit.status === 'ACTIVE' 
            ? 'bg-green-50 text-green-700 border-green-200' 
            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
        }`}>
            <span className={`flex h-2.5 w-2.5 relative`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    solarUnit.status === 'ACTIVE' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    solarUnit.status === 'ACTIVE' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></span>
            </span>
            {solarUnit.status}
        </div>
      </div>

      {/* 2. Weather & Environment (Full Width) */}
      <section>
        <div className="w-full">
           {/* Passing solarUnit so it can calculate real-time estimated power */}
           <WeatherWidget solarUnit={solarUnit} />
        </div>
      </section>

      {/* 3. Charts Grid */}
      <section className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        
        {/* Live Power Chart Card */}
        <div className="rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm">
            <div className="p-6">
                <h3 className="text-lg font-semibold leading-none tracking-tight flex items-center gap-2 mb-6">
                    <Zap className="w-5 h-5 text-yellow-500 fill-current" />
                    Power Generation (Live)
                </h3>
                <DataChart solarUnitId={solarUnit._id} />
            </div>
        </div>

        {/* Efficiency Chart Card */}
        <div className="rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm">
            <div className="p-6">
                <h3 className="text-lg font-semibold leading-none tracking-tight flex items-center gap-2 mb-6">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    System Efficiency
                </h3>
                <CapacityFactorChart solarUnitId={solarUnit._id} />
            </div>
        </div>

      </section>

    </main>
  );
};

export default DashboardPage;