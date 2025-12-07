import express from "express";
import { getMyInvoices, generateInvoiceManually } from "../application/invoice";
import { authenticationMiddleware } from "./middlewares/authentication-middleware";

const invoiceRouter = express.Router();

// GET /api/invoices -> Get all invoices for the logged-in user
invoiceRouter.get("/", authenticationMiddleware, getMyInvoices);

// POST /api/invoices/generate -> Force create an invoice (For testing)
invoiceRouter.post("/generate", authenticationMiddleware, generateInvoiceManually);

export default invoiceRouter;