import { useAdminAdmins } from "../../../hooks/useAdminAdmins";
import AdminAdminRow from "../../../components/admin/AdminAdminRow/AdminAdminRow";
import AdminCreateAdminModal from "../../../components/admin/AdminCreateAdminModal/AdminCreateAdminModal";
import Loader from "../../../components/loader/loader";
import "./AdminAdmins.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminAdmins() {
  const {
    admins,
    filteredAdmins,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    updatingUserId,
    proActionUserId,
    showCreateModal,
    setShowCreateModal,
    creating,
    formData,
    handleValidatePro,
    handleRetryInsee,
    handleDemoteToUser,
    handleCreateAdmin,
    handleInputChange,
    handleImageError,
    shouldShowAvatar,
  } = useAdminAdmins();

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
              filteredAdmins.map((user) => (
                <AdminAdminRow
                  key={user.id}
                  user={user}
                  shouldShowAvatar={shouldShowAvatar}
                  onImageError={handleImageError}
                  onDemoteToUser={handleDemoteToUser}
                  onValidatePro={handleValidatePro}
                  onRetryInsee={handleRetryInsee}
                  updatingUserId={updatingUserId}
                  proActionUserId={proActionUserId}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {showCreateModal && (
        <AdminCreateAdminModal
          formData={formData}
          creating={creating}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateAdmin}
          onInputChange={handleInputChange}
        />
      )}
    </div>
  );
}

export default AdminAdmins;
