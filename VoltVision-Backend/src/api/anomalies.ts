import { Router } from "express";
import { getMyAnomalies, resolveAnomaly, getAllAnomaliesAdmin } from "../application/anomaly";
import { authenticationMiddleware } from "./middlewares/authentication-middleware";
import { authorizationMiddleware } from "./middlewares/authorization-middleware";

const router = Router();

// User Route
router.get("/my-unit", authenticationMiddleware, getMyAnomalies);

// ✅ FIXED: Pass authorizationMiddleware directly (removed the parentheses)
router.get("/admin/all", authenticationMiddleware, authorizationMiddleware, getAllAnomaliesAdmin);

router.patch("/:id/resolve", authenticationMiddleware, resolveAnomaly);

export default router;