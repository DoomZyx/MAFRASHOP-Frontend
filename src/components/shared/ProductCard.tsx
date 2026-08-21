import { Link } from "react-router-dom";
import { Product } from "../../types/product";
import ProductPrice from "./ProductPrice";
import { getImageUrl } from "../../utils/imageUtils";
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
  isFavorite,
  isAuthenticated = false,
}: ProductCardProps) {
  const isOutOfStock =
    product.stock === "out_of_stock" || (product.stockQuantity ?? 0) <= 0;

  return (
    <div
      className={`product-card ${isOutOfStock ? "product-card-unavailable" : ""}`}
    >
      {isOutOfStock && (
        <span className="product-stock-badge">Indisponible</span>
      )}
      <Link to={`/${product.slug || product.id}`} className="product-card-link">
        {(() => {
          const imageUrl = getImageUrl(product.url_image);
          return imageUrl ? (
            <img 
              src={imageUrl} 
              alt={product.nom}
              width="198"
              height="200"
              loading="lazy"
            />
          ) : null;
        })()}
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
        </div>
      )}
    </div>
  );
}

export default ProductCard;

