import { API_BASE_URL } from "../config";
import { Product } from "../../types/product";

/**
 * Récupère tous les produits depuis l'API
 * @returns Promise<Product[]> - Liste de tous les produits
 */
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    throw error;
  }
};

/**
 * Récupère un produit par son ID
 * @param id - L'ID du produit à récupérer
 * @returns Promise<Product> - Le produit correspondant
 */
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Produit non trouvé");
      }
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    throw error;
  }
};

/**
 * Récupère tous les bestsellers depuis l'API
 * @returns Promise<Product[]> - Liste des produits bestsellers
 */
export const getBestsellers = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/bestsellers/all`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des bestsellers:", error);
    throw error;
  }
};

/**
 * Récupère toutes les promotions depuis l'API
 * @returns Promise<Product[]> - Liste des produits en promotion
 */
export const getPromotions = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/promotions/all`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des promotions:", error);
    throw error;
  }
};

/**
 * Récupère toutes les catégories distinctes depuis l'API
 * @returns Promise<string[]> - Liste des catégories uniques
 */
export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories/all`);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data: string[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    throw error;
  }
};

/**
 * Récupère toutes les sous-catégories distinctes depuis l'API
 * @param category - Catégorie optionnelle pour filtrer les sous-catégories
 * @returns Promise<string[]> - Liste des sous-catégories uniques
 */
export const getSubcategories = async (category?: string): Promise<string[]> => {
  try {
    const url = category
      ? `${API_BASE_URL}/products/subcategories/all?category=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/products/subcategories/all`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data: string[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des sous-catégories:", error);
    throw error;
  }
};