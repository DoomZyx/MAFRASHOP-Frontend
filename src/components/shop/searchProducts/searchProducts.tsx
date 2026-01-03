import { Link } from "react-router-dom";
import { useSearch } from "../../../hooks/useSearch";
import { Product } from "../../../types/product";
import "./searchProducts.scss";

interface SearchProductsProps {
  products: Product[];
}

function SearchProducts({ products }: SearchProductsProps) {
  const {
    searchQuery,
    searchResults,
    isSearchOpen,
    handleSearchChange,
    closeSearch,
  } = useSearch(products);

  return (
    <header className="search-products-header">
      <div className="search-products-wrapper">
        <div className="search-products">
          <input
            type="search"
            placeholder="Rechercher un produit"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => searchQuery && handleSearchChange(searchQuery)}
          />
          <button className="search-btn" type="button">
            Rechercher
          </button>
        </div>

        {isSearchOpen && (
          <>
            <div className="search-overlay" onClick={closeSearch}></div>
            <div className="search-results-dropdown">
              {searchResults.length > 0 ? (
                <>
                  <div className="search-results-header">
                    <span>
                      {searchResults.length} résultat
                      {searchResults.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="search-results-list">
                    {searchResults.map((product) => (
                      <Link
                        key={product._id}
                        to={`/product/${product._id}`}
                        className="search-result-item"
                        onClick={closeSearch}
                      >
                        {product.URL_IMAGE && (
                          <img src={product.URL_IMAGE} alt={product.NOM} />
                        )}
                        <div className="search-result-info">
                          <h4>{product.NOM}</h4>
                          <p className="search-result-ref">
                            Ref: {product.REF}
                          </p>
                          {product.CATEGORY && (
                            <p className="search-result-category">
                              {product.CATEGORY}
                              {product.SUBCATEGORY &&
                                ` - ${product.SUBCATEGORY}`}
                            </p>
                          )}
                          <p className="search-result-price">
                            {product.PUBLIC_HT !== null
                              ? `${product.PUBLIC_HT.toFixed(2)}€ HT`
                              : "Prix non disponible"}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="search-no-results">
                  <p>Aucun produit trouvé pour "{searchQuery}"</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default SearchProducts;
