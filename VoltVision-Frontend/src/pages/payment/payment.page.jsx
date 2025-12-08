import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock } from "lucide-react";
import CheckoutForm from "./CheckoutForm";

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Navigation */}
      <Button 
        variant="ghost" 
        onClick={() => navigate("/dashboard/invoices")}
        className="gap-2 pl-0 hover:pl-2 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Invoices
      </Button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <Lock className="w-8 h-8 text-green-600" />
          Secure Payment
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Complete your invoice payment securely via Stripe.
        </p>
      </div>

      {/* Stripe Payment Element */}
      <div className="mt-8">
        {/* We pass the Invoice ID from the URL to the form */}
        <CheckoutForm invoiceId={id} />
      </div>
    </div>
  );
}