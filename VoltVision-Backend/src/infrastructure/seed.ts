import mongoose from "mongoose";
import { SolarUnit } from "./entities/SolarUnit";
import dotenv from "dotenv";
import { connectDB } from "./db";

dotenv.config();

async function seed() {
  try {
    // Connect to DB
    await connectDB();

    // Clear existing data
    await SolarUnit.deleteMany({});

    // Create a new solar unit
    const solarUnit = await SolarUnit.create({
      serialNumber: "SU-0001",
      installationDate: new Date("2025-08-01"),
      capacity: 5000,
      status: "ACTIVE",
    });

    console.log(
      `Database seeded successfully. Created solar unit: ${solarUnit.serialNumber}`
    );
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
