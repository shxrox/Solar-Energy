import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useGetSessionStatusQuery } from "@/lib/redux/query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";

export default function PaymentCompletePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  // Fetch status from backend
  const { data, isLoading, isError } = useGetSessionStatusQuery(sessionId, {
    skip: !sessionId, // Don't run query if no session ID
  });

  if (!sessionId) {
    return <div className="p-8 text-center">Invalid Session</div>;
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">Verifying payment...</p>
      </div>
    );
  }

  const isSuccess = data?.status === "complete" && data?.paymentStatus === "paid";

  return (
    <div className="flex h-[80vh] items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6 shadow-lg">
        <div className="flex justify-center">
          {isSuccess ? (
            <CheckCircle className="h-20 w-20 text-green-500" />
          ) : (
            <XCircle className="h-20 w-20 text-red-500" />
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            {isSuccess ? "Payment Successful!" : "Payment Failed"}
          </h1>
          <p className="text-muted-foreground">
            {isSuccess
              ? `Thank you! Your payment of $${(data?.amountTotal / 100).toFixed(2)} has been processed.`
              : "Something went wrong with your payment. Please try again."}
          </p>
        </div>

        <div className="pt-4">
          <Button 
            className="w-full gap-2 h-12 text-lg" 
            onClick={() => navigate("/dashboard/invoices")}
          >
            Return to Invoices <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}