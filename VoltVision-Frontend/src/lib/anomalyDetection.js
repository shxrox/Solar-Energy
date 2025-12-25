
export function detectWindowAverageAnomalies(records, thresholdPercent = 40) {
  if (!records || records.length === 0) return [];


  const totalEnergy = records.reduce((sum, record) => sum + (record.totalEnergy || 0), 0);
  const averageEnergy = totalEnergy / records.length;

  return records.map((record) => {
    const energy = record.totalEnergy || 0;


    let deviationPercent = 0;
    if (averageEnergy > 0) {
      deviationPercent = ((averageEnergy - energy) / averageEnergy) * 100;
    }

   
    const isAnomaly = deviationPercent > thresholdPercent;

    return {
      ...record,
      hasAnomaly: isAnomaly,
      anomalyType: isAnomaly ? 'Underperformance' : null,
      anomalyReason: isAnomaly
        ? `${deviationPercent.toFixed(1)}% below average (${averageEnergy.toFixed(1)} kWh)`
        : null,
 
      windowAverage: averageEnergy.toFixed(1),
      deviationPercent: deviationPercent.toFixed(1),
      deviationAmount: (averageEnergy - energy).toFixed(1)
    };
  });
}


export function detectAbsoluteThresholdAnomalies(records, minimumThreshold = 5) {
  if (!records || records.length === 0) return [];

  return records.map((record) => {
    const energy = record.totalEnergy || 0;
    const isAnomaly = energy < minimumThreshold;

    return {
      ...record,
      hasAnomaly: isAnomaly,
      anomalyType: isAnomaly ? 'System Failure' : null,
      anomalyReason: isAnomaly
        ? `Output ${energy.toFixed(1)} kWh (Min: ${minimumThreshold} kWh)`
        : null
    };
  });
}
export function detectAnomalies(records, method = 'windowAverage', options = {}) {
  if (!records) return [];

  // Sort data by date to ensure the chart looks correct (Left to Right)
  const sortedRecords = [...records].sort((a, b) => {
    const dateA = new Date(a.timestamp || a._id || 0);
    const dateB = new Date(b.timestamp || b._id || 0);
    return dateA - dateB;
  });

  const {
    windowThresholdPercent = 40,
    absoluteThreshold = 5
  } = options;

  switch (method) {
    case 'windowAverage':
      return detectWindowAverageAnomalies(sortedRecords, windowThresholdPercent);
    case 'absolute':
      return detectAbsoluteThresholdAnomalies(sortedRecords, absoluteThreshold);
    default:
      return detectWindowAverageAnomalies(sortedRecords, windowThresholdPercent);
  }
}


export function getAnomalyStats(records) {
  if (!records || records.length === 0) {
    return {
      totalRecords: 0,
      anomalyCount: 0,
      anomalyRate: '0%',
      windowAverage: '0',
      minEnergy: 0,
      maxEnergy: 0,
      energyRange: 0
    };
  }

  // Calculate Aggregates
  const anomalies = records.filter(r => r.hasAnomaly);
  const energyValues = records.map(r => r.totalEnergy || 0);
  
  const totalEnergy = energyValues.reduce((sum, val) => sum + val, 0);
  const avgEnergy = totalEnergy / records.length;
  const minEnergy = Math.min(...energyValues);
  const maxEnergy = Math.max(...energyValues);

  return {
    totalRecords: records.length,
    anomalyCount: anomalies.length,
    normalCount: records.length - anomalies.length,
    anomalyRate: ((anomalies.length / records.length) * 100).toFixed(0) + '%',
    
    // Stats for display
    windowAverage: avgEnergy.toFixed(1),
    minEnergy: minEnergy.toFixed(1),
    maxEnergy: maxEnergy.toFixed(1),
    energyRange: (maxEnergy - minEnergy).toFixed(1)
  };
}