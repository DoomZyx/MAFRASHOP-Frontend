import { Product } from "./product";

export interface StockMovement {
  id: string;
  productId: string;
  movementType: "entry" | "exit" | "adjustment" | "sale" | "return";
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason: string | null;
  createdBy: string | null;
  createdAt: string;
  product?: {
    id: string;
    nom: string;
    ref: string;
  } | null;
  createdByUser?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

export interface StockProduct extends Product {
  isLowStock: boolean;
  isOutOfStock: boolean;
}

export interface StockHistoryResponse {
  success: boolean;
  data: {
    movements: StockMovement[];
    pagination: {
      total: number;
      limit: number;
      offset: number;
      hasMore: boolean;
    };
  };
}

