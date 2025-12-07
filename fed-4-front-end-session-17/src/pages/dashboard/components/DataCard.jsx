import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format, toDate } from "date-fns";
import { useGetEnergyGenerationRecordsBySolarUnitQuery } from "@/lib/redux/query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { detectAnomalies, getAnomalyStats } from "@/lib/anomalyDetection";
import EnergyProductionCards from "./EnergyProductionCards";
import EnergyTab from "./EnergyTab";

const DataCard = ({ title = "Solar Energy Production", solarUnitId }) => {
  // TEACHING NOTE: Change this to switch between different detection methods
  // Options: 'windowAverage', 'absolute', 'combined'
  const [detectionMethod, setDetectionMethod] = useState('windowAverage');

  // TEACHING NOTE: Adjust these thresholds to demonstrate different sensitivity levels
  const [thresholdPercent, setThresholdPercent] = useState(40); // % below average to flag
  const [absoluteMin, setAbsoluteMin] = useState(5); // Minimum acceptable kWh

  const tabs = [
    { label: "All", value: "all" },
    { label: "Anomaly", value: "anomaly" },
  ];

  const selectedTab = useSelector((state) => state.ui.selectedDashboardTab);

  const { data, isLoading, isError, error } =
    useGetEnergyGenerationRecordsBySolarUnitQuery({
      id: solarUnitId,
      groupBy: "date",
      limit: 7,
    });


  if (isLoading) {
    return (
      <Card className="rounded-md p-4">
        <Skeleton className="h-6 w-64 mb-4" />
        <div className="grid grid-cols-7 gap-4 mt-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="col-span-1 px-2 py-1">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!data || isError) {
    return null;
  }

  // Get last 7 days of data
  const last7Days = data

  // Apply anomaly detection with options
  const dataWithAnomalies = detectAnomalies(last7Days, detectionMethod, {
    windowThresholdPercent: thresholdPercent,
    absoluteThreshold: absoluteMin
  });

  // Transform to UI format
  const energyProductionData = dataWithAnomalies.map((el) => {
    return {
      day: format(toDate(el._id.date), "EEE"),
      date: format(toDate(el._id.date), "MMM d"),
      production: el.totalEnergy,
      hasAnomaly: el.hasAnomaly,
      anomalyType: el.anomalyType,
      anomalyReason: el.anomalyReason,
    };
  });

  // Filter based on selected tab
  const filteredData = energyProductionData.filter((el) => {
    if (selectedTab === "all") {
      return true;
    } else if (selectedTab === "anomaly") {
      return el.hasAnomaly;
    }
  });

  // TEACHING NOTE: Log anomaly statistics to console for students to see
  const stats = getAnomalyStats(dataWithAnomalies);
  console.log('Anomaly Detection Stats:', stats);
  console.log('Detection Method:', detectionMethod);
  console.log('Data with Anomalies:', dataWithAnomalies);

  return (
    <Card className="rounded-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {title}
          </h2>
          <p className="text-gray-600">Daily energy output for the past 7 days</p>
        </div>

        {/* Detection Method Selector - for teaching demonstrations */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium">Detection Method:</label>
            <select
              value={detectionMethod}
              onChange={(e) => setDetectionMethod(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="windowAverage">Window Average (7-day)</option>
              <option value="absolute">Absolute Threshold</option>
            </select>
          </div>

          {/* Threshold Controls for Teaching */}
          {detectionMethod === 'windowAverage' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-medium">
                Threshold: {thresholdPercent}% below average
              </label>
              <input
                type="range"
                min="20"
                max="60"
                value={thresholdPercent}
                onChange={(e) => setThresholdPercent(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}

          {/* Absolute Minimum Threshold Control */}
          {detectionMethod === 'absolute' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-medium">
                Minimum: {absoluteMin} kWh
              </label>
              <input
                type="range"
                min="1"
                max="15"
                value={absoluteMin}
                onChange={(e) => setAbsoluteMin(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Anomaly Statistics - shows detection results */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Window Average:</span> {stats.windowAverage} kWh
              {' | '}
              <span className="font-semibold">Range:</span> {stats.minEnergy} - {stats.maxEnergy} kWh
            </p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Anomalies:</span>{' '}
              <span className={stats.anomalyCount > 0 ? 'text-red-600 font-bold' : 'text-green-600'}>
                {stats.anomalyCount}
              </span>
              {' '}out of {stats.totalRecords} days ({stats.anomalyRate})
            </p>
          </div>
        </div>
      </div>

      {/* Tab Filters */}
      <div className="mb-4 flex items-center gap-x-4">
        {tabs.map((tab) => {
          return <EnergyTab key={tab.value} tab={tab} />;
        })}
      </div>

      {/* Energy Production Cards with Anomaly Detection */}
      <EnergyProductionCards energyProductionData={filteredData} />
    </Card>
  );
};

export default DataCard;
