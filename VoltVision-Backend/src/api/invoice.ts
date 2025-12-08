

import express from "express";
import { 
  getMyInvoices, 
  generateInvoiceManually,
  getAllInvoices,      
  updateInvoiceStatus  
} from "../application/invoice";
import { authenticationMiddleware } from "./middlewares/authentication-middleware";
import { authorizationMiddleware } from "./middlewares/authorization-middleware"; 

const invoiceRouter = express.Router();


invoiceRouter.get("/", authenticationMiddleware, getMyInvoices);


invoiceRouter.post("/generate", authenticationMiddleware, generateInvoiceManually);


invoiceRouter.get(
  "/admin/all", 
  authenticationMiddleware, 
  authorizationMiddleware,
  getAllInvoices
);


invoiceRouter.patch(
  "/admin/:id/status", 
  authenticationMiddleware, 
  authorizationMiddleware,
  updateInvoiceStatus
);

export default invoiceRouter;