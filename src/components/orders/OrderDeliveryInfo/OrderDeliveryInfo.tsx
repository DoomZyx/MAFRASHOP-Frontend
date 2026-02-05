import "./OrderDeliveryInfo.scss";

interface Delivery {
  status: string;
  estimatedDeliveryDate: string | null;
  actualDeliveryDate: string | null;
  scheduledDeliveryDateTime: string | null;
  trackingNumber: string | null;
  carrier: string | null;
}

interface OrderDeliveryInfoProps {
  delivery: Delivery;
  getDeliveryStatusLabel: (status: string) => string;
  getDeliveryStatusClass: (status: string) => string;
}

const OrderDeliveryInfo = ({
  delivery,
  getDeliveryStatusLabel,
  getDeliveryStatusClass,
}: OrderDeliveryInfoProps) => {
  return (
    <div className="orders-delivery-section">
      <h4 className="orders-details-title">Statut de livraison</h4>
      <div className="orders-delivery-info">
        <div className="orders-delivery-status-row">
          <span className="orders-delivery-label">Statut:</span>
          <span
            className={`orders-delivery-status ${getDeliveryStatusClass(
              delivery.status
            )}`}
          >
            {getDeliveryStatusLabel(delivery.status)}
          </span>
        </div>
        {delivery.estimatedDeliveryDate && (
          <div className="orders-delivery-status-row">
            <span className="orders-delivery-label">Date estimée:</span>
            <span className="orders-delivery-value">
              {new Date(delivery.estimatedDeliveryDate).toLocaleDateString(
                "fr-FR",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </span>
          </div>
        )}
        {delivery.trackingNumber && (
          <div className="orders-delivery-status-row">
            <span className="orders-delivery-label">Numéro de suivi:</span>
            <span className="orders-delivery-value">
              {delivery.trackingNumber}
            </span>
          </div>
        )}
        {delivery.carrier && (
          <div className="orders-delivery-status-row">
            <span className="orders-delivery-label">Transporteur:</span>
            <span className="orders-delivery-value">{delivery.carrier}</span>
          </div>
        )}
        {delivery.scheduledDeliveryDateTime && (
          <div className="orders-delivery-status-row">
            <span className="orders-delivery-label">Date et heure de livraison programmée:</span>
            <span className="orders-delivery-value">
              {new Date(delivery.scheduledDeliveryDateTime).toLocaleString(
                "fr-FR",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </span>
          </div>
        )}
        {delivery.actualDeliveryDate && (
          <div className="orders-delivery-status-row">
            <span className="orders-delivery-label">Date de livraison:</span>
            <span className="orders-delivery-value">
              {new Date(delivery.actualDeliveryDate).toLocaleDateString(
                "fr-FR",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDeliveryInfo;
