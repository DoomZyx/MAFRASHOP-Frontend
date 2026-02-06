import { API_BASE_URL } from "../config";
import { Product } from "../../types/product";

const getAuthHeaders = (token?: string, includeContentType: boolean = true) => {
  const headers: Record<string, string> = {};

  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }

  const authToken = token || localStorage.getItem("authToken");
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return headers;
};

export interface CartItem {
  productId: Product;
  quantity: number;
  addedAt: string;
}

export const cartAPI = {
  getCart: async (): Promise<{
    success: boolean;
    data: { cart: CartItem[] };
  }> => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  addToCart: async (productId: string, quantity: number = 1): Promise<{
    success: boolean;
    message: string;
    data?: { cart: CartItem[] };
  }> => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, quantity }),
    });
    return response.json();
  },

  updateCartItem: async (
    productId: string,
    quantity: number
  ): Promise<{
    success: boolean;
    message: string;
    data?: { cart: CartItem[] };
  }> => {
    const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ quantity }),
    });
    return response.json();
  },

  removeFromCart: async (productId: string): Promise<{
    success: boolean;
    message: string;
    data?: { cart: CartItem[] };
  }> => {
    const response = await fetch(`${API_BASE_URL}/cart/${productId}`, {
      method: "DELETE",
      headers: getAuthHeaders(undefined, false), // Pas de Content-Type pour DELETE sans body
    });
    return response.json();
  },

  clearCart: async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "DELETE",
      headers: getAuthHeaders(undefined, false), // Pas de Content-Type pour DELETE sans body
    });
    return response.json();
  },
};

