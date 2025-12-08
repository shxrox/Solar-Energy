import express from "express";
import { getAllEnergyGenerationRecordsBySerialNumber } from "../application/energy-generation-record";

const energyGenerationRecordRouter = express.Router();

energyGenerationRecordRouter
  .route("/solar-unit/:serialNumber")
  .get(getAllEnergyGenerationRecordsBySerialNumber);

export default energyGenerationRecordRouter;
