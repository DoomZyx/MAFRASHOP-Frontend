// Type pour un produit basé sur le modèle backend
export interface Product {
  id: string;
  category: string;
  subcategory: string | null;
  nom: string;
  ref: string;
  url_image: string | null;
  description: string | null;
  format: string | null;
  net_socofra: number | null;
  public_ht: number | null;
  garage: number | null;
  is_bestseller?: boolean;
  is_promotion?: boolean;
  promotion_percentage?: number | null;
  stock?: "in_stock" | "out_of_stock";
  stockQuantity?: number;
  stockAlertThreshold?: number;
  isLowStock?: boolean;
  isOutOfStock?: boolean;
  sku?: string | null;
  created_at: Date;
  updated_at: Date;
}
