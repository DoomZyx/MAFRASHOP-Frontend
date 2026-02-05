import { useState } from "react";
import { AdminDelivery, adminDeliveriesAPI } from "../../../API/admin/deliveries";
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
  // Fonction pour extraire la date d'une chaîne UTC (format YYYY-MM-DD)
  const extractDateFromUTC = (utcString: string | null | undefined): string => {
    if (!utcString) return "";
    try {
      const date = new Date(utcString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch {
      return "";
    }
  };

  // Fonction pour extraire l'heure d'une chaîne UTC (format HH:mm)
  const extractTimeFromUTC = (utcString: string | null | undefined): string => {
    if (!utcString) return "";
    try {
      const date = new Date(utcString);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    } catch {
      return "";
    }
  };

  // Fonction pour combiner date et heure locale en UTC
  const combineDateAndTimeToUTC = (dateStr: string, timeStr: string): string | null => {
    if (!dateStr || !timeStr) return null;
    try {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const [year, month, day] = dateStr.split("-").map(Number);
      
      // Créer une date en heure locale
      const localDate = new Date(year, month - 1, day, hours + 1, minutes);
      
      // Retourner en ISO (UTC)
      return localDate.toISOString();
    } catch {
      return null;
    }
  };

  const [scheduledDate, setScheduledDate] = useState<string>(
    extractDateFromUTC(delivery.scheduledDeliveryDateTime)
  );
  const [scheduledTime, setScheduledTime] = useState<string>(
    extractTimeFromUTC(delivery.scheduledDeliveryDateTime)
  );
  const [updatingDateTime, setUpdatingDateTime] = useState(false);
  const [dateTimeError, setDateTimeError] = useState<string | null>(null);

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

  const handleDateTimeChange = async () => {
    setUpdatingDateTime(true);
    setDateTimeError(null);

    try {
      if (!scheduledDate || !scheduledTime) {
        throw new Error("Veuillez remplir la date et l'heure");
      }
      
      const dateTimeValue = combineDateAndTimeToUTC(scheduledDate, scheduledTime);
      if (!dateTimeValue) {
        throw new Error("Date/heure invalide");
      }
      
      await adminDeliveriesAPI.updateScheduledDeliveryDateTime(
        delivery.id,
        dateTimeValue
      );
      // Rafraîchir la page pour afficher la mise à jour
      window.location.reload();
    } catch (error: any) {
      setDateTimeError(error.message || "Erreur lors de la mise à jour");
    } finally {
      setUpdatingDateTime(false);
    }
  };

  const formatDateTime = (dateTimeString: string | null | undefined): string => {
    if (!dateTimeString) return "Non définie";
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Format invalide";
    }
  };

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

      <div className="admin-delivery-card-datetime">
        <div className="admin-delivery-card-datetime-info">
          <label>
            <i className="bi bi-calendar-event"></i> Date et heure de livraison programmée:
          </label>
          <p className={delivery.scheduledDeliveryDateTime ? "" : "text-muted"}>
            {formatDateTime(delivery.scheduledDeliveryDateTime)}
          </p>
        </div>
        <div className="admin-delivery-card-datetime-form">
          <label>
            Définir la date et heure:
          </label>
          <div className="datetime-input-group">
            <input
              type="date"
              id={`scheduled-delivery-date-${delivery.id}`}
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              disabled={updatingDateTime}
              className="datetime-input date-input"
            />
            <input
              type="time"
              id={`scheduled-delivery-time-${delivery.id}`}
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              disabled={updatingDateTime}
              className="datetime-input time-input"
            />
            <button
              type="button"
              onClick={handleDateTimeChange}
              disabled={updatingDateTime || !scheduledDate || !scheduledTime}
              className="btn-update-datetime"
            >
              {updatingDateTime ? "Mise à jour..." : "Mettre à jour"}
            </button>
          </div>
          {dateTimeError && (
            <p className="error-message">{dateTimeError}</p>
          )}
        </div>
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
