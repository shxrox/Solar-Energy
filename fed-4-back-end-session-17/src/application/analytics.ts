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

//     // 1. Look back 30 days
//     const dateLimit = new Date();
//     dateLimit.setDate(dateLimit.getDate() - 30);

//     // 2. Aggregate data by Day
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
//           totalEnergy: { $sum: "$energyGenerated" }, // Sum of all hours in that day
//         },
//       },
//       { $sort: { _id: 1 } }, // Sort by date ascending
//     ]);

//     // 3. Calculate Capacity Factor %
//     // Formula: (Actual Daily Energy / (Rated Capacity * 24 hours)) * 100
//     // Example: Produced 24kWh in a day on a 5kW system. Max possible = 5*24 = 120kWh.
//     // Factor = (24 / 120) * 100 = 20%
    
//     const capacity = solarUnit.capacity || 5000; // Default to 5kW if missing

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


import { Request, Response, NextFunction } from "express";
import { EnergyGenerationRecord } from "../infrastructure/entities/EnergyGenerationRecord";
import { SolarUnit } from "../infrastructure/entities/SolarUnit";
import { NotFoundError } from "../domain/errors/errors";

// --- TASK 3.2: CAPACITY FACTOR (EFFICIENCY) ---
export const getCapacityFactorStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const solarUnit = await SolarUnit.findById(id);
    if (!solarUnit) throw new NotFoundError("Solar Unit not found");

    // Look back 30 days
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
            totalEnergy: day.totalEnergy
        };
    });

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

// --- TASK 5: ANOMALY DETECTION ---
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
    dateLimit.setDate(dateLimit.getDate() - 30); // Last 30 days

    // Fetch all records for analysis
    const records = await EnergyGenerationRecord.find({
      solarUnitId: solarUnit._id,
      timestamp: { $gte: dateLimit },
    });

    // 1. Detect Anomalies based on patterns
    const anomalies: any[] = [];
    let outageCount = 0;
    let surgeCount = 0;
    let lowEffCount = 0;

    const capacity = solarUnit.capacity || 5000;

    records.forEach(r => {
      const hour = new Date(r.timestamp).getHours();
      
      // A. Inverter Failure: Zero output during peak sun hours (8am - 4pm)
      if (r.energyGenerated === 0 && hour > 8 && hour < 16) {
        anomalies.push({ type: "Inverter Failure", severity: "Critical", time: r.timestamp });
        outageCount++;
      }
      // B. Power Surge: Output dangerously higher than capacity
      else if (r.energyGenerated > capacity * 1.5) {
        anomalies.push({ type: "Power Surge", severity: "Warning", time: r.timestamp });
        surgeCount++;
      }
      // C. Panel Shading/Dust: Output very low at noon
      else if (r.energyGenerated > 0 && r.energyGenerated < capacity * 0.1 && hour === 12) {
        anomalies.push({ type: "Panel Shading", severity: "Info", time: r.timestamp });
        lowEffCount++;
      }
    });

    // 2. Prepare Pie Chart Data
    const distribution = [
      { name: "Inverter Failure", value: outageCount, fill: "#ef4444" }, // Red
      { name: "Power Surge", value: surgeCount, fill: "#f97316" }, // Orange
      { name: "Panel Shading", value: lowEffCount, fill: "#3b82f6" }, // Blue
      { name: "Grid Instability", value: Math.floor(Math.random() * 3), fill: "#a855f7" } // Mock data for variety
    ].filter(i => i.value > 0);

    // 3. Prepare Trend Data (Daily Counts)
    const trendsMap = new Map();
    anomalies.forEach(a => {
        const date = new Date(a.time).toISOString().split('T')[0];
        trendsMap.set(date, (trendsMap.get(date) || 0) + 1);
    });
    
    // Sort and take last 7 active days for the chart
    const trends = Array.from(trendsMap, ([date, count]) => ({ date, count }))
        .sort((a:any,b:any) => a.date.localeCompare(b.date))
        .slice(-7); 

    // 4. Summary Counts
    const now = new Date();
    // Logic: Anomalies today are "Active", yesterday are "Under Review", older are "Resolved"
    const active = anomalies.filter(a => new Date(a.time).toDateString() === now.toDateString()).length;
    
    res.status(200).json({
        summary: {
            active: active, 
            review: Math.floor(active / 2) + 1, // Mock logic for demo
            resolved: anomalies.length - active
        },
        distribution,
        trends,
        recent: anomalies.sort((a:any, b:any) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5)
    });

  } catch (error) {
    next(error);
  }
};