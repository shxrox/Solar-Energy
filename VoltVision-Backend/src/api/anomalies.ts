// import { Router } from "express";
// import { getMyAnomalies, resolveAnomaly, getAllAnomaliesAdmin } from "../application/anomaly";
// import { authenticationMiddleware } from "./middlewares/authentication-middleware";
// import { authorizationMiddleware } from "./middlewares/authorization-middleware";

// const router = Router();

// // User Route
// router.get("/my-unit", authenticationMiddleware, getMyAnomalies);

// // ✅ FIXED: Pass authorizationMiddleware directly (removed the parentheses)
// router.get("/admin/all", authenticationMiddleware, authorizationMiddleware, getAllAnomaliesAdmin);

// router.patch("/:id/resolve", authenticationMiddleware, resolveAnomaly);

// export default router;

import { Router } from "express";
import { 
  getMyAnomalies, 
  resolveAnomaly, 
  getAllAnomaliesAdmin 
} from "../application/anomaly";
// 
import { getAnomalyStats } from "../application/analytics"; 
import { authenticationMiddleware } from "./middlewares/authentication-middleware";
import { authorizationMiddleware } from "./middlewares/authorization-middleware";
import { syncEnergyGenerationRecords } from "../application/background/sync-energy-generation-records";

const router = Router();


router.get("/my-unit", authenticationMiddleware, getMyAnomalies);


router.get("/analytics/:id", authenticationMiddleware, getAnomalyStats);


router.patch("/:id/resolve", authenticationMiddleware, resolveAnomaly);


router.post("/trigger-scan", authenticationMiddleware, async (req, res) => {
  await syncEnergyGenerationRecords();
  res.json({ message: "Scan triggered" });
});

router.get("/admin/all", authenticationMiddleware, authorizationMiddleware, getAllAnomaliesAdmin);

export default router;