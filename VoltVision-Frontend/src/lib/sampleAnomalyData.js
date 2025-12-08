/**
 * Sample Data Scenarios for Teaching Anomaly Detection
 *
 * Use these datasets to demonstrate different types of anomalies
 * and test different detection methods with your students.
 */

/**
 * Scenario 1: PANEL FAILURE
 * A solar panel suddenly stops working on day 4
 */
export const panelFailureScenario = [
  { _id: { date: '2024-01-01' }, totalEnergy: 35.2 },
  { _id: { date: '2024-01-02' }, totalEnergy: 34.8 },
  { _id: { date: '2024-01-03' }, totalEnergy: 36.1 },
  { _id: { date: '2024-01-04' }, totalEnergy: 0.0 },    // ← FAILURE
  { _id: { date: '2024-01-05' }, totalEnergy: 0.0 },
  { _id: { date: '2024-01-06' }, totalEnergy: 0.0 },
  { _id: { date: '2024-01-07' }, totalEnergy: 0.0 },
];

/**
 * Scenario 2: GRADUAL DEGRADATION
 * Panel performance slowly declining over time (aging, dirt accumulation)
 */
export const gradualDegradationScenario = [
  { _id: { date: '2024-01-01' }, totalEnergy: 40.0 },
  { _id: { date: '2024-01-02' }, totalEnergy: 38.5 },
  { _id: { date: '2024-01-03' }, totalEnergy: 37.2 },
  { _id: { date: '2024-01-04' }, totalEnergy: 35.8 },
  { _id: { date: '2024-01-05' }, totalEnergy: 34.1 },
  { _id: { date: '2024-01-06' }, totalEnergy: 32.5 },
  { _id: { date: '2024-01-07' }, totalEnergy: 31.0 },   // ← DEGRADED
];

/**
 * Scenario 3: SENSOR ERROR (Spike)
 * Sensor malfunction causing unrealistic reading
 */
export const sensorErrorScenario = [
  { _id: { date: '2024-01-01' }, totalEnergy: 33.5 },
  { _id: { date: '2024-01-02' }, totalEnergy: 34.2 },
  { _id: { date: '2024-01-03' }, totalEnergy: 999.9 },  // ← SENSOR ERROR
  { _id: { date: '2024-01-04' }, totalEnergy: 32.8 },
  { _id: { date: '2024-01-05' }, totalEnergy: 33.1 },
  { _id: { date: '2024-01-06' }, totalEnergy: 34.0 },
  { _id: { date: '2024-01-07' }, totalEnergy: 33.7 },
];

/**
 * Scenario 4: WEATHER VARIATION (Normal)
 * Cloudy/rainy days - not anomalies, just natural variation
 */
export const weatherVariationScenario = [
  { _id: { date: '2024-01-01' }, totalEnergy: 38.0 },  // Sunny
  { _id: { date: '2024-01-02' }, totalEnergy: 22.5 },  // Cloudy
  { _id: { date: '2024-01-03' }, totalEnergy: 15.3 },  // Rainy
  { _id: { date: '2024-01-04' }, totalEnergy: 25.8 },  // Partly cloudy
  { _id: { date: '2024-01-05' }, totalEnergy: 37.2 },  // Sunny
  { _id: { date: '2024-01-06' }, totalEnergy: 18.9 },  // Cloudy
  { _id: { date: '2024-01-07' }, totalEnergy: 36.5 },  // Sunny
];

/**
 * Scenario 5: NEW SHADING
 * Tree growth or new construction creates permanent shading
 */
export const newShadingScenario = [
  { _id: { date: '2024-01-01' }, totalEnergy: 40.0 },
  { _id: { date: '2024-01-02' }, totalEnergy: 39.5 },
  { _id: { date: '2024-01-03' }, totalEnergy: 38.8 },
  { _id: { date: '2024-01-04' }, totalEnergy: 25.0 },  // ← New obstruction
  { _id: { date: '2024-01-05' }, totalEnergy: 24.5 },
  { _id: { date: '2024-01-06' }, totalEnergy: 25.2 },
  { _id: { date: '2024-01-07' }, totalEnergy: 24.8 },
];

/**
 * Scenario 6: INTERMITTENT FAILURE
 * Connection issues causing sporadic failures
 */
export const intermittentFailureScenario = [
  { _id: { date: '2024-01-01' }, totalEnergy: 35.0 },
  { _id: { date: '2024-01-02' }, totalEnergy: 0.0 },   // ← Failed
  { _id: { date: '2024-01-03' }, totalEnergy: 34.5 },
  { _id: { date: '2024-01-04' }, totalEnergy: 0.0 },   // ← Failed
  { _id: { date: '2024-01-05' }, totalEnergy: 35.2 },
  { _id: { date: '2024-01-06' }, totalEnergy: 34.8 },
  { _id: { date: '2024-01-07' }, totalEnergy: 0.0 },   // ← Failed
];

/**
 * Scenario 7: PANEL CLEANING
 * Sudden increase after maintenance (not an anomaly)
 */
export const panelCleaningScenario = [
  { _id: { date: '2024-01-01' }, totalEnergy: 28.0 },  // Dirty
  { _id: { date: '2024-01-02' }, totalEnergy: 27.5 },  // Dirty
  { _id: { date: '2024-01-03' }, totalEnergy: 26.8 },  // Dirty
  { _id: { date: '2024-01-04' }, totalEnergy: 38.5 },  // ← CLEANED
  { _id: { date: '2024-01-05' }, totalEnergy: 38.2 },  // Clean
  { _id: { date: '2024-01-06' }, totalEnergy: 37.9 },  // Clean
  { _id: { date: '2024-01-07' }, totalEnergy: 38.1 },  // Clean
];

