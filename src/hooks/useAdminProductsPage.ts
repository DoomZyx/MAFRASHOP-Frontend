import { useState, useMemo } from "react";
import { Product } from "../types/product";
import { adminProductsAPI } from "../API/admin/api";

export const useAdminProductsPage = (
  products: Product[],
  refreshProducts?: () => void
) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return;
    }

    setDeletingProductId(productId);
    try {
      await adminProductsAPI.deleteProduct(productId);
      if (refreshProducts) {
        refreshProducts();
      } else {
        window.location.reload();
      }
    } catch (error: any) {
      alert(error.message || "Erreur lors de la suppression du produit");
    } finally {
      setDeletingProductId(null);
    }
  };

  const handleFormSuccess = () => {
    if (refreshProducts) {
      refreshProducts();
    } else {
      window.location.reload();
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) => {
      const searchableFields = [
        product.nom,
        product.ref,
        product.sku,
        product.category,
        product.subcategory,
        product.description,
      ]
        .filter(Boolean)
        .map((field) => field?.toLowerCase() || "");

      return searchableFields.some((field) => field.includes(query));
    });
  }, [products, searchQuery]);

  return {
    showForm,
    editingProduct,
    deletingProductId,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    handleCreateProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleFormSuccess,
    handleCloseForm,
  };
};
