
// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import { clerkMiddleware } from "@clerk/express";
// import { syncEnergyGenerationRecords } from "./application/background/sync-energy-generation-records";
// // ... existing middleware imports
// import { globalErrorHandler } from "./api/middlewares/global-error-handling-middleware";
// import { loggerMiddleware } from "./api/middlewares/logger-middleware";
// import { authenticationMiddleware } from "./api/middlewares/authentication-middleware";

// // ... existing infrastructure imports
// import { connectDB } from "./infrastructure/db";
// import { initializeScheduler } from "./infrastructure/scheduler";
// import anomalyRouter from "./api/anomalies";
// // ... after other router registrations

// // ... existing router imports
// import energyGenerationRecordRouter from "./api/energy-generation-record";
// import solarUnitRouter from "./api/solar-unit";
// import usersRouter from "./api/users";
// import webhooksRouter from "./api/webhooks";
// import invoiceRouter from "./api/invoice";

// // 👇 1. IMPORT PAYMENT ROUTER & WEBHOOK HANDLER
// import paymentRouter from "./api/payment";
// import { handleStripeWebhook } from "./application/payment";

// // ... controller imports (analytics/weather) ...
// import { getWeatherData } from "./application/weather";
// import { getCapacityFactorStats, getAnomalyStats } from "./application/analytics";

// const server = express();

// server.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
// server.use(loggerMiddleware);

// // --- SPECIAL ROUTES (Must be before express.json) ---
// server.use("/api/webhooks", webhooksRouter);
// server.use("/api/anomalies", anomalyRouter);
// // 👇 2. STRIPE WEBHOOK (Critical: Needs raw body)
// server.post(
//   "/api/stripe/webhook",
//   express.raw({ type: "application/json" }),
//   handleStripeWebhook
// );

// // --- STANDARD MIDDLEWARE ---
// server.use(clerkMiddleware());
// server.use(express.json());

// // --- API ROUTES ---
// server.use("/api/solar-units", solarUnitRouter);
// server.use("/api/energy-generation-records", energyGenerationRecordRouter);
// server.use("/api/users", usersRouter);
// server.use("/api/invoices", invoiceRouter);

// // 👇 3. REGISTER PAYMENT ROUTER
// server.use("/api/payments", paymentRouter);

// // --- ANALYTICS ROUTES ---
// server.get("/api/weather", getWeatherData);
// server.get("/api/analytics/capacity-factor/:id", authenticationMiddleware, getCapacityFactorStats);
// server.get("/api/analytics/anomalies/:id", authenticationMiddleware, getAnomalyStats);

// server.use(globalErrorHandler);

// connectDB();
// initializeScheduler();



// const PORT = process.env.PORT || 8000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
  
// });

// // ... existing imports ...

// // --- DATABASE & STARTUP ---
// const startApp = async () => {
//   try {
//     // 1. Connect to Database
//     await connectDB();
//     console.log("Connected to MongoDB");

//     // 2. Initialize the Cron Scheduler
//     initializeScheduler();
//     console.log("[Scheduler] Energy generation records sync scheduled");

//     // ✅ 3. TEMP: MANUAL SYNC (Add this here)
//     // This ensures your empty 'anomalies' collection gets populated immediately
//     console.log("Starting manual sync for anomaly detection...");
//     await syncEnergyGenerationRecords(); 
//     console.log("Manual sync finished.");

//     // 4. Start Server
//     const PORT = process.env.PORT || 8000;
//     server.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
    
//   } catch (error) {
//     console.error("Failed to start the application:", error);
//     process.exit(1);
//   }
// };

// // Execute the startup
// startApp();

import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

// Middleware
import { globalErrorHandler } from "./api/middlewares/global-error-handling-middleware";
import { loggerMiddleware } from "./api/middlewares/logger-middleware";
import { authenticationMiddleware } from "./api/middlewares/authentication-middleware";

// Infrastructure
import { connectDB } from "./infrastructure/db";
import { initializeScheduler } from "./infrastructure/scheduler";

// Routers
import energyGenerationRecordRouter from "./api/energy-generation-record";
import solarUnitRouter from "./api/solar-unit";
import usersRouter from "./api/users";
import webhooksRouter from "./api/webhooks";
import invoiceRouter from "./api/invoice";
import paymentRouter from "./api/payment";
import anomalyRouter from "./api/anomalies";
// ... existing imports
import settingsRouter from "./api/settings"; // ✅ Import the router

 
// Controllers & Webhooks
import { handleStripeWebhook } from "./application/payment";
import { getWeatherData } from "./application/weather";
import { getCapacityFactorStats } from "./application/analytics";
import { syncEnergyGenerationRecords } from "./application/background/sync-energy-generation-records";

const server = express();

// 1. CORS & Logger (Always First)
server.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
server.use(loggerMiddleware);

// 2. Webhooks (Public - No Auth Needed)
server.use("/api/webhooks", webhooksRouter);
// Stripe needs raw body, so we define it here before express.json()
server.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

// 3. ✅ CLERK MIDDLEWARE (CRITICAL: Must be before API routes)
server.use(clerkMiddleware());

// 4. Standard Body Parser
server.use(express.json());

// 5. API Routes (Now safe to use 'getAuth')
server.use("/api/solar-units", solarUnitRouter);
server.use("/api/energy-generation-records", energyGenerationRecordRouter);
server.use("/api/users", usersRouter);
server.use("/api/invoices", invoiceRouter);
server.use("/api/payments", paymentRouter);
server.use("/api/anomalies", anomalyRouter);
server.use("/api/settings", settingsRouter);
// 6. Analytics Routes
server.get("/api/weather", getWeatherData);
server.get("/api/analytics/capacity-factor/:id", authenticationMiddleware, getCapacityFactorStats);

// 7. Error Handling (Always Last)
server.use(globalErrorHandler);

// --- STARTUP LOGIC ---
const startApp = async () => {
  try {
    // 1. Connect to Database
    await connectDB();
    console.log("Connected to MongoDB");

    // 2. Initialize Scheduler
    initializeScheduler();
    console.log("[Scheduler] Energy generation records sync scheduled");

    // 3. (Optional) Run Manual Sync on Startup
    // console.log("Starting manual sync for anomaly detection...");
    // await syncEnergyGenerationRecords(); 
    // console.log("Manual sync finished.");

    // 4. Start Server (ONLY HERE)
    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
};

startApp();