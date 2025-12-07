import Stripe from "stripe";
import { Request, Response, NextFunction } from "express";
import { Invoice } from "../infrastructure/entities/Invoice";
import { NotFoundError, ValidationError } from "../domain/errors/errors";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  // Updated to match the version expected by your installed library
  apiVersion: "2025-11-17.clover", 
});

// 1. Create Checkout Session (Frontend calls this)
export const createCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { invoiceId } = req.body;

    // Verify invoice exists
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      throw new NotFoundError("Invoice not found");
    }

    if (invoice.paymentStatus === "PAID") {
      throw new ValidationError("Invoice is already paid");
    }

    // Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Ensure this is set in .env
          quantity: Math.round(invoice.totalEnergyGenerated),
        },
      ],
      mode: "payment",
      return_url: `${process.env.FRONTEND_URL}/dashboard/invoices/complete?session_id={CHECKOUT_SESSION_ID}`,
      // Metadata links the payment back to our Database Invoice
      metadata: {
        invoiceId: (invoice as any)._id.toString(), // Fix: Cast to any to access _id
      },
    });

    res.json({ clientSecret: session.client_secret });
  } catch (error) {
    next(error);
  }
};

// 2. Get Session Status (Frontend confirmation page calls this)
export const getSessionStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id as string);

    res.json({
      status: session.status,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
    });
  } catch (error) {
    next(error);
  }
};

// 3. Webhook Handler (Stripe calls this)
export const handleStripeWebhook = async (req: Request, res: Response, next: NextFunction) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    // Verify the event came from Stripe
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig as string, 
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    console.error(`Webhook Signature Verification Failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoiceId = session.metadata?.invoiceId;

    if (invoiceId && session.payment_status === "paid") {
      console.log(`💰 Payment received for Invoice: ${invoiceId}`);
      
      // Update Database
      await Invoice.findByIdAndUpdate(invoiceId, {
        paymentStatus: "PAID",
        stripeSessionId: session.id,
        paidAt: new Date(),
      });
    }
  }

  res.status(200).json({ received: true });
};