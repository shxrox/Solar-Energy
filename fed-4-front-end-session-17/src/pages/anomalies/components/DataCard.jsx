// import { Card } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { format, toDate } from "date-fns";
// import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { detectAnomalies, getAnomalyStats } from "@/lib/anomalyDetection";
// import EnergyProductionCards from "./EnergyProductionCards";
// import EnergyTab from "./EnergyTab";

// const DataCard = ({ title = "Solar Energy Production", solarUnitId }) => {
//   // TEACHING NOTE: Change this to switch between different detection methods
//   // Options: 'windowAverage', 'absolute', 'combined'
//   const [detectionMethod, setDetectionMethod] = useState('windowAverage');

//   // TEACHING NOTE: Adjust these thresholds to demonstrate different sensitivity levels
//   const [thresholdPercent, setThresholdPercent] = useState(40); // % below average to flag
//   const [absoluteMin, setAbsoluteMin] = useState(5); // Minimum acceptable kWh

//   const tabs = [
//     { label: "All", value: "all" },
//     { label: "Anomaly", value: "anomaly" },
//   ];

//   const selectedTab = useSelector((state) => state.ui.selectedDashboardTab);

//   const { data, isLoading, isError, error } =
//     useGetEnergyGenerationRecordsBySolarUnitQuery({
//       id: solarUnitId,
//       groupBy: "date",
//       limit: 7,
//     });


//   if (isLoading) {
//     return (
//       <Card className="rounded-md p-4">
//         <Skeleton className="h-6 w-64 mb-4" />
//         <div className="grid grid-cols-7 gap-4 mt-4">
//           {Array.from({ length: 7 }).map((_, index) => (
//             <div key={index} className="col-span-1 px-2 py-1">
//               <div className="flex flex-col items-center justify-center space-y-2">
//                 <Skeleton className="h-3 w-12" />
//                 <Skeleton className="h-6 w-16" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </Card>
//     );
//   }

//   if (!data || isError) {
//     return null;
//   }

//   // Get last 7 days of data
//   const last7Days = data

//   // Apply anomaly detection with options
//   const dataWithAnomalies = detectAnomalies(last7Days, detectionMethod, {
//     windowThresholdPercent: thresholdPercent,
//     absoluteThreshold: absoluteMin
//   });

//   // Transform to UI format
//   const energyProductionData = dataWithAnomalies.map((el) => {
//     return {
//       day: format(toDate(el._id.date), "EEE"),
//       date: format(toDate(el._id.date), "MMM d"),
//       production: el.totalEnergy,
//       hasAnomaly: el.hasAnomaly,
//       anomalyType: el.anomalyType,
//       anomalyReason: el.anomalyReason,
//     };
//   });

//   // Filter based on selected tab
//   const filteredData = energyProductionData.filter((el) => {
//     if (selectedTab === "all") {
//       return true;
//     } else if (selectedTab === "anomaly") {
//       return el.hasAnomaly;
//     }
//   });

//   // TEACHING NOTE: Log anomaly statistics to console for students to see
//   const stats = getAnomalyStats(dataWithAnomalies);
//   console.log('Anomaly Detection Stats:', stats);
//   console.log('Detection Method:', detectionMethod);
//   console.log('Data with Anomalies:', dataWithAnomalies);

//   return (
//     <Card className="rounded-md p-6">
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h2 className="text-2xl font-bold text-foreground mb-2">
//             {title}
//           </h2>
//           <p className="text-gray-600">Daily energy output for the past 7 days</p>
//         </div>

//         {/* Detection Method Selector - for teaching demonstrations */}
//         <div className="flex flex-col gap-2">
//           <div className="flex flex-col gap-1">
//             <label className="text-xs text-gray-500 font-medium">Detection Method:</label>
//             <select
//               value={detectionMethod}
//               onChange={(e) => setDetectionMethod(e.target.value)}
//               className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="windowAverage">Window Average (7-day)</option>
//               <option value="absolute">Absolute Threshold</option>
//             </select>
//           </div>

//           {/* Threshold Controls for Teaching */}
//           {detectionMethod === 'windowAverage' && (
//             <div className="flex flex-col gap-1">
//               <label className="text-xs text-gray-500 font-medium">
//                 Threshold: {thresholdPercent}% below average
//               </label>
//               <input
//                 type="range"
//                 min="20"
//                 max="60"
//                 value={thresholdPercent}
//                 onChange={(e) => setThresholdPercent(Number(e.target.value))}
//                 className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//               />
//             </div>
//           )}

