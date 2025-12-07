import express from "express";
import { createCheckoutSession, getSessionStatus } from "../application/payment";
import { authenticationMiddleware } from "./middlewares/authentication-middleware";

const paymentRouter = express.Router();

// POST /api/payments/create-checkout-session
// Protected: Only logged-in users can try to pay
paymentRouter.post("/create-checkout-session", authenticationMiddleware, createCheckoutSession);

// GET /api/payments/session-status
// Protected: Used to verify payment success after redirect
paymentRouter.get("/session-status", authenticationMiddleware, getSessionStatus);

export default paymentRouter;