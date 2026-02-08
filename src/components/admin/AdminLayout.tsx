import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import "./AdminLayout.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminLayout() {
  const { adminUser, logout } = useAdminAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fermer le menu lors du changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const menuItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: "bi-speedometer2",
    },
    {
      path: "/admin/products",
      label: "Gestion des produits",
      icon: "bi-tag",
    },
    {
      path: "/admin/stock",
      label: "Gestion des stocks",
      icon: "bi-boxes",
    },
    {
      path: "/admin/stats",
      label: "Statistiques",
      icon: "bi-graph-up",
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
      label: "Gestion des utilisateurs",
      icon: "bi-person",
    },
    {
      path: "/admin/admins",
      label: "Gestion des admins",
      icon: "bi-shield-check",
    },
    {
      path: "/admin/contact",
      label: "Répondre aux clients",
      icon: "bi-envelope-paper",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="admin-layout">
      {/* Overlay pour fermer le menu sur mobile */}
      {isMenuOpen && (
        <div className="admin-sidebar-overlay" onClick={closeMenu}></div>
      )}

      {/* Bouton burger pour mobile/tablette */}
      <button
        className="admin-menu-burger"
        onClick={toggleMenu}
        aria-label="Ouvrir le menu"
      >
        <i className={`bi ${isMenuOpen ? "bi-x-lg" : "bi-list"}`}></i>
      </button>

      <aside className={`admin-sidebar ${isMenuOpen ? "admin-sidebar--open" : ""}`}>
        <div className="admin-sidebar-header">
          <h2>
            <i className="bi bi-shield-lock"></i> Admin
          </h2>
          <button
            className="admin-sidebar-close"
            onClick={closeMenu}
            aria-label="Fermer le menu"
          >
            <i className="bi bi-x-lg"></i>
          </button>
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

