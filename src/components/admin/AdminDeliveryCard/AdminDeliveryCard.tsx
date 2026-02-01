import { AdminDelivery } from "../../../API/admin/deliveries";
import "./AdminDeliveryCard.scss";

interface AdminDeliveryCardProps {
  delivery: AdminDelivery;
  formatDate: (dateStr: string | null | undefined) => string;
  formatAddress: (d: AdminDelivery) => string;
  getStatusBadgeClass: (status: string) => string;
  getStatusLabel: (status: string) => string;
  onStatusChange: (deliveryId: string, status: string) => void;
  updatingId: string | null;
}

const AdminDeliveryCard = ({
  delivery,
  formatDate,
  formatAddress,
  getStatusBadgeClass,
  getStatusLabel,
  onStatusChange,
  updatingId,
}: AdminDeliveryCardProps) => {
  const order = delivery.order;
  const clientName = order
    ? [order.userFirstName, order.userLastName].filter(Boolean).join(" ") || order.userEmail || "Client"
    : "Client";
  const canMarkInTransit =
    delivery.status === "pending" || delivery.status === "preparing" || delivery.status === "shipped";
  const canMarkDelivered =
    delivery.status === "pending" ||
    delivery.status === "preparing" ||
    delivery.status === "shipped" ||
    delivery.status === "in_transit";
  const isUpdating = updatingId === delivery.id;

  return (
    <div className="admin-delivery-card">
      <div className="admin-delivery-card-header">
        <div className="admin-delivery-card-meta">
          <h3 className="admin-delivery-card-title">Commande #{delivery.orderId}</h3>
          <span className={`admin-delivery-card-status ${getStatusBadgeClass(delivery.status)}`}>
            {getStatusLabel(delivery.status)}
          </span>
        </div>
        <p className="admin-delivery-card-date">
          Prévu le {formatDate(delivery.estimatedDeliveryDate)}
        </p>
      </div>

      <div className="admin-delivery-card-address-block">
        <h4 className="admin-delivery-card-address-title">
          <i className="bi bi-geo-alt"></i> Adresse de livraison
        </h4>
        <p className="admin-delivery-card-address">{formatAddress(delivery)}</p>
      </div>

      <div className="admin-delivery-card-contact">
        <p className="admin-delivery-card-client">
          <i className="bi bi-person"></i> {clientName}
        </p>
        {delivery.clientPhone && (
          <p className="admin-delivery-card-phone">
            <i className="bi bi-telephone"></i>{" "}
            <a href={`tel:${delivery.clientPhone}`}>{delivery.clientPhone}</a>
          </p>
        )}
      </div>

      <div className="admin-delivery-card-actions">
        {canMarkInTransit && (
          <button
            type="button"
            className="admin-delivery-card-btn admin-delivery-card-btn-in-transit"
            onClick={() => onStatusChange(delivery.id, "in_transit")}
            disabled={isUpdating}
          >
            {isUpdating ? "..." : "En cours de livraison"}
          </button>
        )}
        {canMarkDelivered && (
          <button
            type="button"
            className="admin-delivery-card-btn admin-delivery-card-btn-delivered"
            onClick={() => onStatusChange(delivery.id, "delivered")}
            disabled={isUpdating}
          >
            {isUpdating ? "..." : "Marquer livrée"}
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminDeliveryCard;
