import { useState, useEffect } from "react";
import {
  getAllUsers,
  updateUserRole,
  createAdminUser,
  validateProUser,
  retryProInsee,
  AdminUser,
} from "../../../API/admin/api";
import Loader from "../../../components/loader/loader";
import "./AdminAdmins.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminAdmins() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [proActionUserId, setProActionUserId] = useState<string | null>(null);
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
    loadAdmins();
  }, []);

  useEffect(() => {
    filterAdmins();
  }, [admins, searchTerm]);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllUsers();
      if (response.success) {
        const onlyAdmins = (response.data.users as AdminUser[]).filter(
          (u) => u.role === "admin"
        );
        setAdmins(onlyAdmins);
      } else {
        setError("Erreur lors du chargement des administrateurs");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement des administrateurs"
      );
    } finally {
      setLoading(false);
    }
  };

  const filterAdmins = () => {
    let filtered = [...admins];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.email.toLowerCase().includes(term) ||
          user.firstName.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term)
      );
    }
    setFilteredAdmins(filtered);
  };

  const handleValidatePro = async (userId: string, approved: boolean) => {
    try {
      setProActionUserId(userId);
      setError("");
      await validateProUser(userId, approved);
      await loadAdmins();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la décision"
      );
    } finally {
      setProActionUserId(null);
    }
  };

  const handleRetryInsee = async (userId: string) => {
    try {
      setProActionUserId(userId);
      setError("");
      await retryProInsee(userId);
      await loadAdmins();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la reprise INSEE"
      );
    } finally {
      setProActionUserId(null);
    }
  };

  const handleDemoteToUser = async (userId: string) => {
    try {
      setUpdatingUserId(userId);
      setError("");
      await updateUserRole(userId, "user");
      await loadAdmins();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la rétrogradation"
      );
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
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
      await loadAdmins();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la création de l'administrateur"
      );
    } finally {
      setCreating(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    return (
      user.avatar &&
      user.avatar.trim() !== "" &&
      !failedAvatars.has(user.id)
    );
  };

  if (loading) {
    return (
      <div className="admin-admins-container">
        <div className="admin-admins-loading">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-admins-container">
      <div className="admin-admins-header">
        <div>
          <h1>Gestion des admins</h1>
          <p>Administrateurs et droits d'accès au back-office</p>
        </div>
        <button
          className="admin-admins-add-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <i className="bi bi-plus-circle"></i>
          Ajouter un administrateur
        </button>
      </div>

      {error && <div className="admin-admins-error">{error}</div>}

      <div className="admin-admins-filters">
        <div className="admin-admins-search">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Rechercher par email, prénom ou nom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-admins-stats">
        <div className="admin-admins-stat-card">
          <i className="bi bi-shield-check"></i>
          <div>
            <span className="stat-value">{admins.length}</span>
            <span className="stat-label">Administrateurs</span>
          </div>
        </div>
      </div>

      <div className="admin-admins-table-container">
        <table className="admin-admins-table">
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
            {filteredAdmins.length === 0 ? (
              <tr>
                <td colSpan={5} className="admin-admins-empty">
                  <i className="bi bi-inbox"></i>
                  <p>Aucun administrateur trouvé</p>
                </td>
              </tr>
            ) : (
              filteredAdmins.flatMap((user) => [
                <tr key={user.id}>
                  <td>
                    <div className="admin-admins-user-info">
                      {shouldShowAvatar(user) ? (
                        <img
                          src={user.avatar}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="admin-admins-avatar"
                          onError={() => handleImageError(user.id)}
                          loading="lazy"
                        />
                      ) : (
                        <div className="admin-admins-avatar-placeholder">
                          <i className="bi bi-person-circle"></i>
                        </div>
                      )}
                      <div>
                        <div className="admin-admins-name">
                          {user.firstName} {user.lastName}
                        </div>
                        {user.phone && (
                          <div className="admin-admins-phone">{user.phone}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="admin-admins-email">
                      {user.email}
                      {user.isVerified && (
                        <span className="admin-admins-verified">
                          <i className="bi bi-check-circle-fill"></i>
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`admin-admins-auth-badge ${
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
                      <span className="admin-admins-pro-badge validated">
                        <i className="bi bi-check-circle"></i> Pro
                      </span>
                    ) : user.proStatus === "pending" ? (
                      <span className="admin-admins-pro-badge pending">
                        <i className="bi bi-hourglass-split"></i>
                        {user.verificationMode === "manual"
                          ? "En attente (manuel)"
                          : "En attente"}
                      </span>
                    ) : user.proStatus === "rejected" ? (
                      <span className="admin-admins-pro-badge rejected">
                        Refusé
                      </span>
                    ) : (
                      <span className="admin-admins-pro-badge none">-</span>
                    )}
                  </td>
                  <td>
                    <div className="admin-admins-actions">
                      <span className="admin-admins-admin-badge">
                        <i className="bi bi-shield-check"></i> Admin
                      </span>
                      <button
                        type="button"
                        className="admin-admins-demote-btn"
                        onClick={() => handleDemoteToUser(user.id)}
                        disabled={updatingUserId === user.id}
                        title="Rétrograder en utilisateur"
                      >
                        <i className="bi bi-arrow-down-circle"></i> Rétrograder
                        en utilisateur
                      </button>
                      {user.proStatus === "pending" &&
                        user.decisionSource == null && (
                          <div className="admin-admins-pro-actions">
                            <button
                              type="button"
                              className="admin-admins-pro-btn validate"
                              onClick={() => handleValidatePro(user.id, true)}
                              disabled={proActionUserId === user.id}
                            >
                              <i className="bi bi-check-circle"></i> Valider pro
                            </button>
                            <button
                              type="button"
                              className="admin-admins-pro-btn reject"
                              onClick={() => handleValidatePro(user.id, false)}
                              disabled={proActionUserId === user.id}
                            >
                              <i className="bi bi-x-circle"></i> Refuser
                            </button>
                            {user.verificationMode === "manual" && (
                              <button
                                type="button"
                                className="admin-admins-pro-btn retry"
                                onClick={() => handleRetryInsee(user.id)}
                                disabled={proActionUserId === user.id}
                              >
                                <i className="bi bi-arrow-repeat"></i> Retenter
                                INSEE
                              </button>
                            )}
                          </div>
                        )}
                      {updatingUserId === user.id && (
                        <i className="bi bi-arrow-repeat admin-admins-updating"></i>
                      )}
                    </div>
                  </td>
                </tr>,
                user.proStatus === "pending" && user.company ? (
                  <tr key={`${user.id}-company`} className="admin-admins-company-row">
                    <td colSpan={5}>
                      <div className="admin-admins-company-block">
                        <h4 className="admin-admins-company-title">
                          <i className="bi bi-building"></i> Données entreprise
                          (vérification manuelle)
                        </h4>
                        <p className="admin-admins-company-insee-link">
                          Vérifier le SIRET sur le site INSEE :{" "}
                          <a
                            href="https://avis-situation-sirene.insee.fr/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Vérifier ici
                          </a>
                        </p>
                        <div className="admin-admins-company-grid">
                          <div className="admin-admins-company-item">
                            <span className="admin-admins-company-label">
                              Nom de l'entreprise
                            </span>
                            <span className="admin-admins-company-value">
                              {user.company.name || "-"}
                            </span>
                          </div>
                          <div className="admin-admins-company-item">
                            <span className="admin-admins-company-label">
                              SIRET
                            </span>
                            <span className="admin-admins-company-value">
                              {user.company.siret || "-"}
                            </span>
                          </div>
                          <div className="admin-admins-company-item">
                            <span className="admin-admins-company-label">
                              Adresse
                            </span>
                            <span className="admin-admins-company-value">
                              {user.company.address || "-"}
                            </span>
                          </div>
                          <div className="admin-admins-company-item">
                            <span className="admin-admins-company-label">
                              Ville
                            </span>
                            <span className="admin-admins-company-value">
                              {user.company.city || "-"}
                            </span>
                          </div>
                          <div className="admin-admins-company-item">
                            <span className="admin-admins-company-label">
                              Code postal
                            </span>
                            <span className="admin-admins-company-value">
                              {user.company.zipCode || "-"}
                            </span>
                          </div>
                          <div className="admin-admins-company-item">
                            <span className="admin-admins-company-label">
                              Téléphone entreprise
                            </span>
                            <span className="admin-admins-company-value">
                              {user.company.phone || "-"}
                            </span>
                          </div>
                          <div className="admin-admins-company-item">
                            <span className="admin-admins-company-label">
                              Email entreprise
                            </span>
                            <span className="admin-admins-company-value">
                              {user.company.email || "-"}
                            </span>
                          </div>
                        </div>
                        {user.decisionSource == null && (
                          <div className="admin-admins-company-actions">
                            <button
                              type="button"
                              className="admin-admins-pro-btn validate"
                              onClick={() => handleValidatePro(user.id, true)}
                              disabled={proActionUserId === user.id}
                            >
                              <i className="bi bi-check-circle"></i> Valider le
                              compte pro
                            </button>
                            <button
                              type="button"
                              className="admin-admins-pro-btn reject"
                              onClick={() => handleValidatePro(user.id, false)}
                              disabled={proActionUserId === user.id}
                            >
                              <i className="bi bi-x-circle"></i> Refuser
                            </button>
                            {user.verificationMode === "manual" && (
                              <button
                                type="button"
                                className="admin-admins-pro-btn retry"
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
                ) : null,
              ])
            )}
          </tbody>
        </table>
      </div>

      {showCreateModal && (
        <div
          className="admin-admins-modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="admin-admins-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-admins-modal-header">
              <h2>Créer un nouvel administrateur</h2>
              <button
                className="admin-admins-modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form
              onSubmit={handleCreateAdmin}
              className="admin-admins-modal-form"
            >
              <div className="admin-admins-modal-field">
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

              <div className="admin-admins-modal-field">
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

              <div className="admin-admins-modal-field">
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

              <div className="admin-admins-modal-field">
                <label htmlFor="password">
                  <i className="bi bi-lock"></i> Mot de passe * (min. 6
                  caractères)
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

              <div className="admin-admins-modal-actions">
                <button
                  type="button"
                  className="admin-admins-modal-cancel"
                  onClick={() => setShowCreateModal(false)}
                  disabled={creating}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="admin-admins-modal-submit"
                  disabled={creating}
                >
                  {creating ? (
                    <>
                      <i className="bi bi-arrow-repeat admin-admins-spinning"></i>
                      Création...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle"></i>
                      Créer l'administrateur
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

export default AdminAdmins;
