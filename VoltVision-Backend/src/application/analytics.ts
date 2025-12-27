
// import { Request, Response, NextFunction } from "express";
// import { EnergyGenerationRecord } from "../infrastructure/entities/EnergyGenerationRecord";
// import { SolarUnit } from "../infrastructure/entities/SolarUnit";
// import { Anomaly } from "../infrastructure/entities/Anomaly"; // ✅ New import for Task 5
// import { NotFoundError } from "../domain/errors/errors";

// /**
//  * GET Capacity Factor Stats
//  * Calculates daily capacity factor for the line chart
//  */
// export const getCapacityFactorStats = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//     const solarUnit = await SolarUnit.findById(id);
//     if (!solarUnit) throw new NotFoundError("Solar Unit not found");

//     const dateLimit = new Date();
//     dateLimit.setDate(dateLimit.getDate() - 30);

//     const records = await EnergyGenerationRecord.aggregate([
//       {
//         $match: {
//           solarUnitId: solarUnit._id,
//           timestamp: { $gte: dateLimit },
//         },
//       },
//       {
//         $group: {
//           _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
//           totalEnergy: { $sum: "$energyGenerated" },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);

//     const capacity = solarUnit.capacity || 5000;

//     const stats = records.map((day) => {
//       const theoreticalMax = capacity * 24;
//       const factor = (day.totalEnergy / theoreticalMax) * 100;

//       return {
//         date: day._id,
//         capacityFactor: parseFloat(factor.toFixed(2)),
//         totalEnergy: day.totalEnergy,
//       };
//     });

//     res.status(200).json(stats);
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * GET Anomaly Stats (Updated for Task 5.2 & 5.3)
//  * Fetches persisted anomalies from the database for the dashboard
//  */
// export const getAnomalyStats = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//     const solarUnit = await SolarUnit.findById(id);
//     if (!solarUnit) throw new NotFoundError("Solar Unit not found");

//     const dateLimit = new Date();
//     dateLimit.setDate(dateLimit.getDate() - 30);

//     // ✅ FETCH REAL DATA: Query the Anomaly collection populated by your background job
//     const savedAnomalies = await Anomaly.find({
//       solarUnitId: solarUnit._id,
//       timestamp: { $gte: dateLimit },
//     }).sort({ timestamp: -1 });

//     // 1. Calculate Distribution (Pie Chart Data)
//     const distribution = [
//       {
//         name: "Inverter Failure",
//         value: savedAnomalies.filter((a) => a.type === "Inverter Failure").length,
//         fill: "#ef4444", // Red
//       },
//       {
//         name: "Power Surge",
//         value: savedAnomalies.filter((a) => a.type === "Power Surge").length,
//         fill: "#f97316", // Orange
//       },
//       {
//         name: "Panel Shading",
//         value: savedAnomalies.filter((a) => a.type === "Panel Shading").length,
//         fill: "#3b82f6", // Blue
//       },
//       {
//         name: "Grid Instability",
//         value: savedAnomalies.filter((a) => a.type === "Grid Instability").length,
//         fill: "#a855f7", // Purple
//       },
//     ].filter((item) => item.value > 0);

//     // 2. Calculate Trends (Timeline Chart Data)
//     const trendsMap = new Map();
//     savedAnomalies.forEach((a) => {
//       const date = a.timestamp.toISOString().split("T")[0];
//       trendsMap.set(date, (trendsMap.get(date) || 0) + 1);
//     });

//     const trends = Array.from(trendsMap, ([date, count]) => ({ date, count }))
//       .sort((a, b) => a.date.localeCompare(b.date))
//       .slice(-7); // Last 7 days with activity

//     // 3. Response Structure for Frontend
//     res.status(200).json({
//       summary: {
//         active: savedAnomalies.filter((a) => a.status === "OPEN").length,
//         resolved: savedAnomalies.filter((a) => a.status === "RESOLVED").length,
//         total: savedAnomalies.length,
//       },
//       distribution,
//       trends,
//       // Mapping real fields (status, description) for the UI list
//       recent: savedAnomalies.slice(0, 5).map((a) => ({
//         _id: a._id,
//         type: a.type,
//         severity: a.severity,
//         time: a.timestamp,
//         status: a.status,
//         description: a.description,
//       })),
//     });
//   } catch (error) {
//     next(error);
//   }
// };

import { Request, Response, NextFunction } from "express";
import { EnergyGenerationRecord } from "../infrastructure/entities/EnergyGenerationRecord";
import { SolarUnit } from "../infrastructure/entities/SolarUnit";
import { Anomaly } from "../infrastructure/entities/Anomaly";
import { NotFoundError } from "../domain/errors/errors";

// ... (getCapacityFactorStats remains the same)

export const getCapacityFactorStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const solarUnit = await SolarUnit.findById(id);
    if (!solarUnit) throw new NotFoundError("Solar Unit not found");

    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - 30);

    const records = await EnergyGenerationRecord.aggregate([
      {
        $match: {
          solarUnitId: solarUnit._id,
          timestamp: { $gte: dateLimit },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          totalEnergy: { $sum: "$energyGenerated" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const capacity = solarUnit.capacity || 5000;

    const stats = records.map((day) => {
      const theoreticalMax = capacity * 24;
      const factor = (day.totalEnergy / theoreticalMax) * 100;

      return {
        date: day._id,
        capacityFactor: parseFloat(factor.toFixed(2)),
        totalEnergy: day.totalEnergy,
      };
    });

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};


export const getAnomalyStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const solarUnit = await SolarUnit.findById(id);
    if (!solarUnit) throw new NotFoundError("Solar Unit not found");

    // ✅ FIX: Removed date filter to ensure ALL test data shows up
    const savedAnomalies = await Anomaly.find({
      solarUnitId: solarUnit._id,
    }).sort({ timestamp: -1 });

    // 1. Distribution
    const distribution = [
      { name: "Inverter Failure", value: 0, fill: "#ef4444" },
      { name: "Power Surge", value: 0, fill: "#f97316" },
      { name: "Panel Shading", value: 0, fill: "#3b82f6" },
      { name: "Grid Instability", value: 0, fill: "#a855f7" },
    ];

    savedAnomalies.forEach(a => {
        const item = distribution.find(d => d.name === a.type);
        if (item) item.value++;
    });

    // 2. Trends
    const trendsMap = new Map();
    savedAnomalies.forEach((a) => {
      const date = a.timestamp.toISOString().split("T")[0];
      trendsMap.set(date, (trendsMap.get(date) || 0) + 1);
    });

    const trends = Array.from(trendsMap, ([date, count]) => ({ date, count }))
      .sort((a: any, b: any) => a.date.localeCompare(b.date))
      .slice(-7);

    // 3. Response
    res.status(200).json({
      summary: {
        active: savedAnomalies.filter((a) => a.status === "OPEN").length,
        // ✅ FIX: Counting total resolved for simplicity
        resolved: savedAnomalies.filter((a) => a.status === "RESOLVED").length,
        total: savedAnomalies.length,
      },
      distribution: distribution.filter(i => i.value > 0),
      trends,
      recent: savedAnomalies.slice(0, 5)
    });
  } catch (error) {
    next(error);
  }
};