import { Link, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import "./AdminLayout.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminLayout() {
  const { adminUser, logout } = useAdminAuth();
  const location = useLocation();

  const menuItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: "bi-speedometer2",
    },
    {
      path: "/admin/products",
      label: "Promotions & Bestsellers",
      icon: "bi-tag",
    },
    {
      path: "/admin/orders",
      label: "Commandes",
      icon: "bi-cart-check",
    },
    {
      path: "/admin/deliveries",
      label: "Livraisons",
      icon: "bi-truck",
    },
    {
      path: "/admin/users",
      label: "Gestion des comptes",
      icon: "bi-people",
    },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>
            <i className="bi bi-shield-lock"></i> Admin
          </h2>
        </div>

        <nav className="admin-nav">
          {menuItems.map((item) => {
            // Pour le Dashboard, vérifier si on est exactement sur /admin
            const isActive =
              item.path === "/admin"
                ? location.pathname === "/admin"
                : location.pathname === item.path ||
                  location.pathname.startsWith(item.path + "/");

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav-item ${isActive ? "active" : ""}`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <i className="bi bi-person-circle"></i>
            <span>{adminUser?.email}</span>
          </div>
          <button onClick={logout} className="admin-logout-btn">
            <i className="bi bi-box-arrow-right"></i>
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;

