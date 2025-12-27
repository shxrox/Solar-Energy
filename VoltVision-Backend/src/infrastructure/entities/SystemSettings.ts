import mongoose, { Schema, Document } from 'mongoose';

export interface ISystemSettings extends Document {
  appName: string;
  maintenanceMode: boolean;
  emailNotifications: boolean;
  logRetentionDays: number;
}

const SystemSettingsSchema = new Schema<ISystemSettings>({
  appName: { type: String, default: 'VoltVision' },
  maintenanceMode: { type: Boolean, default: false },
  emailNotifications: { type: Boolean, default: true },
  logRetentionDays: { type: Number, default: 30 },
}, { timestamps: true });

// Singleton Pattern: We typically only want ONE settings document
export const SystemSettings = mongoose.model<ISystemSettings>('SystemSettings', SystemSettingsSchema);