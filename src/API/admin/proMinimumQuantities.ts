import { API_BASE_URL } from "../config";

const getHeaders = () => ({ "Content-Type": "application/json" });

export interface ProMinimumQuantityRule {
  id: string;
  productId: string;
  minimumQuantity: number;
  productName?: string;
  productRef?: string;
  createdAt: string;
  updatedAt: string;
}

export const proMinimumQuantitiesAPI = {
  /**
   * Récupérer toutes les règles de quantité minimale
   */
  getAll: async (): Promise<{
    success: boolean;
    data: { rules: ProMinimumQuantityRule[] };
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/api/admin/pro-minimum-quantities`, {
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la récupération des règles");
    }

    return response.json();
  },

  /**
   * Récupérer la règle pour un produit spécifique
   */
  getByProductId: async (productId: string): Promise<{
    success: boolean;
    data: { rule: ProMinimumQuantityRule | null };
  }> => {
    const allRules = await proMinimumQuantitiesAPI.getAll();
    const rule = allRules.data.rules.find((r) => r.productId === productId);
    return {
      success: true,
      data: { rule: rule || null },
    };
  },

  /**
   * Créer une nouvelle règle
   */
  create: async (
    productId: string,
    minimumQuantity: number
  ): Promise<{
    success: boolean;
    message: string;
    data: { rule: ProMinimumQuantityRule };
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/api/admin/pro-minimum-quantities`, {
      method: "POST",
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, minimumQuantity }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la création de la règle");
    }

    return response.json();
  },

  /**
   * Mettre à jour une règle
   */
  update: async (
    ruleId: string,
    productId: string,
    minimumQuantity: number
  ): Promise<{
    success: boolean;
    message: string;
    data: { rule: ProMinimumQuantityRule };
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(
      `${API_BASE_URL}/api/admin/pro-minimum-quantities/${ruleId}`,
      {
        method: "PUT",
        headers: {
          ...getHeaders(),
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, minimumQuantity }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la mise à jour de la règle");
    }

    return response.json();
  },

  /**
   * Supprimer une règle
   */
  delete: async (ruleId: string): Promise<{
    success: boolean;
    message: string;
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(
      `${API_BASE_URL}/api/admin/pro-minimum-quantities/${ruleId}`,
      {
        method: "DELETE",
        headers: {
          ...getHeaders(),
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la suppression de la règle");
    }

    return response.json();
  },
};

