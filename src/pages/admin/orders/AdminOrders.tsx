import "./AdminOrders.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminOrders() {
  return (
    <div className="admin-orders-container">
      <div className="admin-orders-header">
        <h1>Historique des commandes</h1>
        <p>Gérez et suivez toutes les commandes de votre boutique</p>
      </div>

      <div className="admin-orders-placeholder">
        <i className="bi bi-cart-check"></i>
        <h2>Fonctionnalité à venir</h2>
        <p>L'historique des commandes sera bientôt disponible</p>
      </div>
    </div>
  );
}

export default AdminOrders;

