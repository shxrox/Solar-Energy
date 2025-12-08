import express from "express";
import { getAllEnergyGenerationRecordsBySolarUnitId } from "../application/energy-generation-record";
import { authenticationMiddleware } from "./middlewares/authentication-middleware";

const energyGenerationRecordRouter = express.Router();

energyGenerationRecordRouter
  .route("/solar-unit/:id")
  .get(authenticationMiddleware, getAllEnergyGenerationRecordsBySolarUnitId);

export default energyGenerationRecordRouter;
