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
      const maxAttempts = 10;
      const retryDelayMs = 2000;
      let attempt = 0;
      let latestStatus: any = null;

      while (attempt < maxAttempts) {
        const response = await checkSessionStatus(sessionId!);
        latestStatus = response.data;
        setSessionStatus(latestStatus);

        if (!latestStatus?.processing) {
          break;
        }

        attempt += 1;
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
        }
      }

      // Toujours garder la dernière réponse (même si encore en processing)
      setSessionStatus(latestStatus);
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
