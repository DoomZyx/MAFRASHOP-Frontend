import { Product } from "../../types/product";
import "./ProductAdminCard.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

interface ProductAdminCardProps {
  product: Product;
  updating: Record<string, boolean>;
  promotionPercentages: Record<string, number | null>;
  onToggleBestseller: (product: Product) => void;
  onTogglePromotion: (product: Product, percentage: number | null) => void;
  onPercentageChange: (productId: string, value: string) => void;
  onSavePromotion: (product: Product) => void;
  calculateDiscountedPrice: (product: Product) => number | null;
  formatPrice: (price: number | null) => string;
}

function ProductAdminCard({
  product,
  updating,
  promotionPercentages,
  onToggleBestseller,
  onTogglePromotion,
  onPercentageChange,
  onSavePromotion,
  calculateDiscountedPrice,
  formatPrice,
}: ProductAdminCardProps) {
  return (
    <div className="product-admin-card">
      <div className="product-image">
        {product.url_image ? (
          <img src={product.url_image} alt={product.nom} />
        ) : (
          <div className="no-image">
            <i className="bi bi-image"></i>
          </div>
        )}
      </div>

      <div className="product-info">
        <h3>{product.nom}</h3>
        <p className="product-ref">Ref: {product.ref}</p>
        {product.category && (
          <p className="product-category">{product.category}</p>
        )}
        <div className="product-prices">
          {product.is_promotion && product.promotion_percentage ? (
            <>
              <span className="price-original">
                {formatPrice(product.public_ht)}
              </span>
              <span className="price-discounted">
                {formatPrice(calculateDiscountedPrice(product))}
              </span>
              <span className="price-discount-badge">
                -{product.promotion_percentage}%
              </span>
            </>
          ) : (
            <span className="price-normal">
              {formatPrice(product.public_ht)}
            </span>
          )}
        </div>
      </div>

      <div className="product-actions">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={product.is_bestseller || false}
            onChange={() => onToggleBestseller(product)}
            disabled={updating[`bestseller-${product.id}`] || false}
          />
          <span className="toggle-label">
            <i className="bi bi-star-fill"></i>
            Bestseller
          </span>
        </label>

        <div className="promotion-control">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={product.is_promotion || false}
              onChange={(e) => {
                if (e.target.checked) {
                  const currentPercentage = product.promotion_percentage ?? null;
                  onTogglePromotion(product, currentPercentage);
                } else {
                  onTogglePromotion(product, null);
                }
              }}
              disabled={updating[`promotion-${product.id}`] || false}
            />
            <span className="toggle-label">
              <i className="bi bi-tag-fill"></i>
              Promotion
            </span>
          </label>

          {product.is_promotion && (
            <div className="promotion-percentage-input">
              <label>
                <span>Pourcentage de réduction:</span>
                <div className="percentage-input-group">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={
                      promotionPercentages[product.id] !== undefined
                        ? promotionPercentages[product.id] ?? ""
                        : product.promotion_percentage ?? ""
                    }
                    onChange={(e) =>
                      onPercentageChange(product.id, e.target.value)
                    }
                    placeholder="0"
                    disabled={updating[`promotion-${product.id}`] || false}
                  />
                  <span className="percentage-symbol">%</span>
                  <button
                    className="save-percentage-btn"
                    onClick={() => onSavePromotion(product)}
                    disabled={updating[`promotion-${product.id}`] || false}
                    title="Sauvegarder le pourcentage"
                  >
                    <i className="bi bi-check-lg"></i>
                  </button>
                </div>
              </label>
              {product.promotion_percentage !== null && (
                <span className="current-percentage">
                  Actuel: {product.promotion_percentage}%
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductAdminCard;

