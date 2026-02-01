import "./AdminStockStats.scss";

interface AdminStockStatsProps {
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
}

const AdminStockStats = ({
  totalProducts,
  lowStockCount,
  outOfStockCount,
}: AdminStockStatsProps) => {
  return (
    <div className="stock-stats">
      <div className="stat-card">
        <h3>Total produits</h3>
        <p className="stat-number">{totalProducts}</p>
      </div>
      <div className={`stat-card ${lowStockCount > 0 ? "stat-warning" : ""}`}>
        <h3>
          <i className="bi bi-exclamation-triangle"></i> Stock faible
        </h3>
        <p className="stat-number">{lowStockCount}</p>
      </div>
      <div className={`stat-card ${outOfStockCount > 0 ? "stat-danger" : ""}`}>
        <h3>
          <i className="bi bi-x-circle"></i> Rupture de stock
        </h3>
        <p className="stat-number">{outOfStockCount}</p>
      </div>
    </div>
  );
};

export default AdminStockStats;
