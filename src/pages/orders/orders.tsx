import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useOrders } from "../../hooks/useOrders";
import { ordersAPI } from "../../API/orders/api";
import "./orders.scss";
import Nav from "../../components/nav/nav";
import HeroBg from "../../components/shop/herobg/heroBg";
import Loader from "../../components/loader/loader";

function Orders() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { orders, isLoading, error } = useOrders();
  const [downloadingInvoice, setDownloadingInvoice] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  if (authLoading) {
    return <div className="orders-loading"><Loader /></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const getStatusLabel = (status: string) => {
    const statusLabels: Record<string, string> = {
      pending: "En attente",
      paid: "Payée",
      failed: "Échouée",
      cancelled: "Annulée",
      refunded: "Remboursée",
    };
    return statusLabels[status] || status;
  };

  const getStatusClass = (status: string) => {
    const statusClasses: Record<string, string> = {
      pending: "orders-status-pending",
      paid: "orders-status-paid",
      failed: "orders-status-failed",
      cancelled: "orders-status-cancelled",
      refunded: "orders-status-refunded",
    };
    return statusClasses[status] || "";
  };

  const getDeliveryStatusLabel = (status: string) => {
    const statusLabels: Record<string, string> = {
      pending: "En attente",
      preparing: "En préparation",
      shipped: "Expédiée",
      in_transit: "En transit",
      delivered: "Livrée",
      failed: "Échec",
    };
    return statusLabels[status] || status;
  };

  const getDeliveryStatusClass = (status: string) => {
    const statusClasses: Record<string, string> = {
      pending: "delivery-status-pending",
      preparing: "delivery-status-preparing",
      shipped: "delivery-status-shipped",
      in_transit: "delivery-status-in-transit",
      delivered: "delivery-status-delivered",
      failed: "delivery-status-failed",
    };
    return statusClasses[status] || "";
  };

  const toggleOrderExpanded = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const isOrderExpanded = (orderId: string) => {
    return expandedOrders.has(orderId);
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

  const formatPrice = (price: number, isPro: boolean) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const handleDownloadInvoice = async (orderId: string) => {
    try {
      setDownloadingInvoice(orderId);
      const blob = await ordersAPI.downloadInvoice(orderId);
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `facture-${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erreur lors du téléchargement:", err);
      alert("Erreur lors du téléchargement de la facture");
    } finally {
      setDownloadingInvoice(null);
    }
  };

  return (
    <>
      <HeroBg />
      <Nav />
      <div className="orders-page">
        <div className="orders-container">
          <div className="orders-header">
            <h1>Mes commandes</h1>
            <p>Consultez l'historique de vos commandes</p>
          </div>

          {isLoading && (
            <div className="orders-loading-state">
              <p>Chargement de vos commandes...</p>
            </div>
          )}

          {error && (
            <div className="orders-error">
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && orders.length === 0 && (
            <div className="orders-empty">
              <div className="orders-empty-icon">📦</div>
              <h2>Aucune commande</h2>
              <p>Vous n'avez pas encore passé de commande.</p>
            </div>
          )}

          {!isLoading && !error && orders.length > 0 && (
            <div className="orders-list">
              {orders.map((order) => {
                const isExpanded = isOrderExpanded(order.id);
                return (
                  <div key={order.id} className="orders-card">
                    {/* Vue compacte - toujours visible */}
                    <div
                      className="orders-card-compact"
                      onClick={() => toggleOrderExpanded(order.id)}
                    >
                      <div className="orders-card-compact-info">
                        <div className="orders-card-compact-main">
                          <h3>Commande #{order.id.slice(-8).toUpperCase()}</h3>
                          <p className="orders-card-date">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="orders-card-compact-right">
                          <div className="orders-total-compact">
                            <span className="orders-total-amount">
                              {formatPrice(order.totalAmount, order.isPro)}
                              {order.isPro ? " HT" : " TTC"}
                            </span>
                          </div>
                          <div className={`orders-status ${getStatusClass(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </div>
                        </div>
                      </div>
                      <div className="orders-card-compact-actions">
                        {order.status === "paid" && (
                          <button
                            className="orders-download-invoice-btn-compact"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadInvoice(order.id);
                            }}
                            disabled={downloadingInvoice === order.id}
                          >
                            {downloadingInvoice === order.id
                              ? "Téléchargement..."
                              : "📄 Télécharger la facture"}
                          </button>
                        )}
                        <button className="orders-expand-btn">
                          {isExpanded ? "▼ Masquer les détails" : "▶ Voir les détails"}
                        </button>
                      </div>
                    </div>

                    {/* Vue détaillée - affichée si expandée */}
                    {isExpanded && (
                      <div className="orders-card-details">
                        {order.items && order.items.length > 0 && (
                          <div className="orders-items-section">
                            <h4 className="orders-details-title">Articles commandés</h4>
                            <div className="orders-items">
                              {order.items.map((item) => (
                                <div key={item.id} className="orders-item">
                                  <div className="orders-item-image">
                                    {item.productImage ? (
                                      <img
                                        src={item.productImage}
                                        alt={item.productName || "Produit"}
                                      />
                                    ) : (
                                      <div className="orders-item-placeholder">
                                        📦
                                      </div>
                                    )}
                                  </div>
                                  <div className="orders-item-details">
                                    <h4>{item.productName || "Produit"}</h4>
                                    {item.productRef && (
                                      <p className="orders-item-ref">
                                        Réf: {item.productRef}
                                      </p>
                                    )}
                                    <p className="orders-item-quantity">
                                      Quantité: {item.quantity}
                                    </p>
                                  </div>
                                  <div className="orders-item-price">
                                    {formatPrice(item.totalPrice, order.isPro)}
                                    {order.isPro ? " HT" : " TTC"}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {order.delivery && (
                          <div className="orders-delivery-section">
                            <h4 className="orders-details-title">Statut de livraison</h4>
                            <div className="orders-delivery-info">
                              <div className="orders-delivery-status-row">
                                <span className="orders-delivery-label">Statut:</span>
                                <span className={`orders-delivery-status ${getDeliveryStatusClass(order.delivery.status)}`}>
                                  {getDeliveryStatusLabel(order.delivery.status)}
                                </span>
                              </div>
                              {order.delivery.estimatedDeliveryDate && (
                                <div className="orders-delivery-status-row">
                                  <span className="orders-delivery-label">Date estimée:</span>
                                  <span className="orders-delivery-value">
                                    {new Date(order.delivery.estimatedDeliveryDate).toLocaleDateString("fr-FR", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </span>
                                </div>
                              )}
                              {order.delivery.trackingNumber && (
                                <div className="orders-delivery-status-row">
                                  <span className="orders-delivery-label">Numéro de suivi:</span>
                                  <span className="orders-delivery-value">
                                    {order.delivery.trackingNumber}
                                  </span>
                                </div>
                              )}
                              {order.delivery.carrier && (
                                <div className="orders-delivery-status-row">
                                  <span className="orders-delivery-label">Transporteur:</span>
                                  <span className="orders-delivery-value">
                                    {order.delivery.carrier}
                                  </span>
                                </div>
                              )}
                              {order.delivery.actualDeliveryDate && (
                                <div className="orders-delivery-status-row">
                                  <span className="orders-delivery-label">Date de livraison:</span>
                                  <span className="orders-delivery-value">
                                    {new Date(order.delivery.actualDeliveryDate).toLocaleDateString("fr-FR", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Orders;

