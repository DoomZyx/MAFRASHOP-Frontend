import { API_BASE_URL, API_CREDENTIALS } from "../config";
import { Product } from "../../types/product";

const getHeaders = (includeContentType = true) => {
  const headers: Record<string, string> = {};
  if (includeContentType) headers["Content-Type"] = "application/json";
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
      headers: getHeaders(),
      ...API_CREDENTIALS,
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
      headers: getHeaders(),
      body: JSON.stringify({ productId }),
      ...API_CREDENTIALS,
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
      headers: getHeaders(false),
      ...API_CREDENTIALS,
    });
    return response.json();
  },
};