//           {/* Absolute Minimum Threshold Control */}
//           {detectionMethod === 'absolute' && (
//             <div className="flex flex-col gap-1">
//               <label className="text-xs text-gray-500 font-medium">
//                 Minimum: {absoluteMin} kWh
//               </label>
//               <input
//                 type="range"
//                 min="1"
//                 max="15"
//                 value={absoluteMin}
//                 onChange={(e) => setAbsoluteMin(Number(e.target.value))}
//                 className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Anomaly Statistics - shows detection results */}
//       <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
//         <div className="flex items-center justify-between gap-4">
//           <div className="flex-1">
//             <p className="text-sm text-blue-900">
//               <span className="font-semibold">Window Average:</span> {stats.windowAverage} kWh
//               {' | '}
//               <span className="font-semibold">Range:</span> {stats.minEnergy} - {stats.maxEnergy} kWh
//             </p>
//           </div>
//           <div className="flex-1">
//             <p className="text-sm text-blue-900">
//               <span className="font-semibold">Anomalies:</span>{' '}
//               <span className={stats.anomalyCount > 0 ? 'text-red-600 font-bold' : 'text-green-600'}>
//                 {stats.anomalyCount}
//               </span>
//               {' '}out of {stats.totalRecords} days ({stats.anomalyRate})
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Tab Filters */}
//       <div className="mb-4 flex items-center gap-x-4">
//         {tabs.map((tab) => {
//           return <EnergyTab key={tab.value} tab={tab} />;
//         })}
//       </div>

//       {/* Energy Production Cards with Anomaly Detection */}
//       <EnergyProductionCards energyProductionData={filteredData} />
//     </Card>
//   );
// };

// export default DataCard;

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO, isValid } from "date-fns";
import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import { detectAnomalies, getAnomalyStats } from "@/lib/anomalyDetection"; 
import EnergyProductionCards from "./EnergyProductionCards";
import EnergyTab from "./EnergyTab";
import { Settings2, AlertCircle, BarChart3, Info } from "lucide-react";

