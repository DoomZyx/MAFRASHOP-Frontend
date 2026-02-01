import "./AdminProductsHeader.scss";

interface AdminProductsHeaderProps {
  filteredCount: number;
  totalCount: number;
  hasSearch: boolean;
  onCreateProduct: () => void;
}

const AdminProductsHeader = ({
  filteredCount,
  totalCount,
  hasSearch,
  onCreateProduct,
}: AdminProductsHeaderProps) => {
  return (
    <div className="products-header">
      <h2>
        Tous les produits ({filteredCount}
        {hasSearch && ` / ${totalCount}`})
      </h2>
      <div className="products-header-actions">
        <button className="btn-create-product" onClick={onCreateProduct}>
          <i className="bi bi-plus-lg"></i> Créer un produit
        </button>
        <div className="filter-badges">
          <span className="badge bestseller-badge">
            <i className="bi bi-star-fill"></i> Bestseller
          </span>
          <span className="badge promotion-badge">
            <i className="bi bi-tag-fill"></i> Promotion
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminProductsHeader;
