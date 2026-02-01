import { useAdminOrders } from "../../../hooks/useAdminOrders";
import AdminOrdersFilters from "../../../components/admin/AdminOrdersFilters/AdminOrdersFilters";
import AdminOrderCard from "../../../components/admin/AdminOrderCard/AdminOrderCard";
import AdminOrderModal from "../../../components/admin/AdminOrderModal/AdminOrderModal";
import "./AdminOrders.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Loader from "../../../components/loader/loader";

function AdminOrders() {
  const {
    orders,
    loading,
    selectedOrder,
    setSelectedOrder,
    statusFilter,
    setStatusFilter,
    updatingStatus,
    statusCounts,
    handleStatusChange,
    formatCurrency,
    formatDate,
    calculateTVA,
    calculateHT,
    getStatusBadgeClass,
    getStatusLabel,
  } = useAdminOrders();

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

      <AdminOrdersFilters
        statusFilter={statusFilter}
        onFilterChange={setStatusFilter}
        statusCounts={statusCounts}
      />

      <div className="orders-list">
        {orders.length === 0 ? (
          <div className="no-orders">
            <i className="bi bi-inbox"></i>
            <p>Aucune commande trouvée</p>
          </div>
        ) : (
          orders.map((order) => (
            <AdminOrderCard
              key={order.id}
              order={order}
              formatDate={formatDate}
              formatCurrency={formatCurrency}
              getStatusBadgeClass={getStatusBadgeClass}
              getStatusLabel={getStatusLabel}
              onViewDetails={setSelectedOrder}
              onStatusChange={handleStatusChange}
              updatingStatus={updatingStatus}
            />
          ))
        )}
      </div>

      {selectedOrder && (
        <AdminOrderModal
          order={selectedOrder}
          formatDate={formatDate}
          formatCurrency={formatCurrency}
          calculateTVA={calculateTVA}
          calculateHT={calculateHT}
          getStatusBadgeClass={getStatusBadgeClass}
          getStatusLabel={getStatusLabel}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
          updatingStatus={updatingStatus}
        />
      )}
    </div>
  );
}

export default AdminOrders;
