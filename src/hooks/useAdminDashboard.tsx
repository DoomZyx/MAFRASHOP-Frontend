import { useState, useEffect } from "react";
import { getAllProducts } from "../API/products/api";
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
      const products: Product[] = await getAllProducts();
      setStats({
        totalProducts: products.length,
        bestsellers: products.filter((p) => p.is_bestseller).length,
        promotions: products.filter((p) => p.is_promotion).length,
        totalOrders: 0, // TODO: Implémenter quand les commandes seront disponibles
        pendingDeliveries: 0, // TODO: Implémenter quand les livraisons seront disponibles
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

