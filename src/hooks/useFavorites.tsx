import { useState, useEffect, useCallback } from "react";
import { favoritesAPI, FavoriteItem } from "../API/favorites/api";
import { useAuth } from "./useAuth";
import { useWebSocketContext } from "../contexts/WebSocketContext";

export function useFavorites() {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const loadFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavorites([]);
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const response = await favoritesAPI.getFavorites();
      if (response.success) {
        setFavorites(response.data.favorites);
      } else {
        setError("Erreur lors du chargement des favoris");
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des favoris");
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // WebSocket pour les mises à jour en temps réel
  const { subscribe } = useWebSocketContext();
  
  useEffect(() => {
    const unsubscribe = subscribe("favorites:updated", (data: { favorites: FavoriteItem[] }) => {
      if (data.favorites) {
        setFavorites(data.favorites);
      }
    });

    return unsubscribe;
  }, [subscribe]);

  const addToFavorites = useCallback(
    async (productId: string) => {
      if (!isAuthenticated) {
        setError("Vous devez être connecté pour ajouter aux favoris");
        return false;
      }

      setIsLoading(true);
      setError("");
      try {
        const response = await favoritesAPI.addToFavorites(productId);
        if (response.success) {
          await loadFavorites();
          return true;
        } else {
          setError(response.message || "Erreur lors de l'ajout aux favoris");
          return false;
        }
      } catch (err: any) {
        setError(err.message || "Erreur lors de l'ajout aux favoris");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, loadFavorites]
  );

  const removeFromFavorites = useCallback(
    async (productId: string) => {
      setIsLoading(true);
      setError("");
      try {
        const response = await favoritesAPI.removeFromFavorites(productId);
        if (response.success) {
          await loadFavorites();
          return true;
        } else {
          setError(
            response.message || "Erreur lors de la suppression des favoris"
          );
          return false;
        }
      } catch (err: any) {
        setError(err.message || "Erreur lors de la suppression des favoris");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [loadFavorites]
  );

  const isFavorite = useCallback(
    (productId: string) => {
      return favorites.some((fav) => fav.productId._id === productId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (productId: string) => {
      if (isFavorite(productId)) {
        return await removeFromFavorites(productId);
      } else {
        return await addToFavorites(productId);
      }
    },
    [isFavorite, addToFavorites, removeFromFavorites]
  );

  return {
    favorites,
    isLoading,
    error,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    refreshFavorites: loadFavorites,
  };
}

