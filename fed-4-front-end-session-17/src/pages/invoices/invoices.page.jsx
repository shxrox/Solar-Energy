import { useGetMyInvoicesQuery } from "@/lib/redux/query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { FileText, Zap, CreditCard, CheckCircle, AlertCircle } from "lucide-react";

export default function InvoicesPage() {
  const navigate = useNavigate();
  const { data: invoices, isLoading, isError } = useGetMyInvoicesQuery();

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading invoices...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-red-500">Failed to load invoices.</div>;
  }

  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Billing & Invoices</h1>
        <p className="text-muted-foreground mt-1">
          Manage your payments and view your energy generation history.
        </p>
      </div>

      {(!invoices || invoices.length === 0) ? (
        <Card className="border-dashed p-12 text-center bg-muted/20">
          <div className="flex flex-col items-center">
            <FileText className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No Invoices Yet</h3>
            <p className="text-muted-foreground">
              Invoices are generated monthly based on your solar generation.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {invoices.map((invoice) => (
            <Card key={invoice._id} className="overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Invoice Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-full ${
                    invoice.paymentStatus === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {invoice.paymentStatus === 'PAID' ? <CheckCircle className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Invoice #{invoice._id.slice(-6).toUpperCase()}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(invoice.billingPeriodStart), "MMM d")} - {format(new Date(invoice.billingPeriodEnd), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>

                {/* Energy & Amount */}
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                      <Zap className="w-3 h-3" /> Usage
                    </p>
                    <p className="font-medium">{invoice.totalEnergyGenerated.toFixed(1)} kWh</p>
                  </div>
                  
                  <div className="text-right min-w-[100px]">
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-xl font-bold">
                      {/* Assuming rate is $0.05 per kWh as set in Stripe */}
                      ${(invoice.totalEnergyGenerated * 0.05).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex items-center gap-4 min-w-[140px] justify-end">
                  {invoice.paymentStatus === "PENDING" ? (
                    <Button 
                      onClick={() => navigate(`/dashboard/payment/${invoice._id}`)}
                      className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <CreditCard className="w-4 h-4" /> Pay Now
                    </Button>
                  ) : (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                      Paid on {invoice.paidAt ? format(new Date(invoice.paidAt), "MMM d") : "Unknown"}
                    </Badge>
                  )}
                </div>

              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}