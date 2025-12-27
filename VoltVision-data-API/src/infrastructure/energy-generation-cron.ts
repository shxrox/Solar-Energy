// import cron from 'node-cron';
// import { EnergyGenerationRecord } from './entities/EnergyGenerationRecord';

// /**
//  * Calculate realistic energy generation based on timestamp
//  * Uses seasonal variations and time-of-day multipliers
//  */
// function calculateEnergyGeneration(timestamp: Date): number {
//   const hour = timestamp.getUTCHours();
//   const month = timestamp.getUTCMonth(); // 0-11

//   // Base energy generation (higher in summer months)
//   let baseEnergy = 200;
//   if (month >= 5 && month <= 7) {
//     // June-August (summer)
//     baseEnergy = 300;
//   } else if (month >= 2 && month <= 4) {
//     // March-May (spring)
//     baseEnergy = 250;
//   } else if (month >= 8 && month <= 10) {
//     // September-November (fall)
//     baseEnergy = 200;
//   } else {
//     // December-February (winter)
//     baseEnergy = 150;
//   }

//   // Adjust based on time of day (solar panels generate more during daylight)
//   let timeMultiplier = 1;
//   if (hour >= 6 && hour <= 18) {
//     // Daylight hours
//     timeMultiplier = 1.2;
//     if (hour >= 10 && hour <= 14) {
//       // Peak sun hours
//       timeMultiplier = 1.5;
//     }
//   } else {
//     // Night hours
//     timeMultiplier = 0;
//   }

//   // Add some random variation (±20%)
//   const variation = 0.8 + Math.random() * 0.4;
//   const energyGenerated = Math.round(baseEnergy * timeMultiplier * variation);

//   return energyGenerated;
// }

// /**
//  * Generate a new energy generation record for the current time
//  */
// async function generateNewRecord() {
//   try {
//     const timestamp = new Date();
//     const serialNumber = process.env.SOLAR_UNIT_SERIAL || 'SU-0001';

//     const energyGenerated = calculateEnergyGeneration(timestamp);

//     const record = {
//       serialNumber,
//       timestamp,
//       energyGenerated,
//       intervalHours: 2,
//     };

//     await EnergyGenerationRecord.create(record);
//     console.log(
//       `[${timestamp.toISOString()}] Generated energy record: ${energyGenerated}Wh for ${serialNumber}`
//     );
//   } catch (error) {
//     console.error(
//       `[${new Date().toISOString()}] Failed to generate energy record:`,
//       error
//     );
//   }
// }

// /**
//  * Initialize the cron scheduler to generate energy records every 2 hours
//  */
// export const initializeEnergyCron = () => {
//   // Run every 2 hours on the hour (0 */2 * * *)
//   const schedule = process.env.ENERGY_CRON_SCHEDULE || '0 */2 * * *';

//   cron.schedule(schedule, async () => {
//     await generateNewRecord();
//   });

//   console.log(
//     `[Energy Cron] Scheduler initialized - Energy generation records will be created at: ${schedule}`
//   );
// };
// import cron from 'node-cron';
// import { EnergyGenerationRecord } from './entities/EnergyGenerationRecord';

// // Reusing the same logic for consistency
// function calculateEnergyGeneration(timestamp: Date): number {
//   const hour = timestamp.getHours();
  
//   // Night time = 0
//   if (hour < 6 || hour > 18) return 0;

//   // Base Curve
//   const radians = ((hour - 6) / 12) * Math.PI;
//   const baseEnergy = 5000 * Math.sin(radians);

//   // ANOMALY ROULETTE (Live Data)
//   const chance = Math.random();
  
//   // 5% Chance of sudden drop (Cloud/Glitch)
//   if (chance < 0.05) return baseEnergy * 0.1;

//   // 1% Chance of spike
//   if (chance > 0.99) return 12000;

//   // Normal + Random Noise
//   return Math.floor(baseEnergy * (0.8 + Math.random() * 0.4));
// }

// async function generateNewRecord() {
//   try {
//     const timestamp = new Date();
//     // Ensure this matches your Admin Dashboard unit
//     const serialNumber = process.env.SOLAR_UNIT_SERIAL || 'SU-0001'; 

//     const energyGenerated = calculateEnergyGeneration(timestamp);

//     await EnergyGenerationRecord.create({
//       serialNumber,
//       timestamp,
//       energyGenerated,
//       intervalHours: 1, // Set to 1 hour for finer grain
//     });

//     console.log(`[Cron] Generated ${energyGenerated}Wh for ${serialNumber}`);
//   } catch (error) {
//     console.error(`[Cron Error]`, error);
//   }
// }

// export const initializeEnergyCron = () => {
//   // Run every 10 seconds for DEMO purposes (so you see live updates)
//   // OR use '0 * * * *' for every hour in production
//   const schedule = '*/10 * * * * *'; 

//   cron.schedule(schedule, async () => {
//     await generateNewRecord();
//   });

//   console.log(`[Energy Cron] Running schedule: ${schedule}`);
// };

import cron from 'node-cron';
import { EnergyGenerationRecord } from './entities/EnergyGenerationRecord';

function calculateEnergyGeneration(timestamp: Date): number {
  const hour = timestamp.getHours();
  
  // Night time = 0
  if (hour < 6 || hour > 18) return 0;

  // Base Curve (Sine wave)
  const radians = ((hour - 6) / 12) * Math.PI;
  const baseEnergy = 5000 * Math.sin(radians);

  const chance = Math.random();
  if (chance < 0.05) return baseEnergy * 0.1; // Cloud drop
  if (chance > 0.99) return 12000;            // Spike

  return Math.floor(baseEnergy * (0.8 + Math.random() * 0.4));
}

// Updated to handle multiple units
async function generateDataForAllUnits() {
  try {
    const timestamp = new Date();
    // List all the units you want to see data for
    const units = ['SU-0001', 'SU-0002', 'SU-0003']; 

    for (const serialNumber of units) {
      const energyGenerated = calculateEnergyGeneration(timestamp);

      await EnergyGenerationRecord.create({
        serialNumber,
        timestamp,
        energyGenerated,
        intervalHours: 1,
      });

      console.log(`[Cron] Generated ${energyGenerated}Wh for ${serialNumber}`);
    }
  } catch (error) {
    console.error(`[Cron Error]`, error);
  }
}

export const initializeEnergyCron = () => {
  const schedule = '*/10 * * * * *'; 

  cron.schedule(schedule, async () => {
    // Calling the new plural function
    await generateDataForAllUnits();
  });

  console.log(`[Energy Cron] Running schedule for all units: ${schedule}`);
};