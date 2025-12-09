

import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useAuth } from "@clerk/clerk-react";

// Initialize Stripe with your Public Key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutForm({ invoiceId }) {
  const { getToken } = useAuth();

  const fetchClientSecret = useCallback(async () => {
    try {
      const token = await getToken();
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

      console.log(`Creating payment session for invoice: ${invoiceId}`);

      const response = await fetch(
        `${baseUrl}/payments/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ invoiceId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Backend Error Response:", data);
        throw new Error(data.message || "Failed to create checkout session");
      }

      if (!data.clientSecret) {
        console.error("Missing clientSecret in response:", data);
        throw new Error("Invalid response from server");
      }

      return data.clientSecret;
    } catch (error) {
      console.error("Payment setup error:", error);
      throw error;
    }
  }, [invoiceId, getToken]);

  return (
    <div id="checkout" className="w-full max-w-4xl mx-auto my-8 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border shadow-xl min-h-[500px]">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout className="h-full w-full" />
      </EmbeddedCheckoutProvider>
    </div>
  );
}