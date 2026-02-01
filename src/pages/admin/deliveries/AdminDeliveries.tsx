import { useAdminDeliveries } from "../../../hooks/useAdminDeliveries";
import AdminDeliveryCard from "../../../components/admin/AdminDeliveryCard/AdminDeliveryCard";
import Loader from "../../../components/loader/loader";
import "./AdminDeliveries.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminDeliveries() {
  const {
    deliveries,
    loading,
    statusFilter,
    setStatusFilter,
    updateStatus,
    updatingId,
    formatDate,
    getStatusLabel,
    getStatusBadgeClass,
    formatAddress,
    counts,
  } = useAdminDeliveries();

  if (loading) {
    return (
      <div className="admin-deliveries-container">
        <div className="admin-deliveries-loading">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-deliveries-container">
      <div className="admin-deliveries-header">
        <h1>
          <i className="bi bi-truck"></i> Livraisons
        </h1>
        <p>Vue livreur : adresses et statuts. Marquez « En cours » puis « Livrée » après passage.</p>
      </div>

      <div className="admin-deliveries-filters">
        <button
          type="button"
          className={`admin-deliveries-filter-btn ${statusFilter === "today" ? "active" : ""}`}
          onClick={() => setStatusFilter("today")}
        >
          Aujourd&apos;hui ({counts.today})
        </button>
        <button
          type="button"
          className={`admin-deliveries-filter-btn ${statusFilter === "pending" ? "active" : ""}`}
          onClick={() => setStatusFilter("pending")}
        >
          En attente ({counts.pending})
        </button>
        <button
          type="button"
          className={`admin-deliveries-filter-btn ${statusFilter === "in_transit" ? "active" : ""}`}
          onClick={() => setStatusFilter("in_transit")}
        >
          En cours ({counts.in_transit})
        </button>
        <button
          type="button"
          className={`admin-deliveries-filter-btn ${statusFilter === "delivered" ? "active" : ""}`}
          onClick={() => setStatusFilter("delivered")}
        >
          Livrées ({counts.delivered})
        </button>
        <button
          type="button"
          className={`admin-deliveries-filter-btn ${statusFilter === "all" ? "active" : ""}`}
          onClick={() => setStatusFilter("all")}
        >
          Toutes ({counts.all})
        </button>
      </div>

      <div className="admin-deliveries-list">
        {deliveries.length === 0 ? (
          <div className="admin-deliveries-empty">
            <i className="bi bi-inbox"></i>
            <p>Aucune livraison pour ce filtre</p>
          </div>
        ) : (
          deliveries.map((delivery) => (
            <AdminDeliveryCard
              key={delivery.id}
              delivery={delivery}
              formatDate={formatDate}
              formatAddress={formatAddress}
              getStatusBadgeClass={getStatusBadgeClass}
              getStatusLabel={getStatusLabel}
              onStatusChange={updateStatus}
              updatingId={updatingId}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDeliveries;
