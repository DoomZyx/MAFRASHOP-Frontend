import { StockProduct } from "../../../types/stock";
import "./AdminStockProductCard.scss";

interface AdminStockProductCardProps {
  product: StockProduct;
  onUpdateClick: (product: StockProduct) => void;
}

const AdminStockProductCard = ({
  product,
  onUpdateClick,
}: AdminStockProductCardProps) => {
  return (
    <div
      className={`product-stock-card ${
        product.isOutOfStock
          ? "stock-out"
          : product.isLowStock
          ? "stock-low"
          : ""
      }`}
    >
      <div className="product-stock-header">
        <h3>{product.nom}</h3>
        {product.isOutOfStock && (
          <span className="stock-badge stock-badge-out">
            <i className="bi bi-x-circle"></i> Rupture
          </span>
        )}
        {product.isLowStock && !product.isOutOfStock && (
          <span className="stock-badge stock-badge-low">
            <i className="bi bi-exclamation-triangle"></i> Stock faible
          </span>
        )}
      </div>

      <div className="product-stock-info">
        <p className="product-ref">Ref: {product.ref}</p>
        {product.sku && <p className="product-sku">SKU: {product.sku}</p>}
      </div>

      <div className="product-stock-quantity">
        <div className="quantity-display">
          <span className="quantity-label">Stock actuel:</span>
          <span
            className={`quantity-value ${
              product.isOutOfStock ? "out" : product.isLowStock ? "low" : ""
            }`}
          >
            {product.stockQuantity || 0}
          </span>
        </div>
        <div className="alert-threshold">
          <span>Seuil d'alerte: {product.stockAlertThreshold || 10}</span>
        </div>
      </div>

      <button
        className="btn-update-stock"
        onClick={() => onUpdateClick(product)}
      >
        <i className="bi bi-pencil"></i> Modifier le stock
      </button>
    </div>
  );
};

export default AdminStockProductCard;
