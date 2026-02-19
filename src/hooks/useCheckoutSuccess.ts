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
    const maxRetries = 5;
    const delayMs = 2000;

    const attempt = async (retryCount: number): Promise<void> => {
      try {
        const response = await checkSessionStatus(sessionId!);
        if (response.data?.processing && retryCount < maxRetries) {
          setTimeout(() => attempt(retryCount + 1), delayMs);
          return;
        }
        setSessionStatus(response.data);
        setVerifying(false);
      } catch {
        setVerifying(false);
      }
    };

    attempt(0);
  };

  return {
    sessionStatus,
    verifying,
  };
};
