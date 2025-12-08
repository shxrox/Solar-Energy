import { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { User } from "../../../infrastructure/entities/User";
import { SolarUnit } from "../../../infrastructure/entities/SolarUnit";
import { EnergyGenerationRecord } from "../../../infrastructure/entities/EnergyGenerationRecord";
import { NotFoundError } from "../../../domain/errors/errors";
import { z } from "zod";

export const DataAPIEnergyGenerationRecordDto = z.object({
  _id: z.string(),
  serialNumber: z.string(),
  energyGenerated: z.number(),
  timestamp: z.string(),
  intervalHours: z.number(),
  __v: z.number(),
});

export const syncMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = getAuth(req);
   
    if (!auth.userId) return next();

    const user = await User.findOne({ clerkUserId: auth.userId });
    if (!user) return next();
    
    const solarUnit = await SolarUnit.findOne({ userId: user._id });
    if (!solarUnit) return next();


    try {
        const dataAPIResponse = await fetch(
            `http://localhost:8001/api/energy-generation-records/solar-unit/${solarUnit.serialNumber}`
        );

      
        if (!dataAPIResponse.ok) {
            console.warn(`Sync failed: Data API returned ${dataAPIResponse.status}`);
            return next(); 
        }

        const latestEnergyGenerationRecords = DataAPIEnergyGenerationRecordDto
            .array()
            .parse(await dataAPIResponse.json());

        const lastSyncedRecord = await EnergyGenerationRecord
            .findOne({ solarUnitId: solarUnit._id })
            .sort({ timestamp: -1 });

        const newRecords = latestEnergyGenerationRecords.filter(apiRecord => {
            if (!lastSyncedRecord) return true;
            return new Date(apiRecord.timestamp) > lastSyncedRecord.timestamp;
        });

        if (newRecords.length > 0) {
            const recordsToInsert = newRecords.map(record => ({
                solarUnitId: solarUnit._id,
                energyGenerated: record.energyGenerated,
                timestamp: new Date(record.timestamp),
                intervalHours: record.intervalHours,
            }));

            await EnergyGenerationRecord.insertMany(recordsToInsert);
            console.log(`Synced ${recordsToInsert.length} new records`);
        }
    } catch (fetchError) {
       
        console.error("Sync skipped: Could not connect to Data API", fetchError);
    }
   

    next();
  } catch (error) {
    console.error("Sync middleware internal error:", error);
    next(error);
  }
};