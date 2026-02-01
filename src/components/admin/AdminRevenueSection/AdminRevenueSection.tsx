import "./AdminRevenueSection.scss";

interface RevenueData {
  total: number;
  totalOrders: number;
  avgOrderValue: number;
}

interface RevenueByPeriod {
  month: string;
  revenue: number;
}

interface AdminRevenueSectionProps {
  revenue: RevenueData;
  revenueByPeriod: RevenueByPeriod[];
  formatCurrency: (amount: number) => string;
  formatDate: (month: string) => string;
  exporting: string | null;
  onExport: () => void;
}

const AdminRevenueSection = ({
  revenue,
  revenueByPeriod,
  formatCurrency,
  formatDate,
  exporting,
  onExport,
}: AdminRevenueSectionProps) => {
  const maxRevenue = Math.max(...revenueByPeriod.map((r) => r.revenue));

  return (
    <div className="stats-section">
      <div className="section-header">
        <h2>
          <i className="bi bi-cash-coin"></i> Chiffre d'affaires
        </h2>
        <button
          className="btn-export"
          onClick={onExport}
          disabled={exporting === "orders"}
        >
          {exporting === "orders" ? (
            <>
              <i className="bi bi-hourglass-split"></i> Export...
            </>
          ) : (
            <>
              <i className="bi bi-download"></i> Exporter CSV
            </>
          )}
        </button>
      </div>

      <div className="revenue-cards">
        <div className="stat-card revenue-card">
          <div className="stat-icon">
            <i className="bi bi-currency-euro"></i>
          </div>
          <div className="stat-content">
            <h3>Total</h3>
            <p className="stat-value">{formatCurrency(revenue.total)}</p>
            <p className="stat-label">{revenue.totalOrders} commandes</p>
          </div>
        </div>

        <div className="stat-card revenue-card">
          <div className="stat-icon">
            <i className="bi bi-cart"></i>
          </div>
          <div className="stat-content">
            <h3>Panier moyen</h3>
            <p className="stat-value">{formatCurrency(revenue.avgOrderValue)}</p>
            <p className="stat-label">Par commande</p>
          </div>
        </div>
      </div>

      {revenueByPeriod.length > 0 && (
        <div className="chart-container">
          <h3>Évolution du chiffre d'affaires (12 derniers mois)</h3>
          <div className="revenue-chart">
            {revenueByPeriod.map((item, index) => {
              const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;

              return (
                <div key={index} className="chart-bar">
                  <div
                    className="bar-fill"
                    style={{ height: `${height}%` }}
                    title={`${formatDate(item.month)}: ${formatCurrency(item.revenue)}`}
                  >
                    <span className="bar-value">{formatCurrency(item.revenue)}</span>
                  </div>
                  <div className="bar-label">{formatDate(item.month)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRevenueSection;
