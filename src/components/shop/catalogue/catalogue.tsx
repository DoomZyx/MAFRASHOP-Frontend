import { Link } from "react-router-dom";
import { useProducts } from "../../../hooks/useProducts";
import { useFilters } from "../../../hooks/useFilters";
import { useCart } from "../../../hooks/useCart";
import { useFavorites } from "../../../hooks/useFavorites";
import { useAuth } from "../../../hooks/useAuth";
import Filters from "../filters/filters";
import ProductPrice from "../../shared/ProductPrice";
import "./catalogue.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Loader from "../../loader/loader";

function Catalogue() {
  const { products, loading, error } = useProducts();
  const { toggleFilter, isFilterActive } = useFilters();
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();

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
      <div className="catalogue-content">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-card-link">
              {product.url_image && (
                <img src={product.url_image} alt={product.nom} />
              )}
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
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(product.id);
                  }}
                  title={
                    isInCart(product.id)
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
        ))}
      </div>
    </div>
  );
}

export default Catalogue;
