import { useState, useEffect } from "react";
import { adminOrdersAPI } from "../../../API/admin/orders";
import { Order, OrderItem } from "../../../API/orders/api";
import "./AdminOrders.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Loader from "../../../components/loader/loader";

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await adminOrdersAPI.getAllOrders(statusFilter);
      setOrders(response.data.orders);
    } catch (error: any) {
      console.error("Erreur:", error);
      alert("Erreur lors du chargement des commandes");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir changer le statut à "${newStatus}" ?`)) {
      return;
    }

    setUpdatingStatus(orderId);
    try {
      const response = await adminOrdersAPI.updateOrderStatus(orderId, newStatus);
      await loadOrders();
      
      // Si une commande est ouverte, la mettre à jour
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(response.data.order);
      }
    } catch (error: any) {
      alert(error.message || "Erreur lors de la mise à jour du statut");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const formatCurrency = (amount: number, isPro: boolean) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateTVA = (totalAmount: number, isPro: boolean) => {
    if (isPro) return 0; // Pas de TVA pour les pros
    return totalAmount * 0.2; // 20% TVA pour les particuliers
  };

  const calculateHT = (totalAmount: number, isPro: boolean) => {
    if (isPro) return totalAmount; // Déjà en HT pour les pros
    return totalAmount / 1.2; // Convertir TTC en HT pour les particuliers
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "paid":
        return "status-paid";
      case "pending":
        return "status-pending";
      case "failed":
        return "status-failed";
      case "cancelled":
        return "status-cancelled";
      case "refunded":
        return "status-refunded";
      case "preparing":
        return "status-preparing";
      case "shipped":
        return "status-shipped";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "En attente",
      paid: "Payée",
      failed: "Échouée",
      cancelled: "Annulée",
      refunded: "Remboursée",
      preparing: "En préparation",
      shipped: "Expédiée",
    };
    return labels[status] || status;
  };

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    paid: orders.filter((o) => o.status === "paid").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    failed: orders.filter((o) => o.status === "failed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    refunded: orders.filter((o) => o.status === "refunded").length,
  };

  if (loading) {
    return (
      <div className="admin-orders-container">
        <div className="admin-loading">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders-container">
      <div className="admin-orders-header">
        <h1>
          <i className="bi bi-cart-check"></i> Gestion des commandes
        </h1>
      </div>

      <div className="orders-filters">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            Toutes ({statusCounts.all})
          </button>
          <button
            className={`filter-btn ${statusFilter === "pending" ? "active" : ""}`}
            onClick={() => setStatusFilter("pending")}
          >
            En attente ({statusCounts.pending})
          </button>
          <button
            className={`filter-btn ${statusFilter === "paid" ? "active" : ""}`}
            onClick={() => setStatusFilter("paid")}
          >
            Payées ({statusCounts.paid})
          </button>
          <button
            className={`filter-btn ${statusFilter === "preparing" ? "active" : ""}`}
            onClick={() => setStatusFilter("preparing")}
          >
            En préparation ({statusCounts.preparing})
          </button>
          <button
            className={`filter-btn ${statusFilter === "shipped" ? "active" : ""}`}
            onClick={() => setStatusFilter("shipped")}
          >
            Expédiées ({statusCounts.shipped})
          </button>
          <button
            className={`filter-btn ${statusFilter === "failed" ? "active" : ""}`}
            onClick={() => setStatusFilter("failed")}
          >
            Échouées ({statusCounts.failed})
          </button>
        </div>
      </div>

      <div className="orders-list">
        {orders.length === 0 ? (
          <div className="no-orders">
            <i className="bi bi-inbox"></i>
            <p>Aucune commande trouvée</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div className="order-info">
                  <h3>Commande #{order.id}</h3>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                  <p className="order-customer">
                    {order.userEmail || "Client inconnu"}
                  </p>
                </div>
                <div className="order-status-section">
                  <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                  <div className="order-amount">
                    {formatCurrency(order.totalAmount, order.isPro)}
                    <span className="amount-label">{order.isPro ? " HT" : " TTC"}</span>
                  </div>
                </div>
              </div>

              <div className="order-actions">
                <button
                  className="btn-view-details"
                  onClick={() => setSelectedOrder(order)}
                >
                  <i className="bi bi-eye"></i> Voir les détails
                </button>
                <div className="status-selector">
                  <label>Changer le statut:</label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
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
          ))
        )}
      </div>

      {selectedOrder && (
        <div className="order-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Détails de la commande #{selectedOrder.id}</h2>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>
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
                    <p>{selectedOrder.userEmail || "N/A"}</p>
                  </div>
                  <div>
                    <label>Nom:</label>
                    <p>
                      {selectedOrder.userFirstName || ""} {selectedOrder.userLastName || ""}
                    </p>
                  </div>
                  <div>
                    <label>Type:</label>
                    <p>{selectedOrder.isPro ? "Professionnel" : "Particulier"}</p>
                  </div>
                </div>
              </div>

              {/* Adresse de livraison */}
              {selectedOrder.shippingAddress && (
                <div className="order-section">
                  <h3>
                    <i className="bi bi-truck"></i> Adresse de livraison
                  </h3>
                  <div className="address-box">
                    {typeof selectedOrder.shippingAddress === "string" ? (
                      <p>{selectedOrder.shippingAddress}</p>
                    ) : (
                      <>
                        <p>{selectedOrder.shippingAddress.name}</p>
                        <p>{selectedOrder.shippingAddress.line1}</p>
                        {selectedOrder.shippingAddress.line2 && (
                          <p>{selectedOrder.shippingAddress.line2}</p>
                        )}
                        <p>
                          {selectedOrder.shippingAddress.postal_code}{" "}
                          {selectedOrder.shippingAddress.city}
                        </p>
                        <p>{selectedOrder.shippingAddress.country}</p>
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
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item: OrderItem) => (
                      <div key={item.id} className="order-item">
                        <div className="item-info">
                          <h4>{item.productName || "Produit"}</h4>
                          <p className="item-ref">Ref: {item.productRef || "N/A"}</p>
                          <p className="item-quantity">Quantité: {item.quantity}</p>
                        </div>
                        <div className="item-price">
                          {formatCurrency(item.totalPrice, selectedOrder.isPro)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-items">Aucun produit</p>
                  )}
                </div>
              </div>

              {/* Informations de livraison */}
              {selectedOrder.delivery && (
                <div className="order-section">
                  <h3>
                    <i className="bi bi-truck"></i> Livraison
                  </h3>
                  <div className="order-details-grid">
                    <div>
                      <label>Statut:</label>
                      <p>
                        <span className={`status-badge ${getStatusBadgeClass(selectedOrder.delivery.status)}`}>
                          {selectedOrder.delivery.status}
                        </span>
                      </p>
                    </div>
                    {selectedOrder.delivery.trackingNumber && (
                      <div>
                        <label>Numéro de suivi:</label>
                        <p>{selectedOrder.delivery.trackingNumber}</p>
                      </div>
                    )}
                    {selectedOrder.delivery.carrier && (
                      <div>
                        <label>Transporteur:</label>
                        <p>{selectedOrder.delivery.carrier}</p>
                      </div>
                    )}
                    {selectedOrder.delivery.estimatedDeliveryDate && (
                      <div>
                        <label>Date estimée:</label>
                        <p>{formatDate(selectedOrder.delivery.estimatedDeliveryDate)}</p>
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
                    <strong>
                      {formatCurrency(calculateHT(selectedOrder.totalAmount, selectedOrder.isPro), true)}
                    </strong>
                  </div>
                  {!selectedOrder.isPro && (
                    <div className="total-row">
                      <span>TVA (20%):</span>
                      <strong>{formatCurrency(calculateTVA(selectedOrder.totalAmount, false), false)}</strong>
                    </div>
                  )}
                  <div className="total-row total-final">
                    <span>Total {selectedOrder.isPro ? "HT" : "TTC"}:</span>
                    <strong>{formatCurrency(selectedOrder.totalAmount, selectedOrder.isPro)}</strong>
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
                      <span className={`status-badge ${getStatusBadgeClass(selectedOrder.status)}`}>
                        {getStatusLabel(selectedOrder.status)}
                      </span>
                    </p>
                  </div>
                  {selectedOrder.stripePaymentIntentId && (
                    <div>
                      <label>Payment Intent ID:</label>
                      <p className="stripe-id">{selectedOrder.stripePaymentIntentId}</p>
                    </div>
                  )}
                  <div>
                    <label>Date de commande:</label>
                    <p>{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-close" onClick={() => setSelectedOrder(null)}>
                Fermer
              </button>
              <div className="status-selector-modal">
                <label>Changer le statut:</label>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                  disabled={updatingStatus === selectedOrder.id}
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
      )}
    </div>
  );
}

export default AdminOrders;
