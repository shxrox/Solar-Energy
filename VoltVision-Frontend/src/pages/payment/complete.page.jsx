// import { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router";
// import { useGetSessionStatusQuery } from "@/lib/redux/query";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";

// export default function PaymentCompletePage() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const sessionId = searchParams.get("session_id");

//   // Fetch status from backend
//   const { data, isLoading, isError } = useGetSessionStatusQuery(sessionId, {
//     skip: !sessionId, // Don't run query if no session ID
//   });

//   if (!sessionId) {
//     return <div className="p-8 text-center">Invalid Session</div>;
//   }

//   if (isLoading) {
//     return (
//       <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
//         <Loader2 className="h-12 w-12 animate-spin text-primary" />
//         <p className="text-lg text-muted-foreground">Verifying payment...</p>
//       </div>
//     );
//   }

//   const isSuccess = data?.status === "complete" && data?.paymentStatus === "paid";

//   return (
//     <div className="flex h-[80vh] items-center justify-center p-4">
//       <Card className="max-w-md w-full p-8 text-center space-y-6 shadow-lg">
//         <div className="flex justify-center">
//           {isSuccess ? (
//             <CheckCircle className="h-20 w-20 text-green-500" />
//           ) : (
//             <XCircle className="h-20 w-20 text-red-500" />
//           )}
//         </div>

//         <div className="space-y-2">
//           <h1 className="text-3xl font-bold">
//             {isSuccess ? "Payment Successful!" : "Payment Failed"}
//           </h1>
//           <p className="text-muted-foreground">
//             {isSuccess
//               ? `Thank you! Your payment of $${(data?.amountTotal / 100).toFixed(2)} has been processed.`
//               : "Something went wrong with your payment. Please try again."}
//           </p>
//         </div>

//         <div className="pt-4">
//           <Button 
//             className="w-full gap-2 h-12 text-lg" 
//             onClick={() => navigate("/dashboard/invoices")}
//           >
//             Return to Invoices <ArrowRight className="w-4 h-4" />
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }

import { useSearchParams, useNavigate } from "react-router";
import { useGetSessionStatusQuery } from "@/lib/redux/query";
import { CheckCircle, XCircle, Loader2, ArrowRight, AlertCircle } from "lucide-react";

export default function PaymentCompletePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  // Fetch status from backend
  const { data, isLoading, isError } = useGetSessionStatusQuery(sessionId, {
    skip: !sessionId, // Don't run query if no session ID
  });

  // --- INVALID SESSION STATE ---
  if (!sessionId) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <div className="p-4 rounded-full bg-red-500/10 text-red-600 mb-4">
            <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold">Invalid Session</h2>
        <p className="opacity-70 mt-2">No payment session found. Please return to invoices.</p>
        <button 
            onClick={() => navigate("/dashboard/invoices")}
            className="mt-6 px-6 py-2 rounded-lg border hover:bg-current/10 transition-colors font-medium text-sm"
        >
            Return to Dashboard
        </button>
      </div>
    );
  }

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin opacity-50" />
        <p className="text-lg font-medium opacity-70">Verifying payment...</p>
      </div>
    );
  }

  const isSuccess = data?.status === "complete" && data?.paymentStatus === "paid";

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in duration-300">
      
      {/* Main Card Container */}
      <div className="max-w-md w-full p-8 text-center space-y-8 rounded-2xl border shadow-xl backdrop-blur-sm bg-opacity-50">
        
        {/* Status Icon */}
        <div className="flex justify-center">
          <div className={`p-4 rounded-full ${isSuccess ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
            {isSuccess ? (
                <CheckCircle className="h-16 w-16 text-green-600" />
            ) : (
                <XCircle className="h-16 w-16 text-red-600" />
            )}
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight">
            {isSuccess ? "Payment Successful!" : "Payment Failed"}
          </h1>
          <p className="opacity-70 text-lg leading-relaxed">
            {isSuccess
              ? `Thank you! Your payment of $${(data?.amountTotal / 100).toFixed(2)} has been processed successfully.`
              : "Something went wrong with your payment. Please try again or contact support."}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button 
            className={`w-full flex items-center justify-center gap-2 h-12 text-lg font-bold rounded-xl text-white transition-all hover:scale-[1.02] active:scale-[0.98] ${
                isSuccess ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/20' : 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/20'
            }`}
            onClick={() => navigate("/dashboard/invoices")}
          >
            Return to Invoices <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Link */}
        {isSuccess && (
            <p className="text-xs opacity-50">
                A receipt has been sent to your email.
            </p>
        )}
      </div>
    </div>
  );
}
