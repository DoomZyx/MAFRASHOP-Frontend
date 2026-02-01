import { useState, useEffect } from "react";
import { adminDeliveriesAPI, AdminDelivery } from "../API/admin/deliveries";

export const useAdminDeliveries = () => {
  const [deliveries, setDeliveries] = useState<AdminDelivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("today");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    try {
      setLoading(true);
      const res = await adminDeliveriesAPI.getDeliveries();
      setDeliveries(res.data.deliveries);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Erreur lors du chargement des livraisons");
    } finally {
      setLoading(false);
    }
  };

  const todayStr = () => new Date().toISOString().split("T")[0];

  const filteredDeliveries = deliveries.filter((d) => {
    if (statusFilter === "today") {
      return d.estimatedDeliveryDate === todayStr() && d.status !== "delivered" && d.status !== "failed";
    }
    if (statusFilter === "all") return true;
    return d.status === statusFilter;
  });

  const updateStatus = async (deliveryId: string, status: string) => {
    setUpdatingId(deliveryId);
    try {
      await adminDeliveriesAPI.updateStatus(deliveryId, status);
      await loadDeliveries();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Erreur lors de la mise à jour");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "En attente",
      preparing: "En préparation",
      shipped: "Expédiée",
      in_transit: "En cours",
      delivered: "Livrée",
      failed: "Échouée",
    };
    return labels[status] || status;
  };

  const getStatusBadgeClass = (status: string) => {
    const map: Record<string, string> = {
      pending: "status-pending",
      preparing: "status-preparing",
      shipped: "status-shipped",
      in_transit: "status-in-transit",
      delivered: "status-delivered",
      failed: "status-failed",
    };
    return map[status] || "";
  };

  const formatAddress = (d: AdminDelivery) => {
    const a = d.deliveryAddress ?? d.order?.shippingAddress;
    if (!a) return "Adresse non renseignée";
    const parts = [
      a.name,
      a.line1,
      a.line2,
      a.postal_code && a.city ? `${a.postal_code} ${a.city}` : a.city,
      a.country,
    ].filter(Boolean);
    return parts.join(", ") || "Adresse non renseignée";
  };

  const countToday = deliveries.filter(
    (d) => d.estimatedDeliveryDate === todayStr() && d.status !== "delivered" && d.status !== "failed"
  ).length;
  const countPending = deliveries.filter((d) => d.status === "pending").length;
  const countInTransit = deliveries.filter((d) => d.status === "in_transit").length;
  const countDelivered = deliveries.filter((d) => d.status === "delivered").length;

  return {
    deliveries: filteredDeliveries,
    loading,
    statusFilter,
    setStatusFilter,
    updateStatus,
    updatingId,
    formatDate,
    getStatusLabel,
    getStatusBadgeClass,
    formatAddress,
    loadDeliveries,
    counts: {
      today: countToday,
      pending: countPending,
      in_transit: countInTransit,
      delivered: countDelivered,
      all: deliveries.length,
    },
  };
};
