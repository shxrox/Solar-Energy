import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Lock, ShieldCheck, CreditCard } from "lucide-react";
import CheckoutForm from "./CheckoutForm";

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in duration-300">
      
      {/* Navigation - Top Left */}
      <div className="w-full max-w-2xl mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard/invoices")}
          className="gap-2 pl-0 hover:pl-2 transition-all text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel & Return
        </Button>
      </div>

      {/* Main Payment Card */}
      <Card className="w-full max-w-2xl shadow-xl border-t-4 border-t-primary overflow-hidden">
        
        {/* Secure Header */}
        <CardHeader className="bg-muted/30 border-b border-border/50 text-center pb-8 pt-8">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4 text-primary">
            <Lock className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold">Secure Checkout</CardTitle>
          <CardDescription className="text-base">
            Completing payment for Invoice <span className="font-mono font-medium text-foreground">#{id?.slice(-6).toUpperCase()}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {/* Trust Badges */}
          <div className="bg-muted/10 py-2 px-6 flex justify-center gap-6 border-b border-border/50 text-xs font-medium text-muted-foreground">
             <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span>256-bit SSL Encrypted</span>
             </div>
             <div className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                <span>Powered by Stripe</span>
             </div>
          </div>

          {/* The Stripe Element */}
          <div className="p-6 md:p-8 min-h-[300px]">
             <CheckoutForm invoiceId={id} />
          </div>
        </CardContent>
        
      </Card>

      {/* Footer Note */}
      <p className="mt-6 text-center text-xs text-muted-foreground max-w-sm">
        Your payment information is processed securely. We do not store your credit card details on our servers.
      </p>

    </div>
  );
}