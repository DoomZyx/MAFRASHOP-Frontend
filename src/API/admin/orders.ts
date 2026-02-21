import { API_BASE_URL, API_CREDENTIALS } from "../config";
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
    const params = new URLSearchParams();
    if (status && status !== "all") {
      params.append("status", status);
    }

    const response = await fetch(
      `${API_BASE_URL}/api/admin/orders${params.toString() ? `?${params.toString()}` : ""}`,
      {
        headers: { "Content-Type": "application/json" },
        ...API_CREDENTIALS,
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
    const response = await fetch(`${API_BASE_URL}/api/admin/orders/${id}`, {
      headers: { "Content-Type": "application/json" },
      ...API_CREDENTIALS,
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
    const response = await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
      ...API_CREDENTIALS,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la mise à jour du statut");
    }

    return response.json();
  },

  /**
   * Télécharger toutes les factures des commandes payées pour un mois/année (ZIP).
   * Retourne { success, message, data?: { count: 0 } } si aucune facture.
   */
  downloadInvoicesZip: async (
    month: number,
    year: number
  ): Promise<Blob | { success: true; message: string; data: { count: number } }> => {
    const params = new URLSearchParams({ month: String(month), year: String(year) });
    const response = await fetch(`${API_BASE_URL}/api/admin/invoices/export?${params}`, {
      ...API_CREDENTIALS,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Erreur lors de l'export des factures");
    }

    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
      return response.json();
    }

    return response.blob();
  },
};

