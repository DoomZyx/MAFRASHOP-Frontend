import { useState, useEffect } from "react";
import { useCheckout } from "./useCheckout";

export const useCheckoutSuccess = (sessionId: string | null) => {
  const { checkSessionStatus } = useCheckout();
  const [sessionStatus, setSessionStatus] = useState<any>(null);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    if (sessionId) {
      verifySession();
    } else {
      setVerifying(false);
    }
  }, [sessionId]);

  const verifySession = async () => {
    try {
      const response = await checkSessionStatus(sessionId!);
      setSessionStatus(response.data);
      setVerifying(false);
    } catch (error) {
      setVerifying(false);
    }
  };

  return {
    sessionStatus,
    verifying,
  };
};
