import mongoose from "mongoose";

const energyGenerationRecordSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  energyGenerated: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  intervalHours: {
    type: Number,
    default: 2,
    min: 0.1,
    max: 24,
  },
});

export const EnergyGenerationRecord = mongoose.model(
  "EnergyGenerationRecord",
  energyGenerationRecordSchema
);
