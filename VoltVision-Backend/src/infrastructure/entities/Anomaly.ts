import mongoose, { Document, Schema } from "mongoose";

export interface IAnomaly extends Document {
  solarUnitId: mongoose.Types.ObjectId;
  type: string;
  severity: "Critical" | "Warning" | "Info";
  timestamp: Date;
  description: string;
  status: "OPEN" | "RESOLVED";
}

const anomalySchema = new Schema<IAnomaly>({
  solarUnitId: { type: Schema.Types.ObjectId, ref: "SolarUnit", required: true },
  type: { type: String, required: true },
  severity: { type: String, enum: ["Critical", "Warning", "Info"], required: true },
  timestamp: { type: Date, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["OPEN", "RESOLVED"], default: "OPEN" }
});

anomalySchema.index({ solarUnitId: 1, type: 1, timestamp: 1 }, { unique: true });

export const Anomaly = mongoose.model<IAnomaly>("Anomaly", anomalySchema);