import { useState } from "react";

export interface FilterState {
  exterieur: string[];
  interieur: string[];
}

/**
 * Hook personnalisé pour gérer l'état des filtres
 */
export const useFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    exterieur: [],
    interieur: [],
  });

  const openFilters = () => setIsOpen(true);
  const closeFilters = () => setIsOpen(false);
  const toggleFilters = () => setIsOpen(!isOpen);

  const toggleFilter = (category: "exterieur" | "interieur", filter: string) => {
    setFilters((prev) => {
      const categoryFilters = prev[category];
      const isActive = categoryFilters.includes(filter);

      return {
        ...prev,
        [category]: isActive
          ? categoryFilters.filter((f) => f !== filter)
          : [...categoryFilters, filter],
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      exterieur: [],
      interieur: [],
    });
  };

  const isFilterActive = (category: "exterieur" | "interieur", filter: string) => {
    return filters[category].includes(filter);
  };

  return {
    isOpen,
    filters,
    openFilters,
    closeFilters,
    toggleFilters,
    toggleFilter,
    clearFilters,
    isFilterActive,
  };
};



