import { useState, useEffect } from "react";
import { adminOrdersAPI } from "../API/admin/orders";
import { Order } from "../API/orders/api";

export const useAdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await adminOrdersAPI.getAllOrders(statusFilter);
      setOrders(response.data.orders);
    } catch (error: any) {
      console.error("Erreur:", error);
      alert("Erreur lors du chargement des commandes");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir changer le statut à "${newStatus}" ?`)) {
      return;
    }

    setUpdatingStatus(orderId);
    try {
      const response = await adminOrdersAPI.updateOrderStatus(orderId, newStatus);
      await loadOrders();

      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(response.data.order);
      }
    } catch (error: any) {
      alert(error.message || "Erreur lors de la mise à jour du statut");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const formatCurrency = (amount: number, isPro: boolean) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateTVA = (totalAmountTTC: number) => {
    return (totalAmountTTC / 1.2) * 0.2;
  };

  const calculateHT = (totalAmountTTC: number) => {
    return totalAmountTTC / 1.2;
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "paid":
        return "status-paid";
      case "pending":
        return "status-pending";
      case "failed":
        return "status-failed";
      case "cancelled":
        return "status-cancelled";
      case "refunded":
        return "status-refunded";
      case "preparing":
        return "status-preparing";
      case "shipped":
        return "status-shipped";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "En attente",
      paid: "Payée",
      failed: "Échouée",
      cancelled: "Annulée",
      refunded: "Remboursée",
      preparing: "En préparation",
      shipped: "Expédiée",
    };
    return labels[status] || status;
  };

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    paid: orders.filter((o) => o.status === "paid").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    failed: orders.filter((o) => o.status === "failed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    refunded: orders.filter((o) => o.status === "refunded").length,
  };

  return {
    orders,
    loading,
    selectedOrder,
    setSelectedOrder,
    statusFilter,
    setStatusFilter,
    updatingStatus,
    statusCounts,
    handleStatusChange,
    formatCurrency,
    formatDate,
    calculateTVA,
    calculateHT,
    getStatusBadgeClass,
    getStatusLabel,
  };
};
