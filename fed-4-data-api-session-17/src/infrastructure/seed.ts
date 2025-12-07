// import mongoose from "mongoose";
// import { EnergyGenerationRecord } from "./entities/EnergyGenerationRecord";
// import dotenv from "dotenv";
// import { connectDB } from "./db";

// dotenv.config();

// async function seed() {

//   const serialNumber = "SU-0001";

//   try {
//     // Connect to DB
//     await connectDB();

//     // Clear existing data
//     await EnergyGenerationRecord.deleteMany({});

//     // Create historical energy generation records from Aug 1, 2025 8pm to Oct 12, 2025 8am every 2 hours
//     const records = [];
//     const startDate = new Date("2025-08-01T08:00:00Z"); // August 1, 2025 8pm UTC
//     const endDate = new Date("2025-11-23T08:00:00Z"); // November 23, 2025 8am UTC

//     let currentDate = new Date(startDate);
//     let recordCount = 0;

//     while (currentDate <= endDate) {
//       // Generate realistic energy values based on time of day and season
//       const hour = currentDate.getUTCHours();
//       const month = currentDate.getUTCMonth(); // 0-11

//       // Base energy generation (higher in summer months)
//       let baseEnergy = 200;
//       if (month >= 5 && month <= 7) {
//         // June-August (summer)
//         baseEnergy = 300;
//       } else if (month >= 2 && month <= 4) {
//         // March-May (spring)
//         baseEnergy = 250;
//       } else if (month >= 8 && month <= 10) {
//         // September-November (fall)
//         baseEnergy = 200;
//       } else {
//         // December-February (winter)
//         baseEnergy = 150;
//       }

//       // Adjust based on time of day (solar panels generate more during daylight)
//       let timeMultiplier = 1;
//       if (hour >= 6 && hour <= 18) {
//         // Daylight hours
//         timeMultiplier = 1.2;
//         if (hour >= 10 && hour <= 14) {
//           // Peak sun hours
//           timeMultiplier = 1.5;
//         }
//       } else {
//         // Night hours
//         timeMultiplier = 0; // Minimal generation at night
//       }

//       // Add some random variation (±20%)
//       const variation = 0.8 + Math.random() * 0.4;
//       const energyGenerated = Math.round(
//         baseEnergy * timeMultiplier * variation
//       );

//       records.push({
//         serialNumber: serialNumber,
//         timestamp: new Date(currentDate),
//         energyGenerated: energyGenerated,
//       });

//       // Move to next 2-hour interval
//       currentDate = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);
//       recordCount++;
//     }
//     await EnergyGenerationRecord.insertMany(records);

//     console.log(
//       `Database seeded successfully. Generated ${recordCount} energy generation records from ${startDate.toUTCString()} to ${endDate.toUTCString()}.`
//     );
//   } catch (err) {
//     console.error("Seeding error:", err);
//   } finally {
//     await mongoose.disconnect();
//   }
// }

// seed();
// import mongoose from "mongoose";
// import { EnergyGenerationRecord } from "./entities/EnergyGenerationRecord";
// import dotenv from "dotenv";
// import { connectDB } from "./db";

// dotenv.config();

// async function seed() {

//   const serialNumber = "SU-0001";

//   try {
//     // Connect to DB
//     await connectDB();

//     // Clear existing data
//     await EnergyGenerationRecord.deleteMany({});

//     // Create historical energy generation records from Aug 1, 2025 8pm to Oct 12, 2025 8am every 2 hours
//     const records = [];
//     const startDate = new Date("2025-08-01T08:00:00Z"); // August 1, 2025 8pm UTC
//     const endDate = new Date("2025-11-23T08:00:00Z"); // November 23, 2025 8am UTC

//     let currentDate = new Date(startDate);
//     let recordCount = 0;

//     while (currentDate <= endDate) {
//       // Generate realistic energy values based on time of day and season
//       const hour = currentDate.getUTCHours();
//       const month = currentDate.getUTCMonth(); // 0-11

//       // Base energy generation (higher in summer months)
//       let baseEnergy = 200;
//       if (month >= 5 && month <= 7) {
//         // June-August (summer)
//         baseEnergy = 300;
//       } else if (month >= 2 && month <= 4) {
//         // March-May (spring)
//         baseEnergy = 250;
//       } else if (month >= 8 && month <= 10) {
//         // September-November (fall)
//         baseEnergy = 200;
//       } else {
//         // December-February (winter)
//         baseEnergy = 150;
//       }

//       // Adjust based on time of day (solar panels generate more during daylight)
//       let timeMultiplier = 1;
//       if (hour >= 6 && hour <= 18) {
//         // Daylight hours
//         timeMultiplier = 1.2;
//         if (hour >= 10 && hour <= 14) {
//           // Peak sun hours
//           timeMultiplier = 1.5;
//         }
//       } else {
//         // Night hours
//         timeMultiplier = 0; // Minimal generation at night
//       }

