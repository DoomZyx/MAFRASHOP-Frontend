import { useState, useEffect } from "react";
import { ordersAPI, Order } from "../API/orders/api";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await ordersAPI.getUserOrders();
      
      if (response.success) {
        setOrders(response.data.orders);
      } else {
        setError("Erreur lors du chargement des commandes");
      }
    } catch (err) {
      setError("Erreur lors du chargement des commandes");
      console.error("Erreur useOrders:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getOrderById = async (id: string): Promise<Order | null> => {
    try {
      const response = await ordersAPI.getOrderById(id);
      if (response.success) {
        return response.data.order;
      }
      return null;
    } catch (err) {
      console.error("Erreur getOrderById:", err);
      return null;
    }
  };

  return {
    orders,
    isLoading,
    error,
    refetch: fetchOrders,
    getOrderById,
  };
};

