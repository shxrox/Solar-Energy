import mongoose, { Document, Schema } from "mongoose";

export interface ISolarUnit extends Document {
  userId?: mongoose.Types.ObjectId;
  serialNumber: string;
  installationDate: Date;
  capacity: number;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
}

const solarUnitSchema = new Schema<ISolarUnit>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  serialNumber: { type: String, required: true, unique: true },
  installationDate: { type: Date, required: true },
  capacity: { type: Number, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ["ACTIVE", "INACTIVE", "MAINTENANCE"] 
  },
});

export const SolarUnit = mongoose.model<ISolarUnit>("SolarUnit", solarUnitSchema);