

// import { Request, Response, NextFunction } from "express";
// import { EnergyGenerationRecord } from "../infrastructure/entities/EnergyGenerationRecord";
// import { SolarUnit } from "../infrastructure/entities/SolarUnit";
// import { NotFoundError } from "../domain/errors/errors";


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
//         const theoreticalMax = capacity * 24; 
//         const factor = (day.totalEnergy / theoreticalMax) * 100;
        
//         return {
//             date: day._id,
//             capacityFactor: parseFloat(factor.toFixed(2)),
//             totalEnergy: day.totalEnergy
//         };
//     });

//     res.status(200).json(stats);
//   } catch (error) {
//     next(error);
//   }
// };


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

  
//     const records = await EnergyGenerationRecord.find({
//       solarUnitId: solarUnit._id,
//       timestamp: { $gte: dateLimit },
//     });

 
//     const anomalies: any[] = [];
//     let outageCount = 0;
//     let surgeCount = 0;
//     let lowEffCount = 0;

//     const capacity = solarUnit.capacity || 5000;

//     records.forEach(r => {
//       const hour = new Date(r.timestamp).getHours();
      
      
//       if (r.energyGenerated === 0 && hour > 8 && hour < 16) {
//         anomalies.push({ type: "Inverter Failure", severity: "Critical", time: r.timestamp });
//         outageCount++;
//       }
     
//       else if (r.energyGenerated > capacity * 1.5) {
//         anomalies.push({ type: "Power Surge", severity: "Warning", time: r.timestamp });
//         surgeCount++;
//       }
     
//       else if (r.energyGenerated > 0 && r.energyGenerated < capacity * 0.1 && hour === 12) {
//         anomalies.push({ type: "Panel Shading", severity: "Info", time: r.timestamp });
//         lowEffCount++;
//       }
//     });

    
//     const distribution = [
//       { name: "Inverter Failure", value: outageCount, fill: "#ef4444" }, 
//       { name: "Power Surge", value: surgeCount, fill: "#f97316" }, 
//       { name: "Panel Shading", value: lowEffCount, fill: "#3b82f6" }, 
//       { name: "Grid Instability", value: Math.floor(Math.random() * 3), fill: "#a855f7" } 
//     ].filter(i => i.value > 0);

    
//     const trendsMap = new Map();
//     anomalies.forEach(a => {
//         const date = new Date(a.time).toISOString().split('T')[0];
//         trendsMap.set(date, (trendsMap.get(date) || 0) + 1);
//     });
    
   
//     const trends = Array.from(trendsMap, ([date, count]) => ({ date, count }))
//         .sort((a:any,b:any) => a.date.localeCompare(b.date))
//         .slice(-7); 

    
//     const now = new Date();
    
//     const active = anomalies.filter(a => new Date(a.time).toDateString() === now.toDateString()).length;
    
//     res.status(200).json({
//         summary: {
//             active: active, 
//             review: Math.floor(active / 2) + 1, 
//             resolved: anomalies.length - active
//         },
//         distribution,
//         trends,
//         recent: anomalies.sort((a:any, b:any) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5)
//     });

//   } catch (error) {
//     next(error);
//   }
// };

import { Request, Response, NextFunction } from "express";
import { EnergyGenerationRecord } from "../infrastructure/entities/EnergyGenerationRecord";
import { SolarUnit } from "../infrastructure/entities/SolarUnit";
import { Anomaly } from "../infrastructure/entities/Anomaly"; // ✅ New import for Task 5
import { NotFoundError } from "../domain/errors/errors";

/**
 * GET Capacity Factor Stats
 * Calculates daily capacity factor for the line chart
 */
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

/**
 * GET Anomaly Stats (Updated for Task 5.2 & 5.3)
 * Fetches persisted anomalies from the database for the dashboard
 */
export const getAnomalyStats = async (
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

    // ✅ FETCH REAL DATA: Query the Anomaly collection populated by your background job
    const savedAnomalies = await Anomaly.find({
      solarUnitId: solarUnit._id,
      timestamp: { $gte: dateLimit },
    }).sort({ timestamp: -1 });

    // 1. Calculate Distribution (Pie Chart Data)
    const distribution = [
      {
        name: "Inverter Failure",
        value: savedAnomalies.filter((a) => a.type === "Inverter Failure").length,
        fill: "#ef4444", // Red
      },
      {
        name: "Power Surge",
        value: savedAnomalies.filter((a) => a.type === "Power Surge").length,
        fill: "#f97316", // Orange
      },
      {
        name: "Panel Shading",
        value: savedAnomalies.filter((a) => a.type === "Panel Shading").length,
        fill: "#3b82f6", // Blue
      },
      {
        name: "Grid Instability",
        value: savedAnomalies.filter((a) => a.type === "Grid Instability").length,
        fill: "#a855f7", // Purple
      },
    ].filter((item) => item.value > 0);

    // 2. Calculate Trends (Timeline Chart Data)
    const trendsMap = new Map();
    savedAnomalies.forEach((a) => {
      const date = a.timestamp.toISOString().split("T")[0];
      trendsMap.set(date, (trendsMap.get(date) || 0) + 1);
    });

    const trends = Array.from(trendsMap, ([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-7); // Last 7 days with activity

    // 3. Response Structure for Frontend
    res.status(200).json({
      summary: {
        active: savedAnomalies.filter((a) => a.status === "OPEN").length,
        resolved: savedAnomalies.filter((a) => a.status === "RESOLVED").length,
        total: savedAnomalies.length,
      },
      distribution,
      trends,
      // Mapping real fields (status, description) for the UI list
      recent: savedAnomalies.slice(0, 5).map((a) => ({
        _id: a._id,
        type: a.type,
        severity: a.severity,
        time: a.timestamp,
        status: a.status,
        description: a.description,
      })),
    });
  } catch (error) {
    next(error);
  }
};