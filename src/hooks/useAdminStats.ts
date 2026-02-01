import { useState, useEffect } from "react";
import { adminStatsAPI } from "../API/admin/stats";
import { StatsResponse } from "../types/stats";

export const useAdminStats = () => {
  const [stats, setStats] = useState<StatsResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<string>("all");
  const [exporting, setExporting] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, [period]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await adminStatsAPI.getAllStats(period);
      setStats(response.data);
    } catch (error: any) {
      console.error("Erreur:", error);
      alert("Erreur lors du chargement des statistiques");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (type: "orders" | "products" | "clients") => {
    try {
      setExporting(type);
      const blob = await adminStatsAPI.exportStatsCSV(type);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      alert(error.message || "Erreur lors de l'export");
    } finally {
      setExporting(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const formatDate = (month: string) => {
    const date = new Date(month + "-01");
    return date.toLocaleDateString("fr-FR", { year: "numeric", month: "long" });
  };

  return {
    stats,
    loading,
    period,
    setPeriod,
    exporting,
    handleExport,
    formatCurrency,
    formatDate,
  };
};
