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

export interface FavoriteItem {
  productId: Product;
  addedAt: string;
}

export const favoritesAPI = {
  getFavorites: async (): Promise<{
    success: boolean;
    data: { favorites: FavoriteItem[] };
  }> => {
    const response = await fetch(`${API_BASE_URL}/api/favorites`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  addToFavorites: async (productId: string): Promise<{
    success: boolean;
    message: string;
    data?: { favorites: FavoriteItem[] };
  }> => {
    const response = await fetch(`${API_BASE_URL}/api/favorites`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId }),
    });
    return response.json();
  },

  removeFromFavorites: async (productId: string): Promise<{
    success: boolean;
    message: string;
    data?: { favorites: FavoriteItem[] };
  }> => {
    const response = await fetch(`${API_BASE_URL}/api/favorites/${productId}`, {
      method: "DELETE",
      headers: getAuthHeaders(undefined, false), // Pas de Content-Type pour DELETE sans body
    });
    return response.json();
  },
};

