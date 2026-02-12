import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../../hooks/useProducts";
import { useFilters } from "../../../hooks/useFilters";
import { useCart } from "../../../hooks/useCart";
import { useFavorites } from "../../../hooks/useFavorites";
import { useAuth } from "../../../hooks/useAuth";
import Filters from "../filters/filters";
import FiltersModal from "../filters/filtersModal";
import ProductPrice from "../../shared/ProductPrice";
import { getImageUrl } from "../../../utils/imageUtils";
import "./catalogue.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Loader from "../../loader/loader";

function Catalogue() {
  const { products, loading, error } = useProducts();
  const {
    filters,
    toggleFilter,
    isFilterActive,
    isOpen: isFiltersModalOpen,
    openFilters: openFiltersModal,
    closeFilters: closeFiltersModal,
    clearFilters,
  } = useFilters();
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();

  // Mapping des catégories principales vers les valeurs en base de données
  const categoryMapping: Record<string, string[]> = {
    accessoires: ["ACCESSOIRES"],
    exterieur: ["EXTERIEUR"],
    interieur: ["INTERIEUR"],
    interieur_exterieur: ["INTERIEUR / EXTERIEUR"],
    kit: ["KIT"],
  };

  // Filtrer les produits selon les filtres sélectionnés
  const filteredProducts = useMemo(() => {
    // Si aucun filtre n'est sélectionné, afficher tous les produits
    const hasActiveFilters =
      filters.exterieur.length > 0 ||
      filters.interieur.length > 0 ||
      filters.accessoires.length > 0 ||
      filters.kit.length > 0 ||
      filters.interieur_exterieur.length > 0;

    if (!hasActiveFilters) {
      return products;
    }

    return products.filter((product) => {
      // Vérifier chaque catégorie principale
      for (const [filterCategory, dbCategories] of Object.entries(
        categoryMapping
      )) {
        const selectedSubcategories = filters[
          filterCategory as keyof typeof filters
        ] as string[];

        if (selectedSubcategories.length > 0) {
          // Vérifier si le produit appartient à cette catégorie principale
          const matchesCategory = dbCategories.some(
            (dbCategory) =>
              product.category?.toUpperCase() === dbCategory.toUpperCase()
          );

          if (matchesCategory) {
            // Vérifier si la sous-catégorie du produit correspond à une des sous-catégories sélectionnées
            const matchesSubcategory = selectedSubcategories.some(
              (subcategory) =>
                product.subcategory?.toUpperCase() === subcategory.toUpperCase()
            );
            if (matchesSubcategory) {
              return true;
            }
          }
        }
      }

      return false;
    });
  }, [products, filters]);

  const isOutOfStock = (product: { stock?: string; stockQuantity?: number }) =>
    product.stock === "out_of_stock" || (product.stockQuantity ?? 0) <= 0;

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalogue-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="catalogue-container">
      <Filters onToggleFilter={toggleFilter} isFilterActive={isFilterActive} />
      <button
        className="filters-mobile-btn"
        onClick={openFiltersModal}
        aria-label="Ouvrir les filtres"
      >
        <i className="bi bi-funnel"></i>
        <span>FILTRES</span>
      </button>
      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={closeFiltersModal}
        onToggleFilter={toggleFilter}
        isFilterActive={isFilterActive}
        onClearFilters={clearFilters}
      />
      <div className="catalogue-content">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
          const unavailable = isOutOfStock(product);
          return (
          <div
            key={product.id}
            className={`product-card ${unavailable ? "product-card-unavailable" : ""}`}
          >
            {unavailable && (
              <span className="product-stock-badge">Indisponible</span>
            )}
            <Link to={`/${product.slug || product.id}`} className="product-card-link">
              {(() => {
                const imageUrl = getImageUrl(product.url_image);
                return imageUrl ? (
                  <img src={imageUrl} alt={product.nom} />
                ) : null;
              })()}
              {product.category && (
                <p className="product-category">{product.category}</p>
              )}
              <h3>{product.nom}</h3>
              {product.format && (
                <p className="product-format">{product.format}</p>
              )}
              <ProductPrice product={product} className="product-price" />
            </Link>
            {isAuthenticated && (
              <div className="product-actions">
                <button
                  className={`product-action-btn favorite-btn ${
                    isFavorite(product.id) ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                  title={
                    isFavorite(product.id)
                      ? "Retirer des favoris"
                      : "Ajouter aux favoris"
                  }
                >
                  <i
                    className={`bi ${
                      isFavorite(product.id) ? "bi-heart-fill" : "bi-heart"
                    }`}
                  ></i>
                </button>
                <button
                  className={`product-action-btn cart-btn ${
                    isInCart(product.id) ? "active" : ""
                  } ${unavailable ? "disabled" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!unavailable) addToCart(product.id);
                  }}
                  disabled={unavailable}
                  title={
                    unavailable
                      ? "Indisponible"
                      : isInCart(product.id)
                        ? "Déjà dans le panier"
                        : "Ajouter au panier"
                  }
                >
                  <i
                    className={`bi ${
                      isInCart(product.id) ? "bi-cart-check-fill" : "bi-cart"
                    }`}
                  ></i>
                </button>
              </div>
            )}
          </div>
          );
        })
        ) : (
          <div className="no-products-message">
            <p>Aucun produit ne correspond aux filtres sélectionnés.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Catalogue;
