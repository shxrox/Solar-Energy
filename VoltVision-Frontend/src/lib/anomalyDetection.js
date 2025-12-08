// /**
//  * Anomaly Detection Utility for Solar Panel Energy Generation
//  *
//  * This module provides window-based anomaly detection for solar panel data.
//  * Designed for teaching - simple, practical, and easy to understand!
//  */

// /**
//  * Method 1: WINDOW AVERAGE DETECTION (Primary Method)
//  * Compares each day against the average of the entire window (7 or 30 days)
//  *
//  * Concept: In a given time window (e.g., 7 days), if a day's production
//  * is significantly below the window's average, it's likely an anomaly.
//  *
//  * Good for detecting:
//  * - Equipment failures (sudden drop)
//  * - Shading issues (consistent low production)
//  * - Sensor errors (zero or extremely low values)
//  *
//  * @param {Array} records - Array of energy generation records
//  * @param {Number} thresholdPercent - How far below average to flag (default 40%)
//  * @returns {Array} Records with anomaly flags
//  */
// export function detectWindowAverageAnomalies(records, thresholdPercent = 40) {
//   if (records.length === 0) return records;

//   // Step 1: Calculate the average for the entire window
//   const totalEnergy = records.reduce((sum, record) => sum + record.totalEnergy, 0);
//   const averageEnergy = totalEnergy / records.length;

//   // Step 2: Check each day against the average
//   return records.map((record) => {
//     const energy = record.totalEnergy;

//     // Calculate how far this day is from the average (as a percentage)
//     const deviationPercent = ((averageEnergy - energy) / averageEnergy) * 100;

//     // Flag as anomaly if below threshold
//     const isAnomaly = deviationPercent > thresholdPercent;

//     return {
//       ...record,
//       hasAnomaly: isAnomaly,
//       anomalyType: isAnomaly ? 'BELOW_AVERAGE' : null,
//       anomalyReason: isAnomaly
//         ? `${deviationPercent.toFixed(1)}% below window average (${averageEnergy.toFixed(1)} kWh)`
//         : null,
//       // Include stats for teaching purposes
//       windowAverage: averageEnergy.toFixed(1),
//       deviationPercent: deviationPercent.toFixed(1),
//       deviationAmount: (averageEnergy - energy).toFixed(1)
//     };
//   });
// }

// /**
//  * Method 2: ABSOLUTE THRESHOLD DETECTION (Fallback)
//  * Simple rule-based detection for obvious failures
//  *
//  * Use this to catch extreme cases that should always be flagged
//  * regardless of the window average.
//  *
//  * @param {Array} records - Array of energy generation records
//  * @param {Number} minimumThreshold - Minimum acceptable kWh (default 5)
//  * @returns {Array} Records with anomaly flags
//  */
// export function detectAbsoluteThresholdAnomalies(records, minimumThreshold = 5) {
//   return records.map((record) => {
//     const energy = record.totalEnergy;
//     const isAnomaly = energy < minimumThreshold;

//     return {
//       ...record,
//       hasAnomaly: isAnomaly,
//       anomalyType: isAnomaly ? 'CRITICAL_LOW' : null,
//       anomalyReason: isAnomaly
//         ? `Production only ${energy.toFixed(1)} kWh (minimum: ${minimumThreshold} kWh)`
//         : null
//     };
//   });
// }

// /**
//  * MAIN DETECTION FUNCTION
//  * Easy to switch between different methods for teaching
//  *
//  * @param {Array} records - Array of energy generation records
//  * @param {String} method - Detection method to use
//  * @param {Object} options - Options for the selected method
//  * @returns {Array} Records with anomaly detection results
//  */
// export function detectAnomalies(records, method = 'windowAverage', options = {}) {
//   // Ensure data is sorted by date (ascending)
//   const sortedRecords = [...records].sort((a, b) =>
//     new Date(a._id.date) - new Date(b._id.date)
//   );

//   const {
//     windowThresholdPercent = 40,
//     absoluteThreshold = 5
//   } = options;

//   switch (method) {
//     case 'windowAverage':
//       return detectWindowAverageAnomalies(sortedRecords, windowThresholdPercent);
//     case 'absolute':
//       return detectAbsoluteThresholdAnomalies(sortedRecords, absoluteThreshold);
//     default:
//       return detectWindowAverageAnomalies(sortedRecords, windowThresholdPercent);
//   }
// }

