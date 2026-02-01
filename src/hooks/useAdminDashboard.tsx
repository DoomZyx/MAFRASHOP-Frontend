import { useState, useEffect } from "react";
import { getAllProducts } from "../API/products/api";
import { adminStatsAPI } from "../API/admin/stats";
import { Product } from "../types/product";

interface DashboardStats {
  totalProducts: number;
  bestsellers: number;
  promotions: number;
  totalOrders: number;
  pendingDeliveries: number;
}

export const useAdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    bestsellers: 0,
    promotions: 0,
    totalOrders: 0,
    pendingDeliveries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [products, dashboardRes] = await Promise.all([
        getAllProducts(),
        adminStatsAPI.getDashboardStats(),
      ]);
      const productsList: Product[] = products;
      const { ordersThisMonth, pendingDeliveries } = dashboardRes.data;
      setStats({
        totalProducts: productsList.length,
        bestsellers: productsList.filter((p) => p.is_bestseller).length,
        promotions: productsList.filter((p) => p.is_promotion).length,
        totalOrders: ordersThisMonth,
        pendingDeliveries,
      });
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    refetch: fetchStats,
  };
};