//       // Add some random variation (±20%)
//       const variation = 0.8 + Math.random() * 0.4;
//       const energyGenerated = Math.round(
//         baseEnergy * timeMultiplier * variation
//       );

//       records.push({
//         serialNumber: serialNumber,
//         timestamp: new Date(currentDate),
//         energyGenerated: energyGenerated,
//       });

//       // Move to next 2-hour interval
//       currentDate = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);
//       recordCount++;
//     }
//     await EnergyGenerationRecord.insertMany(records);

//     console.log(
//       `Database seeded successfully. Generated ${recordCount} energy generation records from ${startDate.toUTCString()} to ${endDate.toUTCString()}.`
//     );
//   } catch (err) {
//     console.error("Seeding error:", err);
//   } finally {
//     await mongoose.disconnect();
//   }
// }

// seed();




import mongoose from "mongoose";
import { EnergyGenerationRecord } from "../infrastructure/entities/EnergyGenerationRecord";
import dotenv from "dotenv";
import { connectDB } from "../infrastructure/db";

dotenv.config();

// CONFIGURATION: Define all the units you want to generate data for
const TARGET_UNITS = [
  "SU-0001", "SU-0002", "SU-0003", "SU-0004", "SU-0005",
  "SU-0006", "SU-0007", "SU-0008", "SU-0009", "SU-0010"
];
const DAYS_TO_GENERATE = 30;

// HELPER: Generate realistic solar curve
// Added 'peakCapacity' param so different units produce different amounts
function getNormalSolarOutput(hour: number, month: number, peakCapacity: number): number {
  // Simple solar curve: Peak at 12:00, Zero at night (6pm - 6am)
  if (hour < 6 || hour > 18) return 0;

  // Seasonal Boost (Month 3-8 is Summer-ish)
  let seasonalCapacity = peakCapacity;
  if (month >= 3 && month <= 8) seasonalCapacity = peakCapacity * 1.2;

  // Bell curve logic using Sine wave
  const radians = ((hour - 6) / 12) * Math.PI;
  const efficiency = Math.sin(radians); 

  // Add random weather fluctuation (±10%)
  const weatherNoise = 0.9 + Math.random() * 0.2; 
  
  return Math.floor(seasonalCapacity * efficiency * weatherNoise);
}

async function seed() {
  try {
    console.log("🌱 Starting Multi-Unit Seed Process...");
    await connectDB();

    // Loop through every serial number in our list
    for (const serialNumber of TARGET_UNITS) {
        console.log(`\n⚡ Processing Unit: ${serialNumber}...`);

        // 1. Clear old data for THIS unit only
        await EnergyGenerationRecord.deleteMany({ serialNumber: serialNumber });

        const records = [];
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - DAYS_TO_GENERATE);

        let currentDate = new Date(startDate);
        let totalAnomalies = 0;

        // Randomize system size slightly (between 4000W and 7000W)
        // This makes every user's graph look unique
        const unitCapacity = 4000 + Math.floor(Math.random() * 3000);

        // 2. Generate History
        while (currentDate <= endDate) {
            const hour = currentDate.getHours();
            const month = currentDate.getMonth();

            let energy = getNormalSolarOutput(hour, month, unitCapacity);
            let isAnomaly = false;

            // --- INJECT ANOMALIES (Only during daylight) ---
            if (hour > 8 && hour < 16) {
                const chance = Math.random();

                // 1% Chance: SYSTEM FAILURE (Zero output)
                if (chance < 0.01) {
                    energy = 0;
                    isAnomaly = true;
                }
                // 1% Chance: POWER SURGE (Impossible value)
                else if (chance > 0.01 && chance < 0.02) {
                    energy = unitCapacity * 3; // Huge spike
                    isAnomaly = true;
                }
                // 3% Chance: DUST/DEBRIS (Very low efficiency)
                else if (chance > 0.02 && chance < 0.05) {
                    energy = energy * 0.2; 
                    isAnomaly = true;
                }
            }

            records.push({
                serialNumber: serialNumber,
                timestamp: new Date(currentDate),
                energyGenerated: energy,
                intervalHours: 1, // Hourly data
            });

            if (isAnomaly) totalAnomalies++;

            // Move forward 1 hour
            currentDate.setHours(currentDate.getHours() + 1);
        }

        // 3. Bulk Insert
        await EnergyGenerationRecord.insertMany(records);
        console.log(`   ✅ Saved ${records.length} records (Anomalies: ${totalAnomalies})`);
    }

    console.log("\n-----------------------------------");
    console.log(`🎉 All ${TARGET_UNITS.length} units seeded successfully!`);
    console.log("-----------------------------------");

  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seed();