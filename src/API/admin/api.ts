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
    `${API_BASE_URL}/api/products/${productId}/bestseller`,
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
    `${API_BASE_URL}/api/products/${productId}/promotion`,
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

/**
 * Upload d'image (admin seulement)
 */
export const uploadImage = async (file: File): Promise<{
  success: boolean;
  message: string;
  data: { url: string };
}> => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/api/admin/upload/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de l'upload de l'image");
  }

  return response.json();
};

/**
 * CRUD Produits (admin seulement)
 */
export const adminProductsAPI = {
  createProduct: async (productData: {
    category?: string;
    subcategory?: string;
    nom: string;
    ref: string;
    url_image?: string;
    description?: string;
    format?: string;
    net_socofra?: number;
    public_ht?: number;
    garage?: number;
    stock?: "in_stock" | "out_of_stock";
    sku?: string;
    is_bestseller?: boolean;
    is_promotion?: boolean;
    promotion_percentage?: number;
  }): Promise<{
    success: boolean;
    message: string;
    data: { product: any };
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/api/admin/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la création du produit");
    }

    return response.json();
  },

  updateProduct: async (
    productId: string,
    productData: Partial<{
      category: string;
      subcategory: string;
      nom: string;
      ref: string;
      url_image: string;
      description: string;
      format: string;
      net_socofra: number;
      public_ht: number;
      garage: number;
      stock: "in_stock" | "out_of_stock";
      sku: string;
      is_bestseller: boolean;
      is_promotion: boolean;
      promotion_percentage: number;
    }>
  ): Promise<{
    success: boolean;
    message: string;
    data: { product: any };
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/api/admin/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la mise à jour du produit");
    }

    return response.json();
  },

  deleteProduct: async (productId: string): Promise<{
    success: boolean;
    message: string;
    data: { product: any };
  }> => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/api/admin/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Erreur lors de la suppression du produit");
    }

    return response.json();
  },
};

/**
 * Interface pour un utilisateur
 */
export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  avatar?: string;
  googleId?: string;
  authProvider: "local" | "google";
  isVerified: boolean;
  role: "user" | "admin";
  isPro?: boolean;
  proStatus?: "none" | "pending" | "verified" | "rejected";
  verificationMode?: "auto" | "manual";
  decisionSource?: "auto" | "manual" | null;
  decisionAt?: string | null;
  reviewedByAdminId?: string | null;
  lastVerificationError?: string | null;
  company?: {
    name?: string;
    siret?: string;
    address?: string;
    city?: string;
    zipCode?: string;
    phone?: string;
    email?: string;
    country?: string;
    vatNumber?: string;
    vatStatus?: "none" | "pending_manual" | "validated" | "rejected";
    vatValidationDate?: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Récupérer tous les utilisateurs (admin seulement)
 */
export const getAllUsers = async (): Promise<{
  success: boolean;
  data: { users: AdminUser[] };
}> => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");
  
  const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des utilisateurs");
  }

  return response.json();
};

/**
 * Modifier le rôle d'un utilisateur (admin seulement)
 */
export const updateUserRole = async (
  userId: string,
  role: "user" | "admin"
): Promise<{
  success: boolean;
  message: string;
  data: { user: AdminUser };
}> => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");
  
  const response = await fetch(`${API_BASE_URL}/api/admin/users/${userId}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la mise à jour du rôle");
  }

  return response.json();
};

/**
 * Valider ou refuser un compte pro (admin seulement)
 */
export const validateProUser = async (
  userId: string,
  approved: boolean
): Promise<{
  success: boolean;
  message: string;
  data?: { user: AdminUser };
}> => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");
  const response = await fetch(`${API_BASE_URL}/api/auth/pro/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, approved }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erreur lors de la décision");
  }
  return data;
};

/**
 * Valider ou refuser un numéro de TVA intracommunautaire (admin seulement)
 */
export const validateVatUser = async (
  userId: string,
  approved: boolean
): Promise<{
  success: boolean;
  message: string;
  data?: { user: AdminUser };
}> => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");
  const response = await fetch(`${API_BASE_URL}/api/auth/admin/validate-vat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, approved }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erreur lors de la validation TVA");
  }
  return data;
};

/**
 * Reprendre la vérification INSEE pour un compte en attente manuelle (admin seulement)
 */
export const retryProInsee = async (userId: string): Promise<{
  success: boolean;
  message: string;
}> => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");
  const response = await fetch(`${API_BASE_URL}/api/auth/pro/retry-insee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erreur lors de la reprise INSEE");
  }
  return data;
};

/**
 * Créer un utilisateur (admin seulement)
 */
export const createAdminUser = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: "user" | "admin";
}): Promise<{
  success: boolean;
  message: string;
  data: { user: AdminUser };
}> => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("authToken");
  
  const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la création de l'utilisateur");
  }

  return response.json();
};
