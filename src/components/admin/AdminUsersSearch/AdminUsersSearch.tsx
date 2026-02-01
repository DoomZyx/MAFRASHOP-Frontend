import "./AdminUsersSearch.scss";

interface AdminUsersSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const AdminUsersSearch = ({ searchTerm, onSearchChange }: AdminUsersSearchProps) => {
  return (
    <div className="admin-users-filters">
      <div className="admin-users-search">
        <i className="bi bi-search"></i>
        <input
          type="text"
          placeholder="Rechercher par email, prénom ou nom..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AdminUsersSearch;
