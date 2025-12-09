import { useGetMyInvoicesQuery } from "@/lib/redux/query";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { FileText, Zap, CreditCard, CheckCircle } from "lucide-react";

export default function InvoicesPage() {
  const navigate = useNavigate();
  const { data: invoices, isLoading, isError } = useGetMyInvoicesQuery();

  if (isLoading) {
    return <div className="p-8 text-center opacity-60">Loading invoices...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-red-500">Failed to load invoices.</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing Statements</h1>
        <p className="opacity-70 mt-1">Your monthly energy billing history</p>
      </div>

      {/* Empty State */}
      {(!invoices || invoices.length === 0) ? (
        <div className="border border-dashed p-16 rounded-xl text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <h3 className="text-lg font-semibold">No Bills Generated</h3>
          <p className="opacity-60">Your bills will appear here after usage.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {invoices.map((invoice) => {
            const amount = (invoice.totalEnergyGenerated * 0.05).toFixed(2);

            return (
              <div
                key={invoice._id}
                className="border rounded-xl p-6 shadow-sm flex flex-col gap-6"
              >

                {/* Top Bill Header */}
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold tracking-wide">
                      Billing Statement
                    </h3>
                    <p className="text-sm opacity-60">
                      Invoice ID: #{invoice._id.slice(-6).toUpperCase()}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    {invoice.paymentStatus === "PAID" ? (
                      <div className="flex items-center gap-2 text-green-600 font-medium">
                        <CheckCircle className="w-5 h-5" />
                        Paid
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-blue-600 font-medium">
                        <FileText className="w-5 h-5" />
                        Pending Payment
                      </div>
                    )}
                  </div>
                </div>

                {/* Billing Period */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="opacity-60">From</p>
                    <p className="font-medium">
                      {format(new Date(invoice.billingPeriodStart), "MMM d, yyyy")}
                    </p>
                  </div>

                  <div>
                    <p className="opacity-60">To</p>
                    <p className="font-medium">
                      {format(new Date(invoice.billingPeriodEnd), "MMM d, yyyy")}
                    </p>
                  </div>

                  <div>
                    <p className="opacity-60 flex items-center gap-1">
                      <Zap className="w-4 h-4" /> Energy Used
                    </p>
                    <p className="font-medium">
                      {invoice.totalEnergyGenerated.toFixed(1)} kWh
                    </p>
                  </div>

                  <div>
                    <p className="opacity-60">Rate</p>
                    <p className="font-medium">$0.05 / kWh</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
                  
                  {/* Amount */}
                  <div>
                    <p className="text-sm opacity-60">Total Amount</p>
                    <p className="text-2xl font-bold">${amount}</p>
                  </div>

                  {/* Action */}
                  <div>
                    {invoice.paymentStatus === "PENDING" ? (
                      <button
                        onClick={() => navigate(`/dashboard/payment/${invoice._id}`)}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
                      >
                        <CreditCard className="w-4 h-4" />
                        Pay Now
                      </button>
                    ) : (
                      <div className="px-4 py-2 rounded-full border text-green-600 border-green-200 text-sm font-medium">
                        Paid on{" "}
                        {invoice.paidAt
                          ? format(new Date(invoice.paidAt), "MMM d, yyyy")
                          : "—"}
                      </div>
                    )}
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
