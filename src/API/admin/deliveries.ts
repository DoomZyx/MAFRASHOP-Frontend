import { API_BASE_URL } from "../config";

export interface AdminDeliveryOrder {
  id: string;
  userId: string;
  status: string;
  totalAmount: number;
  shippingAddress?: {
    name?: string;
    line1?: string;
    line2?: string;
    postal_code?: string;
    city?: string;
    country?: string;
  } | null;
  userFirstName?: string;
  userLastName?: string;
  userEmail?: string;
}

/** Adresse de livraison calculée côté backend : particulier = adresse perso, pro = adresse pro */
export interface AdminDeliveryAddress {
  name?: string;
  line1?: string;
  line2?: string | null;
  postal_code?: string;
  city?: string;
  country?: string;
}

export interface AdminDelivery {
  id: string;
  orderId: string;
  status: string;
  trackingNumber?: string | null;
  carrier?: string | null;
  estimatedDeliveryDate?: string | null;
  actualDeliveryDate?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  order: AdminDeliveryOrder | null;
  /** Adresse de livraison (particulier = perso, pro = adresse pro) */
  deliveryAddress?: AdminDeliveryAddress | null;
  /** Téléphone du client (perso ou société) */
  clientPhone?: string | null;
}

/**
 * API admin pour les livraisons (page livreur)
 */
export const adminDeliveriesAPI = {
  getDeliveries: async (): Promise<{
    success: boolean;
    data: { deliveries: AdminDelivery[] };
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");
    const response = await fetch(`${API_BASE_URL}/api/admin/deliveries`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Erreur lors de la récupération des livraisons");
    }
    return response.json();
  },

  updateStatus: async (
    id: string,
    status: string
  ): Promise<{ success: boolean; message: string; data: { delivery: AdminDelivery } }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");
    const response = await fetch(`${API_BASE_URL}/api/admin/deliveries/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Erreur lors de la mise à jour du statut");
    }
    return response.json();
  },
};
