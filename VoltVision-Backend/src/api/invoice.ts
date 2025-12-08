// import express from "express";
// import { getMyInvoices, generateInvoiceManually } from "../application/invoice";
// import { authenticationMiddleware } from "./middlewares/authentication-middleware";

// const invoiceRouter = express.Router();

// // GET /api/invoices -> Get all invoices for the logged-in user
// invoiceRouter.get("/", authenticationMiddleware, getMyInvoices);

// // POST /api/invoices/generate -> Force create an invoice (For testing)
// invoiceRouter.post("/generate", authenticationMiddleware, generateInvoiceManually);

// export default invoiceRouter;


import express from "express";
import { 
  getMyInvoices, 
  generateInvoiceManually,
  getAllInvoices,      // ✅ New Import
  updateInvoiceStatus  // ✅ New Import
} from "../application/invoice";
import { authenticationMiddleware } from "./middlewares/authentication-middleware";
import { authorizationMiddleware } from "./middlewares/authorization-middleware"; // ✅ New Import

const invoiceRouter = express.Router();

// --- USER ROUTES ---
// GET /api/invoices -> See my own bills
invoiceRouter.get("/", authenticationMiddleware, getMyInvoices);

// POST /api/invoices/generate -> Force create my bill (Test)
invoiceRouter.post("/generate", authenticationMiddleware, generateInvoiceManually);

// --- ADMIN ROUTES (The missing part) ---
// GET /api/invoices/admin/all -> See ALL bills from everyone
invoiceRouter.get(
  "/admin/all", 
  authenticationMiddleware, 
  authorizationMiddleware, // 🔒 Admin Only
  getAllInvoices
);

// PATCH /api/invoices/admin/:id/status -> Manually update status
invoiceRouter.patch(
  "/admin/:id/status", 
  authenticationMiddleware, 
  authorizationMiddleware, // 🔒 Admin Only
  updateInvoiceStatus
);

export default invoiceRouter;