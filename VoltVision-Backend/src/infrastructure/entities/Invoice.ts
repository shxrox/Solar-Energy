// import mongoose, { Schema, Document } from 'mongoose';

// export interface IInvoice extends Document {
//   solarUnitId: mongoose.Types.ObjectId;
//   userId: string; // The user who owns the unit
//   billingPeriodStart: Date;
//   billingPeriodEnd: Date;
//   totalEnergyGenerated: number; // kWh used in calculation
//   paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
//   stripeSessionId?: string; // To track the payment session later
//   paidAt?: Date;
// }

// const InvoiceSchema: Schema = new Schema(
//   {
//     solarUnitId: { type: Schema.Types.ObjectId, ref: 'SolarUnit', required: true },
//     userId: { type: String, required: true }, // We store the User ID string
//     billingPeriodStart: { type: Date, required: true },
//     billingPeriodEnd: { type: Date, required: true },
//     totalEnergyGenerated: { type: Number, required: true },
//     paymentStatus: {
//       type: String,
//       enum: ['PENDING', 'PAID', 'FAILED'],
//       default: 'PENDING',
//     },
//     stripeSessionId: { type: String },
//     paidAt: { type: Date },
//   },
//   { timestamps: true } // Automatically adds createdAt and updatedAt
// );

// export const Invoice = mongoose.model<IInvoice>('Invoice', InvoiceSchema);
import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoice extends Document {
  solarUnitId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId; // Changed from string to ObjectId
  billingPeriodStart: Date;
  billingPeriodEnd: Date;
  totalEnergyGenerated: number;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  stripeSessionId?: string;
  paidAt?: Date;
}

const InvoiceSchema: Schema = new Schema(
  {
    solarUnitId: { type: Schema.Types.ObjectId, ref: 'SolarUnit', required: true },
    // This 'ref' allows Mongoose to look up firstName and lastName
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    billingPeriodStart: { type: Date, required: true },
    billingPeriodEnd: { type: Date, required: true },
    totalEnergyGenerated: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED'],
      default: 'PENDING',
    },
    stripeSessionId: { type: String },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

export const Invoice = mongoose.model<IInvoice>('Invoice', InvoiceSchema);