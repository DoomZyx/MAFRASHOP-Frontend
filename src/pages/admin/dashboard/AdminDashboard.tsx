import { useAdminDashboard } from "../../../hooks/useAdminDashboard";
import StatCard from "../../../components/admin/StatCard";
import ActionCard from "../../../components/admin/ActionCard";
import Loader from "../../../components/loader/loader";
import "./AdminDashboard.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminDashboard() {
  const { stats, loading } = useAdminDashboard();

  const statCards = [
    {
      title: "Produits",
      value: stats.totalProducts,
      icon: "bi-box-seam",
      color: "#667eea",
      link: "/admin/products",
    },
    {
      title: "Bestsellers",
      value: stats.bestsellers,
      icon: "bi-star-fill",
      color: "#f59e0b",
      link: "/admin/products",
    },
    {
      title: "Promotions",
      value: stats.promotions,
      icon: "bi-tag-fill",
      color: "#d32f2f",
      link: "/admin/products",
    },
    {
      title: "Commandes",
      value: stats.totalOrders,
      icon: "bi-cart-check",
      color: "#10b981",
      link: "/admin/orders",
    },
    {
      title: "Livraisons en attente",
      value: stats.pendingDeliveries,
      icon: "bi-truck",
      color: "#3b82f6",
      link: "/admin/deliveries",
    },
  ];

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-dashboard-loading"><Loader /></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>Dashboard</h1>
        <p>Vue d'ensemble de votre boutique</p>
      </div>

      <div className="admin-dashboard-stats">
        <StatCard
          title="Produits"
          value={stats.totalProducts}
          icon="bi-box-seam"
          color="#667eea"
          link="/admin/products"
        />
        <StatCard
          title="Bestsellers"
          value={stats.bestsellers}
          icon="bi-star-fill"
          color="#f59e0b"
          link="/admin/products"
        />
        <StatCard
          title="Promotions"
          value={stats.promotions}
          icon="bi-tag-fill"
          color="#d32f2f"
          link="/admin/products"
        />
        <StatCard
          title="Commandes"
          value={stats.totalOrders}
          icon="bi-cart-check"
          color="#10b981"
          link="/admin/orders"
        />
        <StatCard
          title="Livraisons en attente"
          value={stats.pendingDeliveries}
          icon="bi-truck"
          color="#3b82f6"
          link="/admin/deliveries"
        />
      </div>

      <div className="admin-dashboard-actions">
        <h2>Actions rapides</h2>
        <div className="admin-actions-grid">
          <ActionCard
            icon="bi bi-tag"
            title="Gérer les promotions"
            description="Ajouter ou modifier les promotions et bestsellers"
            link="/admin/products"
          />
          <ActionCard
            icon="bi bi-cart-check"
            title="Voir les commandes"
            description="Consulter l'historique des commandes"
            link="/admin/orders"
          />
          <ActionCard
            icon="bi bi-truck"
            title="Gérer les livraisons"
            description="Suivre et gérer les livraisons"
            link="/admin/deliveries"
          />
          <ActionCard
            icon="bi bi-people"
            title="Gérer les comptes"
            description="Gérer les utilisateurs et les droits admin"
            link="/admin/users"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

