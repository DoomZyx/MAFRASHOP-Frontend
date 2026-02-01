import { Order, OrderItem } from "../../../API/orders/api";
import "./AdminOrderModal.scss";

interface AdminOrderModalProps {
  order: Order;
  formatDate: (date: string) => string;
  formatCurrency: (amount: number, isPro: boolean) => string;
  calculateTVA: (totalAmountTTC: number) => number;
  calculateHT: (totalAmountTTC: number) => number;
  getStatusBadgeClass: (status: string) => string;
  getStatusLabel: (status: string) => string;
  onClose: () => void;
  onStatusChange: (orderId: string, newStatus: string) => void;
  updatingStatus: string | null;
}

const AdminOrderModal = ({
  order,
  formatDate,
  formatCurrency,
  calculateTVA,
  calculateHT,
  getStatusBadgeClass,
  getStatusLabel,
  onClose,
  onStatusChange,
  updatingStatus,
}: AdminOrderModalProps) => {
  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Détails de la commande #{order.id}</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="modal-content">
          {/* Informations client */}
          <div className="order-section">
            <h3>
              <i className="bi bi-person"></i> Client
            </h3>
            <div className="order-details-grid">
              <div>
                <label>Email:</label>
                <p>{order.userEmail || "N/A"}</p>
              </div>
              <div>
                <label>Nom:</label>
                <p>
                  {order.userFirstName || ""} {order.userLastName || ""}
                </p>
              </div>
              <div>
                <label>Type:</label>
                <p>{order.isPro ? "Professionnel" : "Particulier"}</p>
              </div>
            </div>
          </div>

          {/* Adresse de livraison */}
          {order.shippingAddress && (
            <div className="order-section">
              <h3>
                <i className="bi bi-truck"></i> Adresse de livraison
              </h3>
              <div className="address-box">
                {typeof order.shippingAddress === "string" ? (
                  <p>{order.shippingAddress}</p>
                ) : (
                  <>
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.line1}</p>
                    {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                    <p>
                      {order.shippingAddress.postal_code} {order.shippingAddress.city}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Produits commandés */}
          <div className="order-section">
            <h3>
              <i className="bi bi-box"></i> Produits commandés
            </h3>
            <div className="order-items-list">
              {order.items && order.items.length > 0 ? (
                order.items.map((item: OrderItem) => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <h4>{item.productName || "Produit"}</h4>
                      <p className="item-ref">Ref: {item.productRef || "N/A"}</p>
                      <p className="item-quantity">Quantité: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      {formatCurrency(item.totalPrice * 1.2, order.isPro)} TTC
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-items">Aucun produit</p>
              )}
            </div>
          </div>

          {/* Informations de livraison */}
          {order.delivery && (
            <div className="order-section">
              <h3>
                <i className="bi bi-truck"></i> Livraison
              </h3>
              <div className="order-details-grid">
                <div>
                  <label>Statut:</label>
                  <p>
                    <span className={`status-badge ${getStatusBadgeClass(order.delivery.status)}`}>
                      {order.delivery.status}
                    </span>
                  </p>
                </div>
                {order.delivery.trackingNumber && (
                  <div>
                    <label>Numéro de suivi:</label>
                    <p>{order.delivery.trackingNumber}</p>
                  </div>
                )}
                {order.delivery.carrier && (
                  <div>
                    <label>Transporteur:</label>
                    <p>{order.delivery.carrier}</p>
                  </div>
                )}
                {order.delivery.estimatedDeliveryDate && (
                  <div>
                    <label>Date estimée:</label>
                    <p>{formatDate(order.delivery.estimatedDeliveryDate)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Totaux */}
          <div className="order-section order-totals">
            <h3>
              <i className="bi bi-calculator"></i> Totaux
            </h3>
            <div className="totals-grid">
              <div className="total-row">
                <span>Total HT:</span>
                <strong>{formatCurrency(calculateHT(order.totalAmount), true)}</strong>
              </div>
              <div className="total-row">
                <span>TVA (20%):</span>
                <strong>{formatCurrency(calculateTVA(order.totalAmount), false)}</strong>
              </div>
              <div className="total-row total-final">
                <span>Total TTC:</span>
                <strong>{formatCurrency(order.totalAmount, false)}</strong>
              </div>
            </div>
          </div>

          {/* Informations de paiement */}
          <div className="order-section">
            <h3>
              <i className="bi bi-credit-card"></i> Paiement
            </h3>
            <div className="order-details-grid">
              <div>
                <label>Statut:</label>
                <p>
                  <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </p>
              </div>
              {order.stripePaymentIntentId && (
                <div>
                  <label>Payment Intent ID:</label>
                  <p className="stripe-id">{order.stripePaymentIntentId}</p>
                </div>
              )}
              <div>
                <label>Date de commande:</label>
                <p>{formatDate(order.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>
            Fermer
          </button>
          <div className="status-selector-modal">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderModal;
