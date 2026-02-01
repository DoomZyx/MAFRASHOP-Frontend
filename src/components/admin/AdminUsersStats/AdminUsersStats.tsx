import "./AdminUsersStats.scss";

interface AdminUsersStatsProps {
  totalUsers: number;
  pendingProCount: number;
}

const AdminUsersStats = ({ totalUsers, pendingProCount }: AdminUsersStatsProps) => {
  return (
    <div className="admin-users-stats">
      <div className="admin-users-stat-card">
        <i className="bi bi-person"></i>
        <div>
          <span className="stat-value">{totalUsers}</span>
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
  );
};

export default AdminUsersStats;
