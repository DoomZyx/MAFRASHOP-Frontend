import { useAdminUsers } from "../../../hooks/useAdminUsers";
import AdminUsersStats from "../../../components/admin/AdminUsersStats/AdminUsersStats";
import AdminUsersSearch from "../../../components/admin/AdminUsersSearch/AdminUsersSearch";
import AdminUserRow from "../../../components/admin/AdminUserRow/AdminUserRow";
import Loader from "../../../components/loader/loader";
import "./AdminUsers.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminUsers() {
  const {
    users,
    filteredUsers,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    proActionUserId,
    vatActionUserId,
    pendingProCount,
    handleValidatePro,
    handleRetryInsee,
    handleValidateVat,
    handleImageError,
    shouldShowAvatar,
  } = useAdminUsers();

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

      <AdminUsersSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <AdminUsersStats totalUsers={users.length} pendingProCount={pendingProCount} />

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
                <AdminUserRow
                  key={user.id}
                  user={user}
                  shouldShowAvatar={shouldShowAvatar}
                  onImageError={handleImageError}
                  onValidatePro={handleValidatePro}
                  onRetryInsee={handleRetryInsee}
                  onValidateVat={handleValidateVat}
                  proActionUserId={proActionUserId}
                  vatActionUserId={vatActionUserId}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
