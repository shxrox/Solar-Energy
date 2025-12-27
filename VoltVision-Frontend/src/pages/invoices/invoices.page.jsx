
import { useGetMyInvoicesQuery } from "@/lib/redux/query";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { FileText, Zap, CreditCard, CheckCircle, Loader2 } from "lucide-react";

export default function InvoicesPage() {
  const navigate = useNavigate();
  const { data: invoices, isLoading, isError } = useGetMyInvoicesQuery();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="animate-pulse text-sm font-medium text-base-content/60">Loading billing history...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 flex justify-center">
        <div className="alert alert-error shadow-sm max-w-lg">
          <span className="font-medium">Failed to load invoices. Please check your connection.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-base-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-base-content flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" />
          Billing Statements
        </h1>
        <p className="text-base-content/60 text-lg">Your monthly energy usage and payment history.</p>
      </div>

      {/* Empty State */}
      {(!invoices || invoices.length === 0) ? (
        <div className="flex flex-col items-center justify-center p-16 border-2 border-dashed border-base-200 rounded-2xl text-center bg-base-100">
          <div className="p-4 bg-base-200 rounded-full mb-4">
            <FileText className="w-8 h-8 text-base-content/40" />
          </div>
          <h3 className="text-xl font-bold text-base-content">No Bills Generated</h3>
          <p className="text-base-content/60 mt-1">Your monthly bills will appear here once generated.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {invoices.map((invoice) => {
            const amount = (invoice.totalEnergyGenerated * 0.05).toFixed(2);

            return (
              <div
                key={invoice._id}
                className="group relative flex flex-col bg-base-100 border border-base-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Status Color Stripe */}
                <div className={`h-1.5 w-full ${
                    invoice.paymentStatus === 'PAID' ? 'bg-success' : 'bg-primary'
                }`}></div>

                <div className="p-6 flex flex-col md:flex-row gap-6 justify-between">
                    
                    {/* Left: Info */}
                    <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-base-content tracking-tight">Statement #{invoice._id.slice(-6).toUpperCase()}</h3>
                                <p className="text-sm text-base-content/50 font-mono mt-1">
                                    Issued: {format(new Date(invoice.createdAt), "MMMM d, yyyy")}
                                </p>
                            </div>
                            
                            {/* Mobile Status Badge */}
                            <div className={`badge md:hidden font-bold ${
                                invoice.paymentStatus === 'PAID' ? 'badge-success badge-outline' : 'badge-primary badge-outline'
                            }`}>
                                {invoice.paymentStatus}
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-8 py-2">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-base-content/40 mb-1">Billing Period</p>
                                <p className="text-sm font-medium text-base-content">
                                    {format(new Date(invoice.billingPeriodStart), "MMM d")} - {format(new Date(invoice.billingPeriodEnd), "MMM d, yyyy")}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-base-content/40 mb-1">Energy Used</p>
                                <div className="flex items-center gap-1 text-sm font-medium text-base-content">
                                    <Zap className="w-3 h-3 text-warning fill-current" />
                                    {invoice.totalEnergyGenerated.toFixed(1)} kWh
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-base-content/40 mb-1">Rate</p>
                                <p className="text-sm font-medium text-base-content">$0.05 / kWh</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Action & Total */}
                    <div className="flex flex-col justify-between items-end gap-6 border-t md:border-t-0 md:border-l border-base-200 pt-4 md:pt-0 md:pl-8 min-w-[200px]">
                        
                        {/* Desktop Status Badge */}
                        <div className={`hidden md:flex badge font-bold ${
                            invoice.paymentStatus === 'PAID' ? 'badge-success badge-outline' : 'badge-primary badge-outline'
                        }`}>
                            {invoice.paymentStatus}
                        </div>

                        <div className="text-right">
                            <p className="text-xs text-base-content/50 uppercase tracking-wide">Total Amount</p>
                            <p className="text-3xl font-black text-base-content">${amount}</p>
                        </div>

                        <div className="w-full">
                            {invoice.paymentStatus === "PENDING" ? (
                                <button
                                    onClick={() => navigate(`/dashboard/payment/${invoice._id}`)}
                                    className="btn btn-primary btn-sm w-full gap-2 shadow-lg shadow-primary/20"
                                >
                                    <CreditCard className="w-4 h-4" />
                                    Pay Now
                                </button>
                            ) : (
                                <div className="flex items-center justify-end gap-2 text-success text-sm font-bold bg-success/10 px-3 py-1.5 rounded-lg w-full">
                                    <CheckCircle className="w-4 h-4" />
                                    Paid on {invoice.paidAt ? format(new Date(invoice.paidAt), "MMM d") : "—"}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}