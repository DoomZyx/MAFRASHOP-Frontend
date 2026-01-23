import { useState, useEffect } from "react";
import { getAllUsers, updateUserRole, createAdminUser, AdminUser } from "../../../API/admin/api";
import Loader from "../../../components/loader/loader";
import "./AdminUsers.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [failedAvatars, setFailedAvatars] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "admin" as "user" | "admin",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllUsers();
      if (response.success) {
        setUsers(response.data.users);
      } else {
        setError("Erreur lors du chargement des utilisateurs");
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.email.toLowerCase().includes(term) ||
          user.firstName.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term)
      );
    }

    // Filtre par rôle
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleRoleChange = async (userId: string, newRole: "user" | "admin") => {
    try {
      setUpdatingUserId(userId);
      setError("");
      await updateUserRole(userId, newRole);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour du rôle");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreating(true);
      setError("");
      await createAdminUser(formData);
      setShowCreateModal(false);
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "admin",
      });
      await loadUsers();
    } catch (err: any) {
      setError(err.message || "Erreur lors de la création de l'utilisateur");
    } finally {
      setCreating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageError = (userId: string) => {
    setFailedAvatars((prev) => new Set(prev).add(userId));
  };

  const shouldShowAvatar = (user: AdminUser) => {
    return user.avatar && 
           user.avatar.trim() !== "" && 
           !failedAvatars.has(user.id);
  };

  if (loading) {
    return (
      <div className="admin-users-container">
        <div className="admin-users-loading">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users-container">
      <div className="admin-users-header">
        <div>
          <h1>Gestion des comptes</h1>
          <p>Gérez les utilisateurs et les droits d'administration</p>
        </div>
        <button
          className="admin-users-add-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <i className="bi bi-plus-circle"></i>
          Ajouter un utilisateur
        </button>
      </div>

      {error && <div className="admin-users-error">{error}</div>}

      <div className="admin-users-filters">
        <div className="admin-users-search">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Rechercher par email, prénom ou nom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-users-role-filter">
          <label>
            <i className="bi bi-funnel"></i> Filtrer par rôle :
          </label>
          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value as "all" | "admin" | "user")
            }
          >
            <option value="all">Tous</option>
            <option value="admin">Administrateurs</option>
            <option value="user">Utilisateurs</option>
          </select>
        </div>
      </div>

      <div className="admin-users-stats">
        <div className="admin-users-stat-card">
          <i className="bi bi-people"></i>
          <div>
            <span className="stat-value">{users.length}</span>
            <span className="stat-label">Total utilisateurs</span>
          </div>
        </div>
        <div className="admin-users-stat-card">
          <i className="bi bi-shield-check"></i>
          <div>
            <span className="stat-value">
              {users.filter((u) => u.role === "admin").length}
            </span>
            <span className="stat-label">Administrateurs</span>
          </div>
        </div>
        <div className="admin-users-stat-card">
          <i className="bi bi-person"></i>
          <div>
            <span className="stat-value">
              {users.filter((u) => u.role === "user").length}
            </span>
            <span className="stat-label">Utilisateurs</span>
          </div>
        </div>
      </div>

      <div className="admin-users-table-container">
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Email</th>
              <th>Authentification</th>
              <th>Statut Pro</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="admin-users-empty">
                  <i className="bi bi-inbox"></i>
                  <p>Aucun utilisateur trouvé</p>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="admin-users-user-info">
                      {shouldShowAvatar(user) ? (
                        <img
                          src={user.avatar}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="admin-users-avatar"
                          onError={() => handleImageError(user.id)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="admin-users-avatar-placeholder">
                          <i className="bi bi-person-circle"></i>
                        </div>
                      )}
                      <div>
                        <div className="admin-users-name">
                          {user.firstName} {user.lastName}
                        </div>
                        {user.phone && (
                          <div className="admin-users-phone">{user.phone}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="admin-users-email">
                      {user.email}
                      {user.isVerified && (
                        <span className="admin-users-verified">
                          <i className="bi bi-check-circle-fill"></i>
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`admin-users-auth-badge ${
                        user.authProvider === "google" ? "google" : "local"
                      }`}
                    >
                      <i
                        className={`bi ${
                          user.authProvider === "google"
                            ? "bi-google"
                            : "bi-envelope"
                        }`}
                      ></i>
                      {user.authProvider === "google" ? "Google" : "Email"}
                    </span>
                  </td>
                  <td>
                    {user.isPro ? (
                      <span className="admin-users-pro-badge validated">
                        <i className="bi bi-check-circle"></i> Pro
                      </span>
                    ) : user.proStatus === "pending" ? (
                      <span className="admin-users-pro-badge pending">
                        <i className="bi bi-hourglass-split"></i> En attente
                      </span>
                    ) : (
                      <span className="admin-users-pro-badge none">-</span>
                    )}
                  </td>
                  <td>
                    <select
                      className={`admin-users-role-select ${
                        user.role === "admin" ? "admin" : "user"
                      }`}
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(
                          user.id,
                          e.target.value as "user" | "admin"
                        )
                      }
                      disabled={updatingUserId === user.id}
                    >
                      <option value="user">Utilisateur</option>
                      <option value="admin">Administrateur</option>
                    </select>
                    {updatingUserId === user.id && (
                      <i className="bi bi-arrow-repeat admin-users-updating"></i>
                    )}
                  </td>
                  <td>
                    <div className="admin-users-actions">
                      {user.role === "admin" && (
                        <span className="admin-users-admin-badge">
                          <i className="bi bi-shield-check"></i>
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showCreateModal && (
        <div className="admin-users-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="admin-users-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-users-modal-header">
              <h2>Créer un nouvel utilisateur</h2>
              <button
                className="admin-users-modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="admin-users-modal-form">
              <div className="admin-users-modal-field">
                <label htmlFor="firstName">
                  <i className="bi bi-person"></i> Prénom *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  disabled={creating}
                />
              </div>

              <div className="admin-users-modal-field">
                <label htmlFor="lastName">
                  <i className="bi bi-person"></i> Nom *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  disabled={creating}
                />
              </div>

              <div className="admin-users-modal-field">
                <label htmlFor="email">
                  <i className="bi bi-envelope"></i> Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={creating}
                />
              </div>

              <div className="admin-users-modal-field">
                <label htmlFor="password">
                  <i className="bi bi-lock"></i> Mot de passe * (min. 6 caractères)
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  disabled={creating}
                />
              </div>

              <div className="admin-users-modal-field">
                <label htmlFor="role">
                  <i className="bi bi-shield-check"></i> Rôle *
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  disabled={creating}
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              <div className="admin-users-modal-actions">
                <button
                  type="button"
                  className="admin-users-modal-cancel"
                  onClick={() => setShowCreateModal(false)}
                  disabled={creating}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="admin-users-modal-submit"
                  disabled={creating}
                >
                  {creating ? (
                    <>
                      <i className="bi bi-arrow-repeat admin-users-spinning"></i>
                      Création...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle"></i>
                      Créer l'utilisateur
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
