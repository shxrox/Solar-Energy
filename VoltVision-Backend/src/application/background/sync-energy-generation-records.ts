// import { z } from "zod";
// import { EnergyGenerationRecord } from "../../infrastructure/entities/EnergyGenerationRecord";
// import { SolarUnit } from "../../infrastructure/entities/SolarUnit";

// export const DataAPIEnergyGenerationRecordDto = z.object({
//     _id: z.string(),
//     serialNumber: z.string(),
//     energyGenerated: z.number(),
//     timestamp: z.string(),
//     intervalHours: z.number(),
//     __v: z.number(),
// });


// export const syncEnergyGenerationRecords = async () => {
//     try {

//         const solarUnits = await SolarUnit.find();

//         for (const solarUnit of solarUnits) {


//             const lastSyncedRecord = await EnergyGenerationRecord
//                 .findOne({ solarUnitId: solarUnit._id })
//                 .sort({ timestamp: -1 });


          

//             const dataApiBase = process.env.DATA_API_URL || "http://localhost:8001/api";
//             const baseUrl = `${dataApiBase}/energy-generation-records/solar-unit/${solarUnit.serialNumber}`;
//             const url = new URL(baseUrl);
//             if (lastSyncedRecord?.timestamp) {
//                 url.searchParams.append('sinceTimestamp', lastSyncedRecord.timestamp.toISOString());
//             }


//             const dataAPIResponse = await fetch(url.toString());
//             if (!dataAPIResponse.ok) {
//                 throw new Error("Failed to fetch energy generation records from data API");
//             }

//             const newRecords = DataAPIEnergyGenerationRecordDto
//                 .array()
//                 .parse(await dataAPIResponse.json());

//             if (newRecords.length > 0) {

//                 const recordsToInsert = newRecords.map(record => ({
//                     solarUnitId: solarUnit._id,
//                     energyGenerated: record.energyGenerated,
//                     timestamp: new Date(record.timestamp),
//                     intervalHours: record.intervalHours,
//                 }));

//                 await EnergyGenerationRecord.insertMany(recordsToInsert);
//                 console.log(`Synced ${recordsToInsert.length} new energy generation records`);
//             }
//             else {
//                 console.log("No new records to sync");
//             }
//         }
//     } catch (error) {
//         console.error("Sync Job error:", error);
//     }
// };


import { z } from "zod";
import { EnergyGenerationRecord } from "../../infrastructure/entities/EnergyGenerationRecord";
import { SolarUnit } from "../../infrastructure/entities/SolarUnit";
import { Anomaly } from "../../infrastructure/entities/Anomaly";

export const DataAPIEnergyGenerationRecordDto = z.object({
    _id: z.string(),
    serialNumber: z.string(),
    energyGenerated: z.number(),
    timestamp: z.string(),
    intervalHours: z.number(),
    __v: z.number(),
});

type DataAPIRecord = z.infer<typeof DataAPIEnergyGenerationRecordDto>;

const runDetection = async (solarUnit: any, record: any) => {
    const hour = new Date(record.timestamp).getHours();
    const capacity = solarUnit.capacity || 5000;
    let anomalyData = null;

    if (record.energyGenerated === 0 && hour > 8 && hour < 16) {
        anomalyData = {
            type: "Inverter Failure",
            severity: "Critical",
            description: "Zero production during daylight hours."
        };
    } else if (record.energyGenerated > capacity * 1.5) {
        anomalyData = {
            type: "Power Surge",
            severity: "Warning",
            description: `Production (${record.energyGenerated}W) exceeded 150% of capacity.`
        };
    } else if (record.energyGenerated > 0 && record.energyGenerated < capacity * 0.1 && hour === 12) {
        anomalyData = {
            type: "Panel Shading",
            severity: "Info",
            description: "Low production detected at peak solar noon."
        };
    }

    if (anomalyData) {
        try {
            await Anomaly.findOneAndUpdate(
                { solarUnitId: solarUnit._id, type: anomalyData.type, timestamp: record.timestamp },
                { ...anomalyData, status: "OPEN" },
                { upsert: true }
            );
        } catch (e) {
            console.error("Anomaly Detection Error:", e);
        }
    }
};

export const syncEnergyGenerationRecords = async () => {
    try {
        const solarUnits = await SolarUnit.find();
        for (const solarUnit of solarUnits) {
            const lastSyncedRecord = await EnergyGenerationRecord
                .findOne({ solarUnitId: solarUnit._id })
                .sort({ timestamp: -1 });

            const dataApiBase = process.env.DATA_API_URL || "http://localhost:8001/api";
            const baseUrl = `${dataApiBase}/energy-generation-records/solar-unit/${solarUnit.serialNumber}`;
            const url = new URL(baseUrl);
            
            if (lastSyncedRecord?.timestamp) {
                url.searchParams.append('sinceTimestamp', lastSyncedRecord.timestamp.toISOString());
            }

            const dataAPIResponse = await fetch(url.toString());
            const newRecords = DataAPIEnergyGenerationRecordDto.array().parse(await dataAPIResponse.json());

            if (newRecords.length > 0) {
                const recordsToInsert = newRecords.map((record: DataAPIRecord) => ({
                    solarUnitId: solarUnit._id,
                    energyGenerated: record.energyGenerated,
                    timestamp: new Date(record.timestamp),
                    intervalHours: record.intervalHours,
                }));

                await EnergyGenerationRecord.insertMany(recordsToInsert);
                
                for (const record of recordsToInsert) {
                    await runDetection(solarUnit, record);
                }
            }
        }
    } catch (error) {
        console.error("Sync Job error:", error);
    }
};