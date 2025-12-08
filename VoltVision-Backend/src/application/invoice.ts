// import { Request, Response, NextFunction } from "express";
// import { getAuth } from "@clerk/express";
// import { Invoice } from "../infrastructure/entities/Invoice";
// import { SolarUnit } from "../infrastructure/entities/SolarUnit";
// import { User } from "../infrastructure/entities/User"; // ✅ Import User model
// import { NotFoundError } from "../domain/errors/errors";

// import { generateInvoiceForUnit } from "./invoice-service";

// // 1. Get Invoices for the Logged-in User
// export const getMyInvoices = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const auth = getAuth(req);

//     // A. Find the User in DB to get their Mongo ID
//     const user = await User.findOne({ clerkUserId: auth.userId });
//     if (!user) {
//         // If user isn't in DB yet (rare), return empty list
//         return res.status(200).json([]);
//     }

//     // B. Find invoices using the User's Mongo ID (stored as string in Invoice)
//     const invoices = await Invoice.find({ userId: (user._id as any).toString() }).sort({ createdAt: -1 });
    
//     res.status(200).json(invoices);
//   } catch (error) {
//     next(error);
//   }
// };

// // 2. FORCE GENERATE Invoice (For Testing)
// export const generateInvoiceManually = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const auth = getAuth(req);
    
//     // A. Find the User first
//     const user = await User.findOne({ clerkUserId: auth.userId });
//     if (!user) {
//         throw new NotFoundError("User not found in database");
//     }

//     // B. Find Solar Unit using the User's MongoDB ID
//     const solarUnit = await SolarUnit.findOne({ userId: user._id }); 
    
//     if (!solarUnit) {
//         throw new NotFoundError("No solar unit found for this user");
//     }

//     // C. Generate Invoice
//     const unitId = (solarUnit as any)._id.toString();
//     const invoice = await generateInvoiceForUnit(unitId);
    
//     res.status(201).json({ 
//         message: "Invoice generated successfully", 
//         invoice 
//     });
//   } catch (error) {
//     next(error);
//   }
// };



// import { Request, Response, NextFunction } from "express";
// import { getAuth } from "@clerk/express";
// import { Invoice } from "../infrastructure/entities/Invoice";
// import { SolarUnit } from "../infrastructure/entities/SolarUnit";
// import { User } from "../infrastructure/entities/User"; 
// import { NotFoundError } from "../domain/errors/errors";

// import { generateInvoiceForUnit } from "./invoice-service";

// // --- USER FUNCTIONS ---

// // 1. Get Invoices for the Logged-in User
// export const getMyInvoices = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const auth = getAuth(req);

//     // Get Mongo User ID
//     const user = await User.findOne({ clerkUserId: auth.userId });
//     if (!user) {
//         return res.status(200).json([]);
//     }

//     // ✅ FIX: Cast user to 'any' to access _id safely
//     const userId = (user as any)._id.toString();

//     // Find invoices
//     const invoices = await Invoice.find({ userId: userId }).sort({ createdAt: -1 });
//     res.status(200).json(invoices);
//   } catch (error) {
//     next(error);
//   }
// };

// // 2. FORCE GENERATE Invoice (For Testing)
// export const generateInvoiceManually = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const auth = getAuth(req);
    
//     const user = await User.findOne({ clerkUserId: auth.userId });
//     if (!user) throw new NotFoundError("User not found in database");

//     // ✅ FIX: Cast user to 'any' here too
//     const userId = (user as any)._id;

//     const solarUnit = await SolarUnit.findOne({ userId: userId }); 
//     if (!solarUnit) throw new NotFoundError("No solar unit found for this user");

//     // Generate
//     const unitId = (solarUnit as any)._id.toString();
//     const invoice = await generateInvoiceForUnit(unitId);
    
//     res.status(201).json({ 
//         message: "Invoice generated successfully", 
//         invoice 
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // --- ADMIN FUNCTIONS ---

// // 3. ADMIN: Get ALL Invoices
// export const getAllInvoices = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { status } = req.query;
    
//     const filter: any = {};
//     if (status && status !== "ALL") {
//       filter.paymentStatus = status;
//     }

//     // Find ALL invoices
//     const invoices = await Invoice.find(filter)
//       .sort({ createdAt: -1 })
//       .populate('solarUnitId', 'serialNumber'); 
    
//     res.status(200).json(invoices);
//   } catch (error) {
//     next(error);
//   }
// };

// // 4. ADMIN: Update Status
// export const updateInvoiceStatus = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body; 

//     const invoice = await Invoice.findByIdAndUpdate(
//       id, 
//       { 
//         paymentStatus: status,
//         paidAt: status === 'PAID' ? new Date() : undefined
//       },
//       { new: true }
//     );

//     if (!invoice) {
//         throw new NotFoundError("Invoice not found");
//     }

//     res.status(200).json(invoice);
//   } catch (error) {
//     next(error);
//   }
// };


import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { Invoice } from "../infrastructure/entities/Invoice";
import { SolarUnit } from "../infrastructure/entities/SolarUnit";
import { User } from "../infrastructure/entities/User"; 
import { NotFoundError } from "../domain/errors/errors";

import { generateInvoiceForUnit } from "./invoice-service";

// --- USER FUNCTIONS ---

// 1. Get Invoices for the Logged-in User
export const getMyInvoices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = getAuth(req);

    // Get Mongo User ID
    const user = await User.findOne({ clerkUserId: auth.userId });
    if (!user) {
        return res.status(200).json([]);
    }

    // ✅ FIX: Cast user to 'any' to access _id safely
    const userId = (user as any)._id.toString();

    // Find invoices
    const invoices = await Invoice.find({ userId: userId }).sort({ createdAt: -1 });
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
    
    const user = await User.findOne({ clerkUserId: auth.userId });
    if (!user) throw new NotFoundError("User not found in database");

    // ✅ FIX: Cast user to 'any' here too
    const userId = (user as any)._id;

    const solarUnit = await SolarUnit.findOne({ userId: userId }); 
    if (!solarUnit) throw new NotFoundError("No solar unit found for this user");

    // Generate
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

// --- ADMIN FUNCTIONS ---

// 3. ADMIN: Get ALL Invoices
export const getAllInvoices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.query;
    
    const filter: any = {};
    if (status && status !== "ALL") {
      filter.paymentStatus = status;
    }

    // Find ALL invoices
    const invoices = await Invoice.find(filter)
      .sort({ createdAt: -1 })
      .populate('solarUnitId', 'serialNumber'); 
    
    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

// 4. ADMIN: Update Status
export const updateInvoiceStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 

    const invoice = await Invoice.findByIdAndUpdate(
      id, 
      { 
        paymentStatus: status,
        paidAt: status === 'PAID' ? new Date() : undefined
      },
      { new: true }
    );

    if (!invoice) {
        throw new NotFoundError("Invoice not found");
    }

    res.status(200).json(invoice);
  } catch (error) {
    next(error);
  }
};