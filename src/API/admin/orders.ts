import { API_BASE_URL } from "../config";
import { Order } from "../orders/api";

/**
 * API pour la gestion des commandes (admin seulement)
 */
export const adminOrdersAPI = {
  /**
   * Récupérer toutes les commandes avec filtres
   */
  getAllOrders: async (status?: string): Promise<{
    success: boolean;
    data: { orders: Order[] };
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const params = new URLSearchParams();
    if (status && status !== "all") {
      params.append("status", status);
    }

    const response = await fetch(
      `${API_BASE_URL}/api/admin/orders${params.toString() ? `?${params.toString()}` : ""}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la récupération des commandes");
    }

    return response.json();
  },

  /**
   * Récupérer une commande par ID
   */
  getOrderById: async (id: string): Promise<{
    success: boolean;
    data: { order: Order };
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/api/admin/orders/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la récupération de la commande");
    }

    return response.json();
  },

  /**
   * Mettre à jour le statut d'une commande
   */
  updateOrderStatus: async (
    orderId: string,
    status: string
  ): Promise<{
    success: boolean;
    message: string;
    data: { order: Order };
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la mise à jour du statut");
    }

    return response.json();
  },
};

