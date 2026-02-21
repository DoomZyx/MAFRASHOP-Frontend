import { API_BASE_URL, API_CREDENTIALS } from "../config";
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
    const response = await fetch(`${API_BASE_URL}/api/admin/stock/products`, {
      headers: { "Content-Type": "application/json" },
      ...API_CREDENTIALS,
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
    const response = await fetch(`${API_BASE_URL}/api/admin/stock/products/low`, {
      headers: { "Content-Type": "application/json" },
      ...API_CREDENTIALS,
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
    const response = await fetch(`${API_BASE_URL}/api/admin/stock/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      ...API_CREDENTIALS,
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
    const response = await fetch(
      `${API_BASE_URL}/api/admin/stock/products/${productId}/alert-threshold`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stockAlertThreshold }),
        ...API_CREDENTIALS,
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
    limit: number,
    offset: number,
    productId?: string
  ): Promise<StockHistoryResponse> => {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });
    if (productId) {
      params.append("productId", productId);
    }

    const response = await fetch(
      `${API_BASE_URL}/api/admin/stock/history?${params.toString()}`,
      {
        headers: { "Content-Type": "application/json" },
        ...API_CREDENTIALS,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la récupération de l'historique");
    }

    return response.json();
  },
};

