import { useState } from "react";
import { ordersAPI } from "../API/orders/api";

export const useOrdersPage = () => {
  const [downloadingInvoice, setDownloadingInvoice] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const getStatusLabel = (status: string): string => {
    const statusLabels: Record<string, string> = {
      pending: "En attente",
      paid: "Payée",
      failed: "Échouée",
      cancelled: "Annulée",
      refunded: "Remboursée",
    };
    return statusLabels[status] || status;
  };

  const getStatusClass = (status: string): string => {
    const statusClasses: Record<string, string> = {
      pending: "orders-status-pending",
      paid: "orders-status-paid",
      failed: "orders-status-failed",
      cancelled: "orders-status-cancelled",
      refunded: "orders-status-refunded",
    };
    return statusClasses[status] || "";
  };

  const getDeliveryStatusLabel = (status: string): string => {
    const statusLabels: Record<string, string> = {
      pending: "En attente",
      preparing: "En préparation",
      shipped: "Expédiée",
      in_transit: "En transit",
      delivered: "Livrée",
      failed: "Échec",
    };
    return statusLabels[status] || status;
  };

  const getDeliveryStatusClass = (status: string): string => {
    const statusClasses: Record<string, string> = {
      pending: "delivery-status-pending",
      preparing: "delivery-status-preparing",
      shipped: "delivery-status-shipped",
      in_transit: "delivery-status-in-transit",
      delivered: "delivery-status-delivered",
      failed: "delivery-status-failed",
    };
    return statusClasses[status] || "";
  };

  const toggleOrderExpanded = (orderId: string): void => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const isOrderExpanded = (orderId: string): boolean => {
    return expandedOrders.has(orderId);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const handleDownloadInvoice = async (orderId: string): Promise<void> => {
    try {
      setDownloadingInvoice(orderId);
      const blob = await ordersAPI.downloadInvoice(orderId);
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `facture-${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Erreur lors du téléchargement de la facture");
    } finally {
      setDownloadingInvoice(null);
    }
  };

  return {
    downloadingInvoice,
    expandedOrders,
    getStatusLabel,
    getStatusClass,
    getDeliveryStatusLabel,
    getDeliveryStatusClass,
    toggleOrderExpanded,
    isOrderExpanded,
    formatDate,
    formatPrice,
    handleDownloadInvoice,
  };
};
