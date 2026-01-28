import { API_BASE_URL } from "../config";
import { StatsResponse } from "../../types/stats";

/**
 * API pour les statistiques (admin seulement)
 */
export const adminStatsAPI = {
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

