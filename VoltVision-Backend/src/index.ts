
import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

// ... existing middleware imports
import { globalErrorHandler } from "./api/middlewares/global-error-handling-middleware";
import { loggerMiddleware } from "./api/middlewares/logger-middleware";
import { authenticationMiddleware } from "./api/middlewares/authentication-middleware";

// ... existing infrastructure imports
import { connectDB } from "./infrastructure/db";
import { initializeScheduler } from "./infrastructure/scheduler";

// ... existing router imports
import energyGenerationRecordRouter from "./api/energy-generation-record";
import solarUnitRouter from "./api/solar-unit";
import usersRouter from "./api/users";
import webhooksRouter from "./api/webhooks";
import invoiceRouter from "./api/invoice";

// 👇 1. IMPORT PAYMENT ROUTER & WEBHOOK HANDLER
import paymentRouter from "./api/payment"; 
import { handleStripeWebhook } from "./application/payment"; 

// ... controller imports (analytics/weather) ...
import { getWeatherData } from "./application/weather";
import { getCapacityFactorStats, getAnomalyStats } from "./application/analytics";

const server = express();

server.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
server.use(loggerMiddleware);

// --- SPECIAL ROUTES (Must be before express.json) ---
server.use("/api/webhooks", webhooksRouter);

// 👇 2. STRIPE WEBHOOK (Critical: Needs raw body)
server.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

// --- STANDARD MIDDLEWARE ---
server.use(clerkMiddleware());
server.use(express.json());

// --- API ROUTES ---
server.use("/api/solar-units", solarUnitRouter);
server.use("/api/energy-generation-records", energyGenerationRecordRouter);
server.use("/api/users", usersRouter);
server.use("/api/invoices", invoiceRouter);

// 👇 3. REGISTER PAYMENT ROUTER
server.use("/api/payments", paymentRouter);

// --- ANALYTICS ROUTES ---
server.get("/api/weather", getWeatherData);
server.get("/api/analytics/capacity-factor/:id", authenticationMiddleware, getCapacityFactorStats);
server.get("/api/analytics/anomalies/:id", authenticationMiddleware, getAnomalyStats);

server.use(globalErrorHandler);

connectDB();
initializeScheduler();

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});