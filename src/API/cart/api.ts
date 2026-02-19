import { API_BASE_URL, API_CREDENTIALS } from "../config";
import { Product } from "../../types/product";

const getHeaders = (includeContentType = true) => {
  const headers: Record<string, string> = {};
  if (includeContentType) headers["Content-Type"] = "application/json";
  return headers;
};

export interface CartItem {
  productId: Product;
  quantity: number;
  addedAt: string;
}

export interface PerfumeValidation {
  isValid: boolean;
  totalCount: number;
  missing: number;
  message: string | null;
  minimumRequired: number;
}

export const cartAPI = {
  getCart: async (): Promise<{
    success: boolean;
    data: {
      cart: CartItem[];
      perfumeValidation?: PerfumeValidation;
    };
  }> => {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      headers: getHeaders(),
      ...API_CREDENTIALS,
    });
    return response.json();
  },

  addToCart: async (productId: string, quantity: number = 1): Promise<{
    success: boolean;
    message: string;
    data?: { cart: CartItem[] };
  }> => {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ productId, quantity }),
      ...API_CREDENTIALS,
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
    const response = await fetch(`${API_BASE_URL}/api/cart/${productId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ quantity }),
      ...API_CREDENTIALS,
    });
    return response.json();
  },

  removeFromCart: async (productId: string): Promise<{
    success: boolean;
    message: string;
    data?: { cart: CartItem[] };
  }> => {
    const response = await fetch(`${API_BASE_URL}/api/cart/${productId}`, {
      method: "DELETE",
      headers: getHeaders(false),
      ...API_CREDENTIALS,
    });
    return response.json();
  },

  clearCart: async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "DELETE",
      headers: getHeaders(false),
      ...API_CREDENTIALS,
    });
    return response.json();
  },
};

