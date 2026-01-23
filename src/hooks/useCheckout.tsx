import { useState } from "react";
import { createCheckoutSession, getSessionStatus } from "../API/payment/api";

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (shippingAddress?: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createCheckoutSession(shippingAddress);
      
      if (response.success && response.data.url) {
        // Rediriger vers Stripe Checkout
        window.location.href = response.data.url;
      } else {
        throw new Error("Erreur lors de la création de la session de paiement");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
      setLoading(false);
      throw err;
    }
  };

  const checkSessionStatus = async (sessionId: string) => {
    try {
      const response = await getSessionStatus(sessionId);
      return response;
    } catch (err: any) {
      throw new Error(err.message || "Erreur lors de la vérification de la session");
    }
  };

  return {
    handleCheckout,
    checkSessionStatus,
    loading,
    error,
  };
};