// /**
//  * HELPER: Get anomaly statistics for the dataset
//  * Useful for showing students the detection results and understanding the data
//  *
//  * @param {Array} records - Array of records with anomaly detection results
//  * @returns {Object} Statistics about the dataset and anomalies
//  */
// export function getAnomalyStats(records) {
//   if (records.length === 0) {
//     return {
//       totalRecords: 0,
//       anomalyCount: 0,
//       anomalyRate: '0%',
//       anomalyTypes: [],
//       windowAverage: '0',
//       minEnergy: 0,
//       maxEnergy: 0,
//       energyRange: 0
//     };
//   }

//   const anomalies = records.filter(r => r.hasAnomaly);
//   const energyValues = records.map(r => r.totalEnergy);
//   const totalEnergy = energyValues.reduce((sum, val) => sum + val, 0);
//   const avgEnergy = totalEnergy / records.length;
//   const minEnergy = Math.min(...energyValues);
//   const maxEnergy = Math.max(...energyValues);

//   return {
//     totalRecords: records.length,
//     anomalyCount: anomalies.length,
//     normalCount: records.length - anomalies.length,
//     anomalyRate: ((anomalies.length / records.length) * 100).toFixed(1) + '%',
//     anomalyTypes: [...new Set(anomalies.map(a => a.anomalyType).filter(Boolean))],
//     windowAverage: avgEnergy.toFixed(1),
//     minEnergy: minEnergy.toFixed(1),
//     maxEnergy: maxEnergy.toFixed(1),
//     energyRange: (maxEnergy - minEnergy).toFixed(1),
//     // Additional teaching metrics
//     anomalyDates: anomalies.map(a => a._id?.date || 'Unknown'),
//     normalDates: records.filter(r => !r.hasAnomaly).map(r => r._id?.date || 'Unknown')
//   };
// }
/**
 * Anomaly Detection Utility for Solar Panel Energy Generation
 *
 * This module provides window-based anomaly detection for solar panel data.
 * It powers the "Teaching Mode" in the Dashboard UI.
 */

/**
 * Method 1: WINDOW AVERAGE DETECTION (Primary Method)
 * Compares each day against the average of the entire window.
 *
 * @param {Array} records - Array of energy generation records
 * @param {Number} thresholdPercent - How far below average to flag (default 40%)
 * @returns {Array} Records with anomaly flags and detailed stats
 */
export function detectWindowAverageAnomalies(records, thresholdPercent = 40) {
  if (!records || records.length === 0) return [];

  // Step 1: Calculate the average for the entire window
  const totalEnergy = records.reduce((sum, record) => sum + (record.totalEnergy || 0), 0);
  const averageEnergy = totalEnergy / records.length;

  // Step 2: Check each day against the average
  return records.map((record) => {
    const energy = record.totalEnergy || 0;

    // Calculate deviation (guard against division by zero)
    let deviationPercent = 0;
    if (averageEnergy > 0) {
      deviationPercent = ((averageEnergy - energy) / averageEnergy) * 100;
    }

    // Flag as anomaly if below threshold
    // We only care if it's BELOW average for this specific check
    const isAnomaly = deviationPercent > thresholdPercent;

    return {
      ...record,
      hasAnomaly: isAnomaly,
      anomalyType: isAnomaly ? 'Underperformance' : null,
      anomalyReason: isAnomaly
        ? `${deviationPercent.toFixed(1)}% below average (${averageEnergy.toFixed(1)} kWh)`
        : null,
      // Stats for UI Tooltips
      windowAverage: averageEnergy.toFixed(1),
      deviationPercent: deviationPercent.toFixed(1),
      deviationAmount: (averageEnergy - energy).toFixed(1)
    };
  });
}

/**
 * Method 2: ABSOLUTE THRESHOLD DETECTION (Fallback)
 * Simple rule-based detection for obvious failures.
 *
 * @param {Array} records - Array of energy generation records
 * @param {Number} minimumThreshold - Minimum acceptable kWh (default 5)
 * @returns {Array} Records with anomaly flags
 */
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

/**
 * MAIN DETECTION FUNCTION
 * Switcher that routes data to the selected algorithm.
 *
 * @param {Array} records - Array of energy generation records
 * @param {String} method - Detection method ('windowAverage' | 'absolute')
 * @param {Object} options - Threshold options
 */
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

/**
 * HELPER: Get anomaly statistics for the Blue Summary Box
 *
 * @param {Array} records - Array of records AFTER detection
 * @returns {Object} Stats object for the UI
 */
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