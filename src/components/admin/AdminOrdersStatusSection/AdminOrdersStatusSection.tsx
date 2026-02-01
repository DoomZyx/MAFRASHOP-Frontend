import "./AdminOrdersStatusSection.scss";

interface OrderStatus {
  status: string;
  count: number;
  totalAmount: number;
}

interface AdminOrdersStatusSectionProps {
  ordersByStatus: OrderStatus[];
  formatCurrency: (amount: number) => string;
}

const AdminOrdersStatusSection = ({
  ordersByStatus,
  formatCurrency,
}: AdminOrdersStatusSectionProps) => {
  return (
    <div className="stats-section">
      <h2>
        <i className="bi bi-list-check"></i> Commandes par statut
      </h2>
      <div className="orders-status-grid">
        {ordersByStatus.map((status) => (
          <div key={status.status} className="status-card">
            <div className="status-header">
              <h3>{status.status}</h3>
              <span className={`status-badge status-${status.status}`}>
                {status.status}
              </span>
            </div>
            <div className="status-stats">
              <p className="status-count">{status.count} commandes</p>
              <p className="status-amount">{formatCurrency(status.totalAmount)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrdersStatusSection;
