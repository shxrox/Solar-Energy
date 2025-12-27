
// import { useGetSolarUnitForUserQuery } from "@/lib/redux/query";
// import { useUser } from "@clerk/clerk-react";
// import { AlertCircle, Zap, LayoutDashboard, Loader2 } from "lucide-react";
// import DataChart from "./components/DataChart";
// import WeatherWidget from "../weather/WeatherWidget";
// import CapacityFactorChart from "../weather/CapacityFactorChart";

// const DashboardPage = () => {
//   const { user, isLoaded } = useUser();

//   const { 
//     data: solarUnit, 
//     isLoading: isLoadingSolarUnit, 
//     isError: isErrorSolarUnit, 
//     error: errorSolarUnit 
//   } = useGetSolarUnitForUserQuery();

//   if (isLoadingSolarUnit || !isLoaded) {
//     return (
//       <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
//         {/* ✅ Theme-aware loader */}
//         <Loader2 className="h-12 w-12 animate-spin text-foreground" />
//         <p className="animate-pulse text-sm font-medium text-muted-foreground">Loading dashboard...</p>
//       </div>
//     );
//   }

//   if (isErrorSolarUnit) {
//     return (
//       <div className="p-8 flex justify-center">
//         {/* ✅ Theme-aware error card */}
//         <div className="max-w-lg w-full rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive flex items-start gap-3">
//           <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
//           <div>
//             <h3 className="font-semibold text-sm">Error loading data</h3>
//             <div className="text-xs mt-1 opacity-90">
//               {errorSolarUnit?.message || "Please check your connection."}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!solarUnit) {
//     return (
//       <div className="p-8 max-w-4xl mx-auto mt-10">
//         <div className="flex flex-col items-center text-center p-12 border-2 border-dashed border-muted rounded-3xl">
//           <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-border bg-card">
//             <Zap className="w-8 h-8 text-muted-foreground" />
//           </div>
//           <h1 className="text-3xl font-bold mb-2 text-foreground">
//             Welcome, {user?.firstName}!
//           </h1>
//           <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
//             You don't have a solar unit linked to your account yet. 
//           </p>
//           <span className="inline-flex items-center border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium text-foreground rounded-full">
//             No Active Units
//           </span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <main className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto pb-20 animate-in fade-in duration-500">
      
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
//         <div>
//           <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight ">
//              {user?.firstName}'s House
//           </h1>
//           <div className="flex items-center gap-2 mt-2">
//              <LayoutDashboard className="w-4 h-4" />
//              <span className="text-sm font-medium">Monitoring Unit:</span>
//              <span className="inline-flex items-center px-2 py-1 text-xs font-mono font-medium border border-border rounded-md ">
//                 {solarUnit.serialNumber}
//              </span>
//           </div>
//         </div>
        
//         {/* ✅ STATUS BADGE: Adapts to Dark/Light Mode */}
//         <div className={`px-4 py-2 rounded-full border flex items-center gap-2 font-bold text-xs tracking-wider shadow-sm transition-colors ${
//             solarUnit.status === 'ACTIVE' 
//             ? 'bg-foreground text-background border-foreground' // Inverted colors (Black on White / White on Black)
//             : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400'
//         }`}>
//             <span className="flex h-2 w-2 relative">
//                 <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
//                     solarUnit.status === 'ACTIVE' ? 'bg-background' : 'bg-yellow-500'
//                 }`}></span>
//                 <span className={`relative inline-flex rounded-full h-2 w-2 ${
//                     solarUnit.status === 'ACTIVE' ? 'bg-background' : 'bg-yellow-500'
//                 }`}></span>
//             </span>
//             {solarUnit.status}
//         </div>
//       </div>

//       {/* Weather Section */}
//       <section>
//         <div className="w-full">
//            <WeatherWidget solarUnit={solarUnit} />
//         </div>
//       </section>

//       {/* Charts Grid */}
//       <section className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        
//         {/* Live Power Chart */}
//         <div className="">
//             <DataChart solarUnitId={solarUnit._id} />
//         </div>

