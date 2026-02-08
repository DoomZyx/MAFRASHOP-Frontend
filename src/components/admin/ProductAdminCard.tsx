import { Product } from "../../types/product";
import { ProMinimumQuantityRule } from "../../API/admin/proMinimumQuantities";
import "./ProductAdminCard.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

interface ProductAdminCardProps {
  product: Product;
  updating: Record<string, boolean>;
  promotionPercentages: Record<string, number | null>;
  minimumQuantityRule: ProMinimumQuantityRule | null;
  minimumQuantity: number | null | undefined;
  onToggleBestseller: (product: Product) => void;
  onTogglePromotion: (product: Product, percentage: number | null) => void;
  onPercentageChange: (productId: string, value: string) => void;
  onSavePromotion: (product: Product) => void;
  onMinimumQuantityChange: (productId: string, value: string) => void;
  onSaveMinimumQuantity: (product: Product) => void;
  onDeleteMinimumQuantity: (product: Product) => void;
  calculateDiscountedPrice: (product: Product) => number | null;
  formatPrice: (price: number | null) => string;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  isDeleting?: boolean;
}

function ProductAdminCard({
  product,
  updating,
  promotionPercentages,
  minimumQuantityRule,
  minimumQuantity,
  onToggleBestseller,
  onTogglePromotion,
  onPercentageChange,
  onSavePromotion,
  onMinimumQuantityChange,
  onSaveMinimumQuantity,
  onDeleteMinimumQuantity,
  calculateDiscountedPrice,
  formatPrice,
  onEdit,
  onDelete,
  isDeleting = false,
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
          <div className="price-row">
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
          {product.net_socofra && (
            <div className="price-row price-purchase">
              <span className="price-label">Prix d'achat:</span>
              <span className="price-purchase-value">
                {formatPrice(product.net_socofra)}
              </span>
            </div>
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !updating[`promotion-${product.id}`]) {
                        e.preventDefault();
                        onSavePromotion(product);
                      }
                    }}
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

        <div className="minimum-quantity-control">
          <label className="minimum-quantity-label">
            <i className="bi bi-box-seam"></i>
            Quantité minimale (Pro):
          </label>
          <div className="minimum-quantity-input-group">
            <input
              type="number"
              min="1"
              value={
                minimumQuantity !== undefined && minimumQuantity !== null
                  ? minimumQuantity
                  : minimumQuantityRule?.minimumQuantity ?? ""
              }
              onChange={(e) => onMinimumQuantityChange(product.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !updating[`minqty-${product.id}`]) {
                  e.preventDefault();
                  onSaveMinimumQuantity(product);
                }
              }}
              placeholder="Ex: 2, 4..."
              disabled={updating[`minqty-${product.id}`] || false}
            />
            <button
              className="save-minimum-quantity-btn"
              onClick={() => onSaveMinimumQuantity(product)}
              disabled={updating[`minqty-${product.id}`] || false}
              title="Sauvegarder la quantité minimale"
            >
              <i className="bi bi-check-lg"></i>
            </button>
            {minimumQuantityRule && (
              <button
                className="delete-minimum-quantity-btn"
                onClick={() => onDeleteMinimumQuantity(product)}
                disabled={updating[`minqty-${product.id}`] || false}
                title="Supprimer la règle"
              >
                <i className="bi bi-trash"></i>
              </button>
            )}
          </div>
          {minimumQuantityRule && (
            <span className="current-minimum-quantity">
              Actuel: {minimumQuantityRule.minimumQuantity} unité(s)
            </span>
          )}
        </div>

        {(onEdit || onDelete) && (
          <div className="product-admin-actions">
            {onEdit && (
              <button
                className="btn-edit"
                onClick={() => onEdit(product)}
                title="Modifier le produit"
              >
                <i className="bi bi-pencil"></i> Modifier
              </button>
            )}
            {onDelete && (
              <button
                className="btn-delete"
                onClick={() => onDelete(product.id)}
                disabled={isDeleting}
                title="Supprimer le produit"
              >
                {isDeleting ? (
                  <>
                    <i className="bi bi-hourglass-split"></i> Suppression...
                  </>
                ) : (
                  <>
                    <i className="bi bi-trash"></i> Supprimer
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductAdminCard;

