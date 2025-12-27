import { Anomaly } from "../../infrastructure/entities/Anomaly";

// Define thresholds
const ZERO_PRODUCTION_THRESHOLD = 0.1; // kWh

export const detectAnomalies = async (records: any[], solarUnitId: string) => {
  console.log(`🔍 Running Anomaly Detection for Unit: ${solarUnitId}...`);
  
  const anomaliesToCreate: any[] = [];

  // Sort records by time to analyze trends
  const sortedRecords = records.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  for (const record of sortedRecords) {
    const hour = new Date(record.timestamp).getHours();
    
    // RULE 1: Zero Production during Peak Sun Hours (10 AM - 2 PM)
    if (hour >= 10 && hour <= 14) {
      if (record.energyKwh <= ZERO_PRODUCTION_THRESHOLD) {
        anomaliesToCreate.push({
          solarUnit: solarUnitId,
          type: "Zero Production",
          severity: "Critical",
          description: `System produced near-zero energy (${record.energyKwh} kWh) during peak sunlight hours (${hour}:00).`,
          status: "OPEN",
          detectedAt: new Date(),
          affectedRecordId: record._id
        });
      }
    }

    // RULE 2: Impossible Output (Spike)
    // Example: If output > 100kWh in one hour (impossible for a standard home unit)
    if (record.energyKwh > 100) { 
         anomaliesToCreate.push({
          solarUnit: solarUnitId,
          type: "Data Spike",
          severity: "Warning",
          description: `Abnormal energy spike detected: ${record.energyKwh} kWh. Possible sensor error.`,
          status: "OPEN",
          detectedAt: new Date(),
          affectedRecordId: record._id
        });
    }
  }

  // Save unique anomalies to DB
  if (anomaliesToCreate.length > 0) {
    console.log(`⚠️ Detected ${anomaliesToCreate.length} anomalies! Saving...`);
    await Anomaly.insertMany(anomaliesToCreate);
  } else {
    console.log("✅ No anomalies detected.");
  }
};