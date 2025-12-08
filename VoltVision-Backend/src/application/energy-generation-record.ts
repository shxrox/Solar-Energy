import { GetAllEnergyGenerationRecordsQueryDto } from "../domain/dtos/solar-unit";
import { ValidationError } from "../domain/errors/errors";
import { EnergyGenerationRecord } from "../infrastructure/entities/EnergyGenerationRecord";
import { NextFunction, Request, Response } from "express";

export const getAllEnergyGenerationRecordsBySolarUnitId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const results = GetAllEnergyGenerationRecordsQueryDto.safeParse(req.query);
    if (!results.success) {
      throw new ValidationError(results.error.message);
    }

    const { groupBy, limit } = results.data;

    if (!groupBy) {
      const energyGenerationRecords = await EnergyGenerationRecord.find({
        solarUnitId: id,
      }).sort({ timestamp: -1 });
      res.status(200).json(energyGenerationRecords);
    }

    if (groupBy === "date") {
      if (!limit) {
        const energyGenerationRecords = await EnergyGenerationRecord.aggregate([
          {
            $group: {
              _id: {
                date: {
                  $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
                },
              },
              totalEnergy: { $sum: "$energyGenerated" },
            },
          },
          {
            $sort: { "_id.date": -1 },
          },
        ]);

        res.status(200).json(energyGenerationRecords);
      }

      const energyGenerationRecords = await EnergyGenerationRecord.aggregate([
        {
          $group: {
            _id: {
              date: {
                $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
              },
            },
            totalEnergy: { $sum: "$energyGenerated" },
          },
        },
        {
          $sort: { "_id.date": -1 },
        },
      ]);

      res.status(200).json(energyGenerationRecords.slice(0, parseInt(limit)));
    }
  } catch (error) {
    next(error);
  }
};
