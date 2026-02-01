import { Product } from "../../../types/product";
import "./AdminProductsStats.scss";

interface AdminProductsStatsProps {
  products: Product[];
}

const AdminProductsStats = ({ products }: AdminProductsStatsProps) => {
  const bestsellersCount = products.filter((p) => p.is_bestseller).length;
  const promotionsCount = products.filter((p) => p.is_promotion).length;
  const totalCount = products.length;

  return (
    <div className="admin-stats">
      <div className="stat-card">
        <h3>Bestsellers</h3>
        <p className="stat-number">{bestsellersCount}</p>
      </div>
      <div className="stat-card">
        <h3>Promotions</h3>
        <p className="stat-number">{promotionsCount}</p>
      </div>
      <div className="stat-card">
        <h3>Total produits</h3>
        <p className="stat-number">{totalCount}</p>
      </div>
    </div>
  );
};

export default AdminProductsStats;
