import { API_BASE_URL } from "../config";

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
  };
}

export const createCheckoutSession = async (
  shippingAddress?: any
): Promise<CheckoutSessionResponse> => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Non authentifié");
  }

  const response = await fetch(`${API_BASE_URL}/payment/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      shippingAddress: shippingAddress || null,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la création de la session");
  }

  return response.json();
};

export const getSessionStatus = async (
  sessionId: string
): Promise<SessionStatusResponse> => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Non authentifié");
  }

  const response = await fetch(`${API_BASE_URL}/payment/session/${sessionId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la récupération de la session");
  }

  return response.json();
};

