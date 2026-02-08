import { useState, useEffect } from "react";
import { useProducts } from "./useProducts";
import { Product } from "../types/product";
import {
  updateBestsellerStatus,
  updatePromotionStatus,
  triggerProductsUpdate,
} from "../API/admin/api";
import {
  proMinimumQuantitiesAPI,
  ProMinimumQuantityRule,
} from "../API/admin/proMinimumQuantities";

export const useAdminProducts = () => {
  const { products: initialProducts, loading, refreshProducts: refreshInitialProducts } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [updating, setUpdating] = useState<Record<string, boolean>>({});
  const [promotionPercentages, setPromotionPercentages] = useState<
    Record<string, number | null>
  >({});
  const [minimumQuantityRules, setMinimumQuantityRules] = useState<
    Record<string, ProMinimumQuantityRule | null>
  >({});
  const [minimumQuantities, setMinimumQuantities] = useState<
    Record<string, number | null>
  >({});

  // Charger les règles de quantité minimale au démarrage
  useEffect(() => {
    const loadMinimumQuantityRules = async () => {
      try {
        const response = await proMinimumQuantitiesAPI.getAll();
        const rulesMap: Record<string, ProMinimumQuantityRule | null> = {};
        response.data.rules.forEach((rule) => {
          rulesMap[rule.productId] = rule;
        });
        setMinimumQuantityRules(rulesMap);
      } catch (error) {
        console.error("Erreur lors du chargement des règles de quantité minimale:", error);
      }
    };
    loadMinimumQuantityRules();
  }, []);

  // Synchroniser les produits initiaux avec l'état local
  useEffect(() => {
    if (initialProducts.length > 0) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  const refreshProducts = async () => {
    if (refreshInitialProducts) {
      await refreshInitialProducts();
    } else {
      window.location.reload();
    }
  };

  const handleToggleBestseller = async (product: Product) => {
    setUpdating((prev) => ({ ...prev, [`bestseller-${product.id}`]: true }));
    try {
      const updatedProduct = await updateBestsellerStatus(
        product.id,
        !product.is_bestseller
      );

      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updatedProduct : p))
      );

      triggerProductsUpdate("bestseller", product.id);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise à jour du statut bestseller");
    } finally {
      setUpdating((prev) => ({
        ...prev,
        [`bestseller-${product.id}`]: false,
      }));
    }
  };

  const handleTogglePromotion = async (
    product: Product,
    percentage: number | null = null
  ) => {
    setUpdating((prev) => ({ ...prev, [`promotion-${product.id}`]: true }));
    try {
      const isPromotion = !product.is_promotion;
      let promotionPercentage = null;

      if (isPromotion) {
        promotionPercentage =
          percentage ?? product.promotion_percentage ?? null;
        if (
          promotionPercentage !== null &&
          (isNaN(promotionPercentage) ||
            promotionPercentage < 0 ||
            promotionPercentage > 100)
        ) {
          promotionPercentage = null;
        }
      }

      const updatedProduct = await updatePromotionStatus(
        product.id,
        isPromotion,
        promotionPercentage
      );

      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updatedProduct : p))
      );

      triggerProductsUpdate("promotion", product.id);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise à jour du statut promotion");
    } finally {
      setUpdating((prev) => ({
        ...prev,
        [`promotion-${product.id}`]: false,
      }));
    }
  };

  const handlePercentageChange = (productId: string, value: string) => {
    const numValue = value === "" ? null : parseInt(value);
    if (
      numValue !== null &&
      (isNaN(numValue) || numValue < 0 || numValue > 100)
    ) {
      return;
    }
    setPromotionPercentages((prev) => ({
      ...prev,
      [productId]: numValue,
    }));
  };

  const handleSavePromotion = async (product: Product) => {
    setUpdating((prev) => ({ ...prev, [`promotion-${product.id}`]: true }));

    try {
      const percentageValue = promotionPercentages[product.id];
      let percentage = null;

      if (
        percentageValue !== undefined &&
        percentageValue !== null &&
        !isNaN(percentageValue)
      ) {
        percentage = percentageValue;
      } else if (
        product.promotion_percentage !== null &&
        product.promotion_percentage !== undefined
      ) {
        percentage = product.promotion_percentage;
      }

      if (percentage === null) {
        alert("Veuillez saisir un pourcentage de réduction");
        setUpdating((prev) => ({
          ...prev,
          [`promotion-${product.id}`]: false,
        }));
        return;
      }

      if (percentage < 0 || percentage > 100) {
        alert("Le pourcentage doit être entre 0 et 100");
        setUpdating((prev) => ({
          ...prev,
          [`promotion-${product.id}`]: false,
        }));
        return;
      }

      const updatedProduct = await updatePromotionStatus(
        product.id,
        true,
        percentage
      );

      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updatedProduct : p))
      );

      triggerProductsUpdate("promotion", product.id);

      setPromotionPercentages((prev) => ({
        ...prev,
        [product.id]: null,
      }));
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la sauvegarde du pourcentage");
    } finally {
      setUpdating((prev) => ({
        ...prev,
        [`promotion-${product.id}`]: false,
      }));
    }
  };

  // Calculer le prix réduit si promotion active
  const calculateDiscountedPrice = (product: Product): number | null => {
    if (!product.is_promotion || !product.promotion_percentage) {
      return null;
    }

    const basePrice = product.public_ht;
    if (!basePrice) {
      return null;
    }

    const discount = (basePrice * product.promotion_percentage) / 100;
    return Math.round((basePrice - discount) * 100) / 100;
  };

  // Formater le prix
  const formatPrice = (price: number | null): string => {
    if (price === null || price === undefined) {
      return "N/A";
    }
    return `${price.toFixed(2)} €`;
  };

  const handleMinimumQuantityChange = (productId: string, value: string) => {
    const numValue = value === "" ? null : parseInt(value);
    if (numValue !== null && (isNaN(numValue) || numValue <= 0)) {
      return;
    }
    setMinimumQuantities((prev) => ({
      ...prev,
      [productId]: numValue,
    }));
  };

  const handleSaveMinimumQuantity = async (product: Product) => {
    setUpdating((prev) => ({ ...prev, [`minqty-${product.id}`]: true }));

    try {
      const quantityValue = minimumQuantities[product.id];
      let quantity = null;

      if (
        quantityValue !== undefined &&
        quantityValue !== null &&
        !isNaN(quantityValue) &&
        quantityValue > 0
      ) {
        quantity = quantityValue;
      } else {
        const existingRule = minimumQuantityRules[product.id];
        if (existingRule) {
          quantity = existingRule.minimumQuantity;
        }
      }

      if (quantity === null || quantity <= 0) {
        alert("Veuillez saisir une quantité minimale valide (supérieure à 0)");
        setUpdating((prev) => ({
          ...prev,
          [`minqty-${product.id}`]: false,
        }));
        return;
      }

      const existingRule = minimumQuantityRules[product.id];
      let updatedRule: ProMinimumQuantityRule;

      if (existingRule) {
        updatedRule = (
          await proMinimumQuantitiesAPI.update(
            existingRule.id,
            product.id,
            quantity
          )
        ).data.rule;
      } else {
        updatedRule = (
          await proMinimumQuantitiesAPI.create(product.id, quantity)
        ).data.rule;
      }

      setMinimumQuantityRules((prev) => ({
        ...prev,
        [product.id]: updatedRule,
      }));

      setMinimumQuantities((prev) => ({
        ...prev,
        [product.id]: null,
      }));
    } catch (error: any) {
      console.error("Erreur:", error);
      alert(error.message || "Erreur lors de la sauvegarde de la quantité minimale");
    } finally {
      setUpdating((prev) => ({
        ...prev,
        [`minqty-${product.id}`]: false,
      }));
    }
  };

  const handleDeleteMinimumQuantity = async (product: Product) => {
    const existingRule = minimumQuantityRules[product.id];
    if (!existingRule) {
      return;
    }

    if (!confirm(`Supprimer la règle de quantité minimale pour "${product.nom}" ?`)) {
      return;
    }

    setUpdating((prev) => ({ ...prev, [`minqty-${product.id}`]: true }));

    try {
      await proMinimumQuantitiesAPI.delete(existingRule.id);
      setMinimumQuantityRules((prev) => {
        const newRules = { ...prev };
        delete newRules[product.id];
        return newRules;
      });
      setMinimumQuantities((prev) => {
        const newQuantities = { ...prev };
        delete newQuantities[product.id];
        return newQuantities;
      });
    } catch (error: any) {
      console.error("Erreur:", error);
      alert(error.message || "Erreur lors de la suppression de la règle");
    } finally {
      setUpdating((prev) => ({
        ...prev,
        [`minqty-${product.id}`]: false,
      }));
    }
  };

  return {
    products,
    loading,
    updating,
    promotionPercentages,
    minimumQuantityRules,
    minimumQuantities,
    handleToggleBestseller,
    handleTogglePromotion,
    handlePercentageChange,
    handleSavePromotion,
    handleMinimumQuantityChange,
    handleSaveMinimumQuantity,
    handleDeleteMinimumQuantity,
    calculateDiscountedPrice,
    formatPrice,
    refreshProducts,
  };
};

