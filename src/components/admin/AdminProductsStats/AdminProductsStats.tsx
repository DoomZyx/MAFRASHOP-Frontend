import { Product } from "../../../types/product";
import "./AdminProductsStats.scss";

export type ProductsListFilter = "all" | "bestsellers" | "promotions";

interface AdminProductsStatsProps {
  products: Product[];
  listFilter: ProductsListFilter;
  onFilterChange: (filter: ProductsListFilter) => void;
}

const AdminProductsStats = ({
  products,
  listFilter,
  onFilterChange,
}: AdminProductsStatsProps) => {
  const bestsellersCount = products.filter((p) => p.is_bestseller).length;
  const promotionsCount = products.filter((p) => p.is_promotion).length;
  const totalCount = products.length;

  return (
    <div className="admin-stats">
      <button
        type="button"
        className={`stat-card stat-card--action ${listFilter === "bestsellers" ? "stat-card--active" : ""}`}
        onClick={() => onFilterChange("bestsellers")}
      >
        <h3>Bestsellers</h3>
        <p className="stat-number">{bestsellersCount}</p>
      </button>
      <button
        type="button"
        className={`stat-card stat-card--action ${listFilter === "promotions" ? "stat-card--active" : ""}`}
        onClick={() => onFilterChange("promotions")}
      >
        <h3>Promotions</h3>
        <p className="stat-number">{promotionsCount}</p>
      </button>
      <button
        type="button"
        className={`stat-card stat-card--action ${listFilter === "all" ? "stat-card--active" : ""}`}
        onClick={() => onFilterChange("all")}
      >
        <h3>Total produits</h3>
        <p className="stat-number">{totalCount}</p>
      </button>
    </div>
  );
};

export default AdminProductsStats;
