import { useAdminProducts } from "../../../hooks/useAdminProducts";
import ProductAdminCard from "../../../components/admin/ProductAdminCard";
import "./AdminProducts.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Loader from "../../../components/loader/loader";

function AdminProducts() {
  const {
    products,
    loading,
    updating,
    promotionPercentages,
    handleToggleBestseller,
    handleTogglePromotion,
    handlePercentageChange,
    handleSavePromotion,
    calculateDiscountedPrice,
    formatPrice,
  } = useAdminProducts();

  if (loading) {
    return (
      <div className="admin-products-container">
        <div className="admin-loading"><Loader /></div>
      </div>
    );
  }

  return (
    <div className="admin-products-container">

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Bestsellers</h3>
          <p className="stat-number">
            {products.filter((p) => p.is_bestseller).length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Promotions</h3>
          <p className="stat-number">
            {products.filter((p) => p.is_promotion).length}
          </p>
        </div>
      </div>

      <div className="admin-products">
        <div className="products-header">
          <h2>Tous les produits ({products.length})</h2>
          <div className="filter-badges">
            <span className="badge bestseller-badge">
              <i className="bi bi-star-fill"></i> Bestseller
            </span>
            <span className="badge promotion-badge">
              <i className="bi bi-tag-fill"></i> Promotion
            </span>
          </div>
        </div>

        <div className="products-list">
          {products.map((product) => (
            <ProductAdminCard
              key={product.id}
              product={product}
              updating={updating}
              promotionPercentages={promotionPercentages}
              onToggleBestseller={handleToggleBestseller}
              onTogglePromotion={handleTogglePromotion}
              onPercentageChange={handlePercentageChange}
              onSavePromotion={handleSavePromotion}
              calculateDiscountedPrice={calculateDiscountedPrice}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;