/**
 * Scenario 8: OUTLIER (Single Bad Day)
 * One unusual day, but panels recover
 */
export const outlierScenario = [
  { _id: { date: '2024-01-01' }, totalEnergy: 35.0 },
  { _id: { date: '2024-01-02' }, totalEnergy: 34.5 },
  { _id: { date: '2024-01-03' }, totalEnergy: 36.0 },
  { _id: { date: '2024-01-04' }, totalEnergy: 8.5 },   // ← OUTLIER
  { _id: { date: '2024-01-05' }, totalEnergy: 35.5 },
  { _id: { date: '2024-01-06' }, totalEnergy: 34.8 },
  { _id: { date: '2024-01-07' }, totalEnergy: 35.2 },
];

/**
 * Scenario 9: NORMAL OPERATION
 * Healthy panel with minor natural variations
 */
export const normalOperationScenario = [
  { _id: { date: '2024-01-01' }, totalEnergy: 35.2 },
  { _id: { date: '2024-01-02' }, totalEnergy: 34.8 },
  { _id: { date: '2024-01-03' }, totalEnergy: 36.1 },
  { _id: { date: '2024-01-04' }, totalEnergy: 35.5 },
  { _id: { date: '2024-01-05' }, totalEnergy: 34.9 },
  { _id: { date: '2024-01-06' }, totalEnergy: 35.7 },
  { _id: { date: '2024-01-07' }, totalEnergy: 35.3 },
];

/**
 * Scenario 10: SEASONAL PATTERN
 * Winter to summer transition (14 days)
 */
export const seasonalPatternScenario = [
  { _id: { date: '2024-01-01' }, totalEnergy: 20.0 },  // Winter
  { _id: { date: '2024-01-08' }, totalEnergy: 22.5 },
  { _id: { date: '2024-01-15' }, totalEnergy: 25.0 },
  { _id: { date: '2024-01-22' }, totalEnergy: 27.5 },
  { _id: { date: '2024-01-29' }, totalEnergy: 30.0 },
  { _id: { date: '2024-02-05' }, totalEnergy: 32.5 },
  { _id: { date: '2024-02-12' }, totalEnergy: 35.0 },  // Spring
];

/**
 * Helper function to test all scenarios with a detection method
 */
export function testAllScenarios(detectionFunction) {
  const scenarios = {
    'Panel Failure': panelFailureScenario,
    'Gradual Degradation': gradualDegradationScenario,
    'Sensor Error': sensorErrorScenario,
    'Weather Variation': weatherVariationScenario,
    'New Shading': newShadingScenario,
    'Intermittent Failure': intermittentFailureScenario,
    'Panel Cleaning': panelCleaningScenario,
    'Outlier': outlierScenario,
    'Normal Operation': normalOperationScenario,
  };

  const results = {};

  Object.entries(scenarios).forEach(([name, data]) => {
    const detected = detectionFunction(data);
    const anomalyCount = detected.filter(d => d.hasAnomaly).length;
    results[name] = {
      total: data.length,
      anomalies: anomalyCount,
      rate: `${((anomalyCount / data.length) * 100).toFixed(0)}%`,
      data: detected
    };
  });

  return results;
}

/**
 * Expected results for each scenario (teaching reference)
 */
export const expectedAnomalies = {
  'Panel Failure': {
    threshold: 4,      // Days 4-7 (zero production)
    statistical: 4,    // Days 4-7 (far from mean)
    dayOverDay: 1,     // Day 4 (sudden drop from day 3)
    iqr: 4,           // Days 4-7 (outside bounds)
  },
  'Gradual Degradation': {
    threshold: 0,      // No single day below threshold
    statistical: 1,    // Maybe day 7 (if using strict z-score)
    dayOverDay: 0,     // Gradual change, not sudden
    iqr: 1,           // Possibly day 7
  },
  'Sensor Error': {
    threshold: 0,      // High value doesn't trigger low threshold
    statistical: 1,    // Day 3 (huge outlier)
    dayOverDay: 2,     // Days 3 and 4 (huge changes)
    iqr: 1,           // Day 3 (outside upper bound)
  },
  'Weather Variation': {
    threshold: 0,      // Natural variation, above minimum
    statistical: 1-2,  // Possibly rainy days
    dayOverDay: 2-3,   // Sudden weather changes
    iqr: 1-2,         // Rainy days might be outliers
  },
  'Normal Operation': {
    threshold: 0,
    statistical: 0,
    dayOverDay: 0,
    iqr: 0,
  }
};

/**
 * Classroom Activity: Blind Test
 * Show students data without labels, have them identify scenario type
 */
export const blindTestScenarios = [
  { id: 'A', data: normalOperationScenario, answer: 'Normal Operation' },
  { id: 'B', data: panelFailureScenario, answer: 'Panel Failure' },
  { id: 'C', data: sensorErrorScenario, answer: 'Sensor Error' },
  { id: 'D', data: weatherVariationScenario, answer: 'Weather Variation' },
  { id: 'E', data: outlierScenario, answer: 'Single Outlier' },
];

/**
 * How to use in your component:
 *
 * import { panelFailureScenario } from '@/lib/sampleAnomalyData';
 * import { detectAnomalies } from '@/lib/anomalyDetection';
 *
 * const results = detectAnomalies(panelFailureScenario, 'threshold');
 * console.log(results);
 */