//         {/* Efficiency Chart */}
//         <div className="">
//             <CapacityFactorChart solarUnitId={solarUnit._id} />
//         </div>

//       </section>

//     </main>
//   );
// };

// export default DashboardPage;

import { useGetSolarUnitForUserQuery } from "@/lib/redux/query";
import { useUser } from "@clerk/clerk-react";
import { AlertCircle, Zap, LayoutDashboard, Loader2 } from "lucide-react";
import DataChart from "./components/DataChart";
import WeatherWidget from "../weather/WeatherWidget";
import CapacityFactorChart from "../weather/CapacityFactorChart";

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
        {/* daisyUI: text-primary uses your theme's main brand color */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        {/* daisyUI: text-base-content/60 is the standard 'muted' text style */}
        <p className="animate-pulse text-sm font-medium text-base-content/60">Loading dashboard...</p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (isErrorSolarUnit) {
    return (
      <div className="p-8 flex justify-center">
        {/* daisyUI: Using semantic error colors manually for custom layout */}
        <div className="max-w-lg w-full rounded-lg border border-error/50 bg-error/10 p-4 text-error flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <div>
            <h3 className="font-semibold text-sm">Error loading data</h3>
            <div className="text-xs mt-1 opacity-90">
              {errorSolarUnit?.message || "Please check your connection."}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- EMPTY STATE ---
  if (!solarUnit) {
    return (
      <div className="p-8 max-w-4xl mx-auto mt-10">
        <div className="flex flex-col items-center text-center p-12 border-2 border-dashed border-base-300 rounded-3xl">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-base-200 bg-base-100">
            <Zap className="w-8 h-8 text-base-content/40" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-base-content">
            Welcome, {user?.firstName}!
          </h1>
          <p className="text-base-content/60 max-w-md mb-6 leading-relaxed">
            You don't have a solar unit linked to your account yet. 
          </p>
          <span className="inline-flex items-center border border-base-300 bg-base-200/50 px-4 py-1.5 text-sm font-medium text-base-content rounded-full">
            No Active Units
          </span>
        </div>
      </div>
    );
  }

  // --- MAIN DASHBOARD ---
  return (
    <main className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto pb-20 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-base-content">
             {user?.firstName}'s House
          </h1>
          <div className="flex items-center gap-2 mt-2 text-base-content/70">
             <LayoutDashboard className="w-4 h-4" />
             <span className="text-sm font-medium">Monitoring Unit:</span>
             <span className="inline-flex items-center px-2 py-1 text-xs font-mono font-medium border border-base-300 rounded-md text-base-content">
                {solarUnit.serialNumber}
             </span>
          </div>
        </div>
        
        {/* ✅ STATUS BADGE: DAISY UI THEME ADAPTIVE */}
        <div className={`px-4 py-2 rounded-full border flex items-center gap-2 font-bold text-xs tracking-wider shadow-sm transition-colors ${
            solarUnit.status === 'ACTIVE' 
            ? 'bg-base-content text-base-100 border-base-content' // Inverts colors (Black on White / White on Black) automatically
            : 'bg-warning/10 text-warning border-warning/20'      // Standard warning colors
        }`}>
            <span className="flex h-2 w-2 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    solarUnit.status === 'ACTIVE' ? 'bg-base-100' : 'bg-warning'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                    solarUnit.status === 'ACTIVE' ? 'bg-base-100' : 'bg-warning'
                }`}></span>
            </span>
            {solarUnit.status}
        </div>
      </div>

      {/* Weather Section */}
      <section>
        <div className="w-full">
           <WeatherWidget solarUnit={solarUnit} />
        </div>
      </section>

      {/* Charts Grid */}
      <section className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        
        {/* Live Power Chart */}
        <div className="text-base-content">
            <DataChart solarUnitId={solarUnit._id} />
        </div>

        {/* Efficiency Chart */}
        <div className="text-base-content">
            <CapacityFactorChart solarUnitId={solarUnit._id} />
        </div>

      </section>

    </main>
  );
};

export default DashboardPage;