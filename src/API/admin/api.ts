import { API_BASE_URL } from "../config";
import { Product } from "../../types/product";

/**
 * Met à jour le statut bestseller d'un produit
 */
export const updateBestsellerStatus = async (
  productId: string,
  isBestseller: boolean
): Promise<Product> => {
  const response = await fetch(
    `${API_BASE_URL}/products/${productId}/bestseller`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_bestseller: isBestseller,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour du statut bestseller");
  }

  return response.json();
};

/**
 * Met à jour le statut promotion d'un produit
 */
export const updatePromotionStatus = async (
  productId: string,
  isPromotion: boolean,
  promotionPercentage: number | null = null
): Promise<Product> => {
  const response = await fetch(
    `${API_BASE_URL}/products/${productId}/promotion`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_promotion: isPromotion,
        promotion_percentage: promotionPercentage,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour du statut promotion");
  }

  return response.json();
};

/**
 * Déclenche un événement pour rafraîchir les sections promotions/bestsellers
 */
export const triggerProductsUpdate = (type: "bestseller" | "promotion", productId: string) => {
  window.dispatchEvent(
    new CustomEvent("productsUpdated", {
      detail: { type, productId },
    })
  );
};

