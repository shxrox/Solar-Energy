import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { Invoice } from "../infrastructure/entities/Invoice";
import { SolarUnit } from "../infrastructure/entities/SolarUnit";
import { User } from "../infrastructure/entities/User"; // ✅ Import User model
import { NotFoundError } from "../domain/errors/errors";

import { generateInvoiceForUnit } from "./invoice-service";

// 1. Get Invoices for the Logged-in User
export const getMyInvoices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = getAuth(req);

    // A. Find the User in DB to get their Mongo ID
    const user = await User.findOne({ clerkUserId: auth.userId });
    if (!user) {
        // If user isn't in DB yet (rare), return empty list
        return res.status(200).json([]);
    }

    // B. Find invoices using the User's Mongo ID (stored as string in Invoice)
    const invoices = await Invoice.find({ userId: (user._id as any).toString() }).sort({ createdAt: -1 });
    
    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

// 2. FORCE GENERATE Invoice (For Testing)
export const generateInvoiceManually = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = getAuth(req);
    
    // A. Find the User first
    const user = await User.findOne({ clerkUserId: auth.userId });
    if (!user) {
        throw new NotFoundError("User not found in database");
    }

    // B. Find Solar Unit using the User's MongoDB ID
    const solarUnit = await SolarUnit.findOne({ userId: user._id }); 
    
    if (!solarUnit) {
        throw new NotFoundError("No solar unit found for this user");
    }

    // C. Generate Invoice
    const unitId = (solarUnit as any)._id.toString();
    const invoice = await generateInvoiceForUnit(unitId);
    
    res.status(201).json({ 
        message: "Invoice generated successfully", 
        invoice 
    });
  } catch (error) {
    next(error);
  }
};