import { API_BASE_URL, API_CREDENTIALS } from "../config";

const getHeaders = () => ({ "Content-Type": "application/json" });

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productName?: string;
  productRef?: string;
  productImage?: string;
  productCategory?: string;
}

export interface Delivery {
  id: string;
  orderId: string;
  status: "pending" | "preparing" | "shipped" | "in_transit" | "delivered" | "failed";
  trackingNumber: string | null;
  carrier: string | null;
  estimatedDeliveryDate: string | null;
  actualDeliveryDate: string | null;
  scheduledDeliveryDateTime: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  stripePaymentIntentId: string | null;
  stripeSessionId: string | null;
  status: "pending" | "paid" | "failed" | "cancelled" | "refunded" | "shipped" | "preparing";
  totalAmount: number;
  expectedAmount: number | null;
  deliveryFee?: number;
  isPro: boolean;
  shippingAddress: any;
  billingAddress: any;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
  delivery?: Delivery | null;
  // Informations utilisateur (pour admin)
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
}

export const ordersAPI = {
  getUserOrders: async (): Promise<{
    success: boolean;
    data: { orders: Order[] };
  }> => {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      headers: getHeaders(),
      ...API_CREDENTIALS,
    });
    return response.json();
  },

  getOrderById: async (id: string): Promise<{
    success: boolean;
    data: { order: Order };
  }> => {
    const response = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
      headers: getHeaders(),
      ...API_CREDENTIALS,
    });
    return response.json();
  },

  downloadInvoice: async (orderId: string): Promise<Blob> => {
    const response = await fetch(
      `${API_BASE_URL}/api/invoices/${orderId}/download`,
      { ...API_CREDENTIALS }
    );

    if (!response.ok) {
      throw new Error("Erreur lors du téléchargement de la facture");
    }

    return response.blob();
  },
};

