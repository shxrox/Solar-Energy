import { SolarUnit } from "../infrastructure/entities/SolarUnit";
import { EnergyGenerationRecord } from "../infrastructure/entities/EnergyGenerationRecord";
import { Invoice } from "../infrastructure/entities/Invoice";

export const generateInvoiceForUnit = async (solarUnitId: string) => {
  // 1. Get the Unit
  const unit = await SolarUnit.findById(solarUnitId);
  if (!unit) throw new Error("Solar Unit not found");

  // 2. Define Billing Period (Last 30 Days)
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  // 3. Calculate Total Energy (kWh)
  // We sum up all the records for this unit in the time range
  const records = await EnergyGenerationRecord.aggregate([
    {
      $match: {
        solarUnitId: unit._id,
        timestamp: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$energyGenerated" },
      },
    },
  ]);

  // Convert Watts to kWh (records are usually in Watts/hour, so /1000)
  // If your seed data is already in kWh, remove the /1000
  const totalWh = records.length > 0 ? records[0].total : 0;
  const totalkWh = totalWh / 1000; 

  // 4. Create the Invoice
  const newInvoice = await Invoice.create({
    solarUnitId: unit._id,
    userId: unit.userId,
    billingPeriodStart: startDate,
    billingPeriodEnd: endDate,
    totalEnergyGenerated: totalkWh,
    paymentStatus: "PENDING",
  });

  return newInvoice;
};