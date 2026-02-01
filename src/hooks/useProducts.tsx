import { useState, useEffect } from "react";
import { getAllProducts, getProductById } from "../API/products/api";
import { Product } from "../types/product";

/**
 * Hook personnalisé pour gérer les produits
 */
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des produits");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleProductsUpdated = () => {
      fetchProducts(true);
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchProducts(true);
      }
    };
    window.addEventListener("productsUpdated", handleProductsUpdated);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("productsUpdated", handleProductsUpdated);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return { products, loading, error, refreshProducts: fetchProducts };
};

/**
 * Hook personnalisé pour récupérer un produit par ID
 */
export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async (silent = false) => {
    if (!id) return;
    try {
      if (!silent) setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement du produit");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const handleProductsUpdated = () => fetchProduct(true);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") fetchProduct(true);
    };
    window.addEventListener("productsUpdated", handleProductsUpdated);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("productsUpdated", handleProductsUpdated);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [id]);

  return { product, loading, error };
};
