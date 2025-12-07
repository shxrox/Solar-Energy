import mongoose, { Document, Schema } from "mongoose";

export interface IEnergyGenerationRecord extends Document {
  solarUnitId: mongoose.Types.ObjectId;
  energyGenerated: number;
  timestamp: Date;
  intervalHours: number;
}

const energyGenerationRecordSchema = new Schema<IEnergyGenerationRecord>({
  solarUnitId: {
    type: Schema.Types.ObjectId,
    ref: "SolarUnit",
    required: true,
  },
  energyGenerated: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  intervalHours: { type: Number, default: 2, min: 0.1, max: 24 },
});

export const EnergyGenerationRecord = mongoose.model<IEnergyGenerationRecord>(
  "EnergyGenerationRecord",
  energyGenerationRecordSchema
);