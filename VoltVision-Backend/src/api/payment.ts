import express from "express";
import { createCheckoutSession, getSessionStatus } from "../application/payment";
import { authenticationMiddleware } from "./middlewares/authentication-middleware";

const paymentRouter = express.Router();


paymentRouter.post("/create-checkout-session", authenticationMiddleware, createCheckoutSession);


paymentRouter.get("/session-status", authenticationMiddleware, getSessionStatus);

export default paymentRouter;