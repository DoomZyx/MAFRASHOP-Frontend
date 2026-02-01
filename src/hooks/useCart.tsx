import { useState, useEffect, useCallback } from "react";
import { cartAPI, CartItem } from "../API/cart/api";
import { useAuth } from "./useAuth";
import { useWebSocketContext } from "../contexts/WebSocketContext";

export function useCart() {
  const { isAuthenticated, user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const loadCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart([]);
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const response = await cartAPI.getCart();
      if (response.success) {
        setCart(response.data.cart);
      } else {
        setError("Erreur lors du chargement du panier");
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement du panier");
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // WebSocket pour les mises à jour en temps réel
  const { subscribe } = useWebSocketContext();
  
  useEffect(() => {
    const unsubscribe = subscribe("cart:updated", (data: { cart: CartItem[] }) => {
      if (data.cart) {
        setCart(data.cart);
      }
    });

    return unsubscribe;
  }, [subscribe]);

  const addToCart = useCallback(
    async (productId: string, quantity: number = 1) => {
      if (!isAuthenticated) {
        setError("Vous devez être connecté pour ajouter au panier");
        return false;
      }

      setIsLoading(true);
      setError("");
      try {
        const response = await cartAPI.addToCart(productId, quantity);
        if (response.success) {
          await loadCart();
          return true;
        } else {
          setError(response.message || "Erreur lors de l'ajout au panier");
          return false;
        }
      } catch (err: any) {
        setError(err.message || "Erreur lors de l'ajout au panier");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, loadCart]
  );

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      setIsLoading(true);
      setError("");
      try {
        const response = await cartAPI.updateCartItem(productId, quantity);
        if (response.success) {
          await loadCart();
          return true;
        } else {
          setError(response.message || "Erreur lors de la mise à jour");
          return false;
        }
      } catch (err: any) {
        setError(err.message || "Erreur lors de la mise à jour");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [loadCart]
  );

  const removeFromCart = useCallback(
    async (productId: string) => {
      setIsLoading(true);
      setError("");
      try {
        const response = await cartAPI.removeFromCart(productId);
        if (response.success) {
          await loadCart();
          return true;
        } else {
          setError(response.message || "Erreur lors de la suppression");
          return false;
        }
      } catch (err: any) {
        setError(err.message || "Erreur lors de la suppression");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [loadCart]
  );

  const clearCart = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await cartAPI.clearCart();
      if (response.success) {
        await loadCart();
        return true;
      } else {
        setError(response.message || "Erreur lors du vidage");
        return false;
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors du vidage");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [loadCart]);

  const isInCart = useCallback(
    (productId: string) => {
      return cart.some((item) => item.productId.id === productId);
    },
    [cart]
  );

  const getCartItemQuantity = useCallback(
    (productId: string) => {
      const item = cart.find((item) => item.productId.id === productId);
      return item ? item.quantity : 0;
    },
    [cart]
  );

  const TVA_RATE = 1.2;
  const FREE_SHIPPING_THRESHOLD = 80;
  const DELIVERY_FEE = 6.5;

  const getCartSubtotal = useCallback(() => {
    const isPro = user?.isPro || false;
    return cart.reduce((total, item) => {
      const priceHT = isPro
        ? (item.productId.garage || item.productId.public_ht || 0)
        : (item.productId.public_ht || 0);
      const priceTTC = priceHT * TVA_RATE;
      return total + priceTTC * item.quantity;
    }, 0);
  }, [cart, user]);

  const getDeliveryFee = useCallback(() => {
    const subtotal = getCartSubtotal();
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DELIVERY_FEE;
  }, [getCartSubtotal]);

  const getCartTotal = useCallback(() => {
    return getCartSubtotal() + getDeliveryFee();
  }, [getCartSubtotal, getDeliveryFee]);

  const getCartCount = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  return {
    cart,
    isLoading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    isInCart,
    getCartItemQuantity,
    getCartSubtotal,
    getDeliveryFee,
    getCartTotal,
    getCartCount,
    refreshCart: loadCart,
  };
}