const DataCard = ({ title = "Solar Energy Production", solarUnitId }) => {
  // --- STATE MANAGEMENT ---
  const [detectionMethod, setDetectionMethod] = useState("windowAverage");
  const [thresholdPercent, setThresholdPercent] = useState(40); 
  const [absoluteMin, setAbsoluteMin] = useState(5); 

  const [selectedTab, setSelectedTab] = useState("all"); 

  const tabs = [
    { label: "All Records", value: "all" },
    { label: "Anomalies Only", value: "anomaly" },
  ];

  // --- DATA FETCHING ---
  const { 
    data, 
    isLoading, 
    isError 
  } = useGetEnergyGenerationRecordsBySolarUnitQuery({
    id: solarUnitId,
    groupBy: "date",
    limit: 30, 
  });

  // --- ANOMALY PROCESSING ---
  const { processedData, stats } = useMemo(() => {
    if (!data) return { processedData: [], stats: {} };

    const detected = detectAnomalies(data, detectionMethod, {
      windowThresholdPercent: thresholdPercent,
      absoluteThreshold: absoluteMin
    });

    const statistics = getAnomalyStats(detected);

    return { processedData: detected, stats: statistics };
  }, [data, detectionMethod, thresholdPercent, absoluteMin]);

  // --- TRANSFORM FOR UI (FIXED DATE PARSING) ---
  const uiData = processedData.map((el) => {
    // 1. SAFE DATE EXTRACTION
    let dateStr = el.timestamp; // Default fallback
    
    if (el._id) {
        if (typeof el._id === 'string') {
            // Case A: _id is "2023-01-01"
            dateStr = el._id; 
        } else if (typeof el._id === 'object' && el._id.date) {
            // Case B: _id is { date: "2023-01-01" } (Common in Mongo Aggregations)
            dateStr = el._id.date;
        }
    }

    // 2. PARSE & VALIDATE
    // If dateStr is missing, default to today to prevent crash
    let dateObj = dateStr ? new Date(dateStr) : new Date();
    
    // If Date is "Invalid Date", fallback to today
    if (!isValid(dateObj)) {
        console.warn("Invalid date encountered in DataCard:", el);
        dateObj = new Date(); 
    }
    
    return {
      id: typeof el._id === 'string' ? el._id : JSON.stringify(el._id), // Unique key
      day: format(dateObj, "EEE"),      
      date: format(dateObj, "MMM d"),   
      production: el.totalEnergy,
      hasAnomaly: el.hasAnomaly,
      anomalyType: el.anomalyType,
      anomalyReason: el.anomalyReason,
    };
  });

  // --- FILTERING ---
  const filteredData = uiData.filter((el) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "anomaly") return el.hasAnomaly;
    return true;
  });

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <Card className="rounded-xl p-6 space-y-6">
        <div className="flex justify-between">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-8 w-1/4" />
        </div>
        <Skeleton className="h-24 w-full rounded-lg" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </Card>
    );
  }

  // --- ERROR / EMPTY STATE ---
  if (!data || isError || data.length === 0) {
    return (
        <Card className="p-12 text-center border-dashed flex flex-col items-center justify-center text-muted-foreground bg-muted/10">
            <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
            <h3 className="text-lg font-semibold text-foreground">No Data Available</h3>
            <p className="max-w-xs mx-auto mt-2">
                There is no energy generation data available for this unit yet.
            </p>
        </Card>
    );
  }

  return (
    <Card className="rounded-xl p-0 overflow-hidden bg-card border-border shadow-sm">
      
      {/* 1. TOP BAR: TITLE & SETTINGS */}
      <div className="p-6 border-b bg-muted/10 flex flex-col xl:flex-row justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            {title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Analyze daily output patterns. Use the controls to adjust the anomaly detection algorithm.
          </p>
        </div>

        {/* TEACHING CONTROLS */}
        <div className="flex flex-col gap-4 p-4 bg-background rounded-lg border shadow-sm w-full xl:w-[320px]">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
                <Settings2 className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider">Algorithm Settings</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Detection Method</label>
                <select
                value={detectionMethod}
                onChange={(e) => setDetectionMethod(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                <option value="windowAverage">Window Average (Dynamic)</option>
                <option value="absolute">Absolute Limit (Static)</option>
                </select>
            </div>

            {/* Dynamic Controls based on method */}
            {detectionMethod === 'windowAverage' && (
                <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Sensitivity</span>
                        <span className="font-mono font-medium text-primary">{thresholdPercent}%</span>
                    </div>
                    <input
                        type="range"
                        min="10"
                        max="90"
                        step="5"
                        value={thresholdPercent}
                        onChange={(e) => setThresholdPercent(Number(e.target.value))}
                        className="w-full cursor-pointer accent-primary h-2 bg-secondary rounded-full appearance-none"
                    />
                    <p className="text-[10px] text-muted-foreground flex gap-1">
                        <Info className="w-3 h-3" /> Flags days {thresholdPercent}% below avg.
                    </p>
                </div>
            )}

            {detectionMethod === 'absolute' && (
                <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Minimum Limit</span>
                        <span className="font-mono font-medium text-primary">{absoluteMin} kWh</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="20"
                        step="1"
                        value={absoluteMin}
                        onChange={(e) => setAbsoluteMin(Number(e.target.value))}
                        className="w-full cursor-pointer accent-primary h-2 bg-secondary rounded-full appearance-none"
                    />
                    <p className="text-[10px] text-muted-foreground flex gap-1">
                        <Info className="w-3 h-3" /> Flags output below {absoluteMin} kWh.
                    </p>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. STATS SUMMARY BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x border-b bg-muted/5">
        <div className="p-4 text-center">
            <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Days</span>
            <span className="text-xl font-bold text-foreground">{stats.totalRecords}</span>
        </div>
        <div className="p-4 text-center">
            <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Window Avg</span>
            <span className="text-xl font-bold text-foreground">{stats.windowAverage} <span className="text-sm font-normal text-muted-foreground">kWh</span></span>
        </div>
        <div className="p-4 text-center">
            <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Range</span>
            <span className="text-lg font-medium text-foreground">{stats.minEnergy} - {stats.maxEnergy} <span className="text-sm font-normal text-muted-foreground">kWh</span></span>
        </div>
        <div className="p-4 text-center bg-primary/5">
            <span className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Anomalies</span>
            <div className="flex items-center justify-center gap-2">
                <span className={`text-xl font-bold ${stats.anomalyCount > 0 ? "text-red-600" : "text-green-600"}`}>
                    {stats.anomalyCount}
                </span>
                <span className="text-xs text-muted-foreground bg-background px-1.5 py-0.5 rounded border">
                    {stats.anomalyRate}
                </span>
            </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT AREA */}
      <div className="p-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b">
            {tabs.map((tab) => (
            <button
                key={tab.value}
                onClick={() => setSelectedTab(tab.value)}
                className={`px-4 py-2.5 text-sm font-medium transition-all relative top-[1px] border-b-2 ${
                    selectedTab === tab.value 
                    ? "border-primary text-primary bg-primary/5 rounded-t-md" 
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-t-md"
                }`}
            >
                {tab.label}
            </button>
            ))}
        </div>

        {/* Cards Grid */}
        {filteredData.length > 0 ? (
            <EnergyProductionCards energyProductionData={filteredData} />
        ) : (
            <div className="py-16 text-center text-muted-foreground bg-muted/10 rounded-xl border border-dashed border-muted-foreground/20">
                <p>No records match the current filter.</p>
                {selectedTab === 'anomaly' && (
                    <button 
                        onClick={() => setSelectedTab('all')}
                        className="mt-2 text-sm text-primary hover:underline"
                    >
                        View all records
                    </button>
                )}
            </div>
        )}
      </div>

    </Card>
  );
};

export default DataCard;

