import "./AdminUsers.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminUsers() {
  return (
    <div className="admin-users-container">
      <div className="admin-users-header">
        <h1>Gestion des comptes</h1>
        <p>Gérez les utilisateurs et les droits d'administration</p>
      </div>

      <div className="admin-users-placeholder">
        <i className="bi bi-people"></i>
        <h2>Fonctionnalité à venir</h2>
        <p>La gestion des comptes sera bientôt disponible</p>
      </div>
    </div>
  );
}

export default AdminUsers;

