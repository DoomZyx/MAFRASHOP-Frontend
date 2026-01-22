import { Link } from "react-router-dom";
import { Product } from "../../types/product";
import ProductPrice from "./ProductPrice";
import "./ProductCard.scss";

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
  onToggleFavorite?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  isFavorite?: (id: string) => boolean;
  isInCart?: (id: string) => boolean;
  isAuthenticated?: boolean;
}

function ProductCard({
  product,
  showActions = false,
  onToggleFavorite,
  onAddToCart,
  isFavorite,
  isInCart,
  isAuthenticated = false,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        {product.url_image && (
          <img src={product.url_image} alt={product.nom} />
        )}
        {product.category && (
          <p className="product-category">{product.category}</p>
        )}
        <h3>{product.nom}</h3>
        {product.format && <p className="product-format">{product.format}</p>}
        <ProductPrice product={product} className="product-price" />
      </Link>
      {showActions && isAuthenticated && (
        <div className="product-actions">
          {onToggleFavorite && (
            <button
              className={`product-action-btn favorite-btn ${
                isFavorite?.(product.id) ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(product.id);
              }}
              title={
                isFavorite?.(product.id)
                  ? "Retirer des favoris"
                  : "Ajouter aux favoris"
              }
            >
              <i
                className={`bi ${
                  isFavorite?.(product.id) ? "bi-heart-fill" : "bi-heart"
                }`}
              ></i>
            </button>
          )}
          {onAddToCart && (
            <button
              className={`product-action-btn cart-btn ${
                isInCart?.(product.id) ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart(product.id);
              }}
              title={
                isInCart?.(product.id) ? "Déjà dans le panier" : "Ajouter au panier"
              }
            >
              <i
                className={`bi ${
                  isInCart?.(product.id) ? "bi-cart-check-fill" : "bi-cart"
                }`}
              ></i>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductCard;

