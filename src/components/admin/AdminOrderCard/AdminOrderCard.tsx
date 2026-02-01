import { Order } from "../../../API/orders/api";
import "./AdminOrderCard.scss";

interface AdminOrderCardProps {
  order: Order;
  formatDate: (date: string) => string;
  formatCurrency: (amount: number, isPro: boolean) => string;
  getStatusBadgeClass: (status: string) => string;
  getStatusLabel: (status: string) => string;
  onViewDetails: (order: Order) => void;
  onStatusChange: (orderId: string, newStatus: string) => void;
  updatingStatus: string | null;
}

const AdminOrderCard = ({
  order,
  formatDate,
  formatCurrency,
  getStatusBadgeClass,
  getStatusLabel,
  onViewDetails,
  onStatusChange,
  updatingStatus,
}: AdminOrderCardProps) => {
  return (
    <div className="order-card">
      <div className="order-card-header">
        <div className="order-info">
          <h3>Commande #{order.id}</h3>
          <p className="order-date">{formatDate(order.createdAt)}</p>
          <p className="order-customer">{order.userEmail || "Client inconnu"}</p>
        </div>
        <div className="order-status-section">
          <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
            {getStatusLabel(order.status)}
          </span>
          <div className="order-amount">
            {formatCurrency(order.totalAmount, order.isPro)}
            <span className="amount-label"> TTC</span>
          </div>
        </div>
      </div>

      <div className="order-actions">
        <button className="btn-view-details" onClick={() => onViewDetails(order)}>
          <i className="bi bi-eye"></i> Voir les détails
        </button>
        <div className="status-selector">
          <label>Changer le statut:</label>
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order.id, e.target.value)}
            disabled={updatingStatus === order.id}
            className="status-select"
          >
            <option value="pending">En attente</option>
            <option value="paid">Payée</option>
            <option value="preparing">En préparation</option>
            <option value="shipped">Expédiée</option>
            <option value="failed">Échouée</option>
            <option value="cancelled">Annulée</option>
            <option value="refunded">Remboursée</option>
          </select>
          {updatingStatus === order.id && (
            <span className="updating-indicator">
              <i className="bi bi-hourglass-split"></i>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderCard;
