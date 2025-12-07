import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  role?: "admin" | "staff";
  email: string;
  clerkUserId: string;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String, enum: ["admin", "staff"] },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  clerkUserId: { type: String, required: true, unique: true },
});

export const User = mongoose.model<IUser>("User", userSchema);