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
      fulfillmentType?: "shipping" | "pickup";
    } | null;
  };
}

export type CheckoutFulfillmentType = "shipping" | "pickup";

export const createCheckoutSession = async (options?: {
  shippingAddress?: any;
  fulfillmentType?: CheckoutFulfillmentType;
}): Promise<CheckoutSessionResponse> => {
  const fulfillmentType =
    options?.fulfillmentType === "pickup" ? "pickup" : "shipping";
  const response = await fetch(`${API_BASE_URL}/api/payment/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      shippingAddress: options?.shippingAddress ?? null,
      fulfillmentType,
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

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la récupération de la session");
  }

  return response.json();
};

