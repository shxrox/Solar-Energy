import express from "express";
import {
  getAllSolarUnits,
  createSolarUnit,
  getSolarUnitById,
  updateSolarUnit,
  deleteSolarUnit,
  createSolarUnitValidator,
  getSolarUnitForUser,
} from "../application/solar-unit";
import { authenticationMiddleware } from "./middlewares/authentication-middleware";
import { authorizationMiddleware } from "./middlewares/authorization-middleware";
import { syncMiddleware } from "./middlewares/sync/sync-middleware";

const solarUnitRouter = express.Router();

solarUnitRouter.route("/").get(authenticationMiddleware, authorizationMiddleware, getAllSolarUnits).post(authenticationMiddleware, authorizationMiddleware, createSolarUnitValidator, createSolarUnit);
solarUnitRouter.route("/me").get(authenticationMiddleware, syncMiddleware, getSolarUnitForUser);
solarUnitRouter
  .route("/:id")
  .get(authenticationMiddleware, authorizationMiddleware, getSolarUnitById)
  .put(authenticationMiddleware, authorizationMiddleware, updateSolarUnit)
  .delete(authenticationMiddleware, authorizationMiddleware, deleteSolarUnit);

export default solarUnitRouter;
