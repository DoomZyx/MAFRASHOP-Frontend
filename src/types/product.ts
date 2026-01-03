// Type pour un produit basé sur le modèle backend
export interface Product {
  _id: string;
  CATEGORY: string;
  SUBCATEGORY: string | null;
  NOM: string;
  REF: string;
  URL_IMAGE: string | null;
  DESCRIPTION: string | null;
  FORMAT: string | null;
  NET_SOCOFRA: number | null;
  PUBLIC_HT: number | null;
  GARAGE: number | null;
}
