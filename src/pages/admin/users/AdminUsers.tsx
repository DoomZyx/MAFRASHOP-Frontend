import { useState, useEffect, Fragment } from "react";
import { getAllUsers, validateProUser, retryProInsee, AdminUser } from "../../../API/admin/api";
import Loader from "../../../components/loader/loader";
import "./AdminUsers.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [proActionUserId, setProActionUserId] = useState<string | null>(null);
  const [failedAvatars, setFailedAvatars] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllUsers();
      if (response.success) {
        const onlyUsers = (response.data.users as AdminUser[]).filter((u) => u.role === "user");
        setUsers(onlyUsers);
      } else {
        setError("Erreur lors du chargement des utilisateurs");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.email.toLowerCase().includes(term) ||
          user.firstName.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term)
      );
    }
    setFilteredUsers(filtered);
  };

  const handleValidatePro = async (userId: string, approved: boolean) => {
    try {
      setProActionUserId(userId);
      setError("");
      await validateProUser(userId, approved);
      await loadUsers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de la décision");
    } finally {
      setProActionUserId(null);
    }
  };

  const handleRetryInsee = async (userId: string) => {
    try {
      setProActionUserId(userId);
      setError("");
      await retryProInsee(userId);
      await loadUsers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de la reprise INSEE");
    } finally {
      setProActionUserId(null);
    }
  };

  const handleImageError = (userId: string) => {
    setFailedAvatars((prev) => new Set(prev).add(userId));
  };

  const shouldShowAvatar = (user: AdminUser) => {
    return (
      user.avatar &&
      user.avatar.trim() !== "" &&
      !failedAvatars.has(user.id)
    );
  };

  const pendingProCount = users.filter(
    (u) => u.proStatus === "pending" && u.decisionSource == null
  ).length;

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
          <h1>Gestion des utilisateurs</h1>
          <p>Utilisateurs du site et demandes de compte professionnel</p>
        </div>
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
      </div>

      <div className="admin-users-stats">
        <div className="admin-users-stat-card">
          <i className="bi bi-person"></i>
          <div>
            <span className="stat-value">{users.length}</span>
            <span className="stat-label">Utilisateurs</span>
          </div>
        </div>
        <div className="admin-users-stat-card">
          <i className="bi bi-hourglass-split"></i>
          <div>
            <span className="stat-value">{pendingProCount}</span>
            <span className="stat-label">En attente vérification pro</span>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="admin-users-empty">
                  <i className="bi bi-inbox"></i>
                  <p>Aucun utilisateur trouvé</p>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <Fragment key={user.id}>
                  <tr>
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
                          <i className="bi bi-hourglass-split"></i>
                          {user.verificationMode === "manual"
                            ? "En attente (manuel)"
                            : "En attente"}
                        </span>
                      ) : user.proStatus === "rejected" ? (
                        <span className="admin-users-pro-badge rejected">
                          Refusé
                        </span>
                      ) : (
                        <span className="admin-users-pro-badge none">-</span>
                      )}
                    </td>
                    <td>
                      <div className="admin-users-actions">
                        {user.proStatus === "pending" &&
                          user.decisionSource == null && (
                            <div className="admin-users-pro-actions">
                              <button
                                type="button"
                                className="admin-users-pro-btn validate"
                                onClick={() => handleValidatePro(user.id, true)}
                                disabled={proActionUserId === user.id}
                                title="Valider le compte pro"
                              >
                                <i className="bi bi-check-circle"></i> Valider pro
                              </button>
                              <button
                                type="button"
                                className="admin-users-pro-btn reject"
                                onClick={() => handleValidatePro(user.id, false)}
                                disabled={proActionUserId === user.id}
                                title="Refuser le compte pro"
                              >
                                <i className="bi bi-x-circle"></i> Refuser
                              </button>
                              {user.verificationMode === "manual" && (
                                <button
                                  type="button"
                                  className="admin-users-pro-btn retry"
                                  onClick={() => handleRetryInsee(user.id)}
                                  disabled={proActionUserId === user.id}
                                  title="Retenter la vérification INSEE"
                                >
                                  <i className="bi bi-arrow-repeat"></i> Retenter
                                  INSEE
                                </button>
                              )}
                            </div>
                          )}
                      </div>
                    </td>
                  </tr>
                  {user.proStatus === "pending" && user.company && (
                    <tr key={`${user.id}-company`} className="admin-users-company-row">
                      <td colSpan={5}>
                        <div className="admin-users-company-block">
                          <h4 className="admin-users-company-title">
                            <i className="bi bi-building"></i> Données entreprise
                            (vérification manuelle)
                          </h4>
                          <p className="admin-users-company-insee-link">
                            Vérifier le SIRET sur le site INSEE :{" "}
                            <a
                              href="https://avis-situation-sirene.insee.fr/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Vérifier ici
                            </a>
                          </p>
                          <div className="admin-users-company-grid">
                            <div className="admin-users-company-item">
                              <span className="admin-users-company-label">
                                Nom de l'entreprise
                              </span>
                              <span className="admin-users-company-value">
                                {user.company.name || "-"}
                              </span>
                            </div>
                            <div className="admin-users-company-item">
                              <span className="admin-users-company-label">
                                SIRET
                              </span>
                              <span className="admin-users-company-value">
                                {user.company.siret || "-"}
                              </span>
                            </div>
                            <div className="admin-users-company-item">
                              <span className="admin-users-company-label">
                                Adresse
                              </span>
                              <span className="admin-users-company-value">
                                {user.company.address || "-"}
                              </span>
                            </div>
                            <div className="admin-users-company-item">
                              <span className="admin-users-company-label">
                                Ville
                              </span>
                              <span className="admin-users-company-value">
                                {user.company.city || "-"}
                              </span>
                            </div>
                            <div className="admin-users-company-item">
                              <span className="admin-users-company-label">
                                Code postal
                              </span>
                              <span className="admin-users-company-value">
                                {user.company.zipCode || "-"}
                              </span>
                            </div>
                            <div className="admin-users-company-item">
                              <span className="admin-users-company-label">
                                Téléphone entreprise
                              </span>
                              <span className="admin-users-company-value">
                                {user.company.phone || "-"}
                              </span>
                            </div>
                            <div className="admin-users-company-item">
                              <span className="admin-users-company-label">
                                Email entreprise
                              </span>
                              <span className="admin-users-company-value">
                                {user.company.email || "-"}
                              </span>
                            </div>
                          </div>
                          {user.decisionSource == null && (
                            <div className="admin-users-company-actions">
                              <button
                                type="button"
                                className="admin-users-pro-btn validate"
                                onClick={() => handleValidatePro(user.id, true)}
                                disabled={proActionUserId === user.id}
                              >
                                <i className="bi bi-check-circle"></i> Valider le
                                compte pro
                              </button>
                              <button
                                type="button"
                                className="admin-users-pro-btn reject"
                                onClick={() => handleValidatePro(user.id, false)}
                                disabled={proActionUserId === user.id}
                              >
                                <i className="bi bi-x-circle"></i> Refuser
                              </button>
                              {user.verificationMode === "manual" && (
                                <button
                                  type="button"
                                  className="admin-users-pro-btn retry"
                                  onClick={() => handleRetryInsee(user.id)}
                                  disabled={proActionUserId === user.id}
                                >
                                  <i className="bi bi-arrow-repeat"></i> Retenter
                                  INSEE
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
