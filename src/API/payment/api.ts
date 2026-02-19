import { API_BASE_URL, API_CREDENTIALS } from "../config";

export interface CheckoutSessionResponse {
  success: boolean;
  data: {
    sessionId: string;
    url: string;
    orderId: string;
  };
}

export interface SessionStatusResponse {
  success: boolean;
  data: {
    session: {
      id: string;
      status: string;
      customerEmail: string;
    };
    order: {
      id: string;
      status: string;
      totalAmount: number;
    } | null;
    processing?: boolean;
    message?: string;
  };
}

export const createCheckoutSession = async (
  shippingAddress?: any
): Promise<CheckoutSessionResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/payment/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      shippingAddress: shippingAddress || null,
    }),
    ...API_CREDENTIALS,
  });

  if (!response.ok) {
    const error = await response.json();
    const errorWithData = new Error(error.message || "Erreur lors de la création de la session");
    (errorWithData as any).data = error;
    (errorWithData as any).response = { data: error };
    throw errorWithData;
  }

  return response.json();
};

export const getSessionStatus = async (
  sessionId: string
): Promise<SessionStatusResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/payment/session/${sessionId}`, {
    method: "GET",
    ...API_CREDENTIALS,
  });

  if (!response.ok && response.status !== 202) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Erreur lors de la récupération de la session");
  }

  const data = await response.json();
  return data;
};

