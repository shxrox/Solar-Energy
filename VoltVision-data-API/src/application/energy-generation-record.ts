import { NextFunction, Request, Response } from "express";
import { EnergyGenerationRecord } from "../infrastructure/entities/EnergyGenerationRecord";

export const getAllEnergyGenerationRecordsBySerialNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { serialNumber } = req.params;
    const { sinceTimestamp } = req.query;

    const filter: {serialNumber: string, timestamp?: { $gt: Date }} = { serialNumber };
    if (sinceTimestamp && typeof sinceTimestamp === "string") {
      filter.timestamp = { $gt: new Date(sinceTimestamp) };
    }

    const energyGenerationRecords = await EnergyGenerationRecord.find(filter).sort({ timestamp: 1 });
    res.status(200).json(energyGenerationRecords);
  } catch (error) {
    next(error);
  }
};
