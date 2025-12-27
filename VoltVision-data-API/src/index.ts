
import cors from "cors";
import "dotenv/config";
import express from "express";
import energyGenerationRecordRouter from "./api/energy-generation-record";
import { globalErrorHandler } from "./api/middlewares/global-error-handling-middleware";
import { loggerMiddleware } from "./api/middlewares/logger-middleware";
import { connectDB } from "./infrastructure/db";
import { initializeEnergyCron } from "./infrastructure/energy-generation-cron";

const server = express();


server.use(cors()); 

server.use(loggerMiddleware);

server.use(express.json());

server.use("/api/energy-generation-records", energyGenerationRecordRouter);

server.use(globalErrorHandler);

connectDB();
initializeEnergyCron();


const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Data API Server is running on port ${PORT}`);
});