import { useState, useMemo } from "react";
import { Product } from "../types/product";

/**
 * Hook personnalisé pour gérer la recherche de produits
 */
export const useSearch = (products: Product[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filtrer les produits en fonction de la recherche
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();

    return products.filter((product) => {
      const searchableFields = [
        product.NOM,
        product.REF,
        product.CATEGORY,
        product.SUBCATEGORY,
        product.DESCRIPTION,
      ];

      return searchableFields.some((field) =>
        field?.toLowerCase().includes(query)
      );
    });
  }, [products, searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setIsSearchOpen(value.trim().length > 0);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return {
    searchQuery,
    searchResults,
    isSearchOpen,
    handleSearchChange,
    clearSearch,
    closeSearch,
  };
};
