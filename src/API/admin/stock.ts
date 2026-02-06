const API_BASE_URL = import.meta.env.VITE_API_URL || `${window.location.origin}/api`;
import { StockProduct, StockMovement, StockHistoryResponse } from "../../types/stock";

/**
 * API pour la gestion des stocks (admin seulement)
 */
export const adminStockAPI = {
  /**
   * Récupérer tous les produits avec leur stock
   */
  getAllProductsStock: async (): Promise<{
    success: boolean;
    data: { products: StockProduct[] };
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/admin/stock/products`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la récupération du stock");
    }

    return response.json();
  },

  /**
   * Récupérer les produits en stock faible
   */
  getLowStockProducts: async (): Promise<{
    success: boolean;
    data: { products: StockProduct[] };
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/admin/stock/products/low`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la récupération des produits en stock faible");
    }

    return response.json();
  },

  /**
   * Mettre à jour le stock d'un produit
   */
  updateProductStock: async (
    productId: string,
    data: {
      quantity: number;
      movementType?: "entry" | "exit" | "adjustment" | "sale" | "return";
      reason?: string;
    }
  ): Promise<{
    success: boolean;
    message: string;
    data: {
      product: StockProduct;
      movement: StockMovement;
    };
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/admin/stock/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la mise à jour du stock");
    }

    return response.json();
  },

  /**
   * Mettre à jour le seuil d'alerte de stock
   */
  updateStockAlertThreshold: async (
    productId: string,
    stockAlertThreshold: number
  ): Promise<{
    success: boolean;
    message: string;
    data: { product: StockProduct };
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(
      `${API_BASE_URL}/admin/stock/products/${productId}/alert-threshold`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stockAlertThreshold }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la mise à jour du seuil d'alerte");
    }

    return response.json();
  },

  /**
   * Récupérer l'historique des mouvements de stock
   */
  getStockHistory: async (
    productId?: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<StockHistoryResponse> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });

    if (productId) {
      params.append("productId", productId);
    }

    const response = await fetch(
      `${API_BASE_URL}/admin/stock/history?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la récupération de l'historique");
    }

    return response.json();
  },
};

