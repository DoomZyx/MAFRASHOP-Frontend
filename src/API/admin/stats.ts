import { API_BASE_URL } from "../config";
import { StatsResponse } from "../../types/stats";

export interface DashboardStatsResponse {
  success: boolean;
  data: {
    ordersThisMonth: number;
    pendingDeliveries: number;
  };
}

/**
 * API pour les statistiques (admin seulement)
 */
export const adminStatsAPI = {
  /**
   * Stats dashboard : commandes du mois en cours, livraisons en attente (non livrées)
   */
  getDashboardStats: async (): Promise<DashboardStatsResponse> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");
    const response = await fetch(`${API_BASE_URL}/api/admin/stats/dashboard`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la récupération des statistiques dashboard");
    }
    return response.json();
  },

  /**
   * Récupérer toutes les statistiques
   */
  getAllStats: async (period: string = "all"): Promise<StatsResponse> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/api/admin/stats?period=${period}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la récupération des statistiques");
    }

    return response.json();
  },

  /**
   * Exporter les statistiques en CSV
   */
  exportStatsCSV: async (type: "orders" | "products" | "clients"): Promise<Blob> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/api/admin/stats/export?type=${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de l'export CSV");
    }

    return response.blob();
  },
};

