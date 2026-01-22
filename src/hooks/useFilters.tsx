import { useState } from "react";

export type CategoryType = "exterieur" | "interieur" | "accessoires" | "kit" | "interieur_exterieur";

export interface FilterState {
  exterieur: string[];
  interieur: string[];
  accessoires: string[];
  kit: string[];
  interieur_exterieur: string[];
}

/**
 * Hook personnalisé pour gérer l'état des filtres
 */
export const useFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    exterieur: [],
    interieur: [],
    accessoires: [],
    kit: [],
    interieur_exterieur: [],
  });

  const openFilters = () => setIsOpen(true);
  const closeFilters = () => setIsOpen(false);
  const toggleFilters = () => setIsOpen(!isOpen);

  const toggleFilter = (category: CategoryType, filter: string) => {
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
      accessoires: [],
      kit: [],
      interieur_exterieur: [],
    });
  };

  const isFilterActive = (category: CategoryType, filter: string) => {
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



