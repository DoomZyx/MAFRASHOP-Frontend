import "./AdminStockControls.scss";

interface AdminStockControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filter: "all" | "low" | "out";
  onFilterChange: (filter: "all" | "low" | "out") => void;
  lowStockCount: number;
  outOfStockCount: number;
  onToggleHistory: () => void;
}

const AdminStockControls = ({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  lowStockCount,
  outOfStockCount,
  onToggleHistory,
}: AdminStockControlsProps) => {
  return (
    <div className="stock-controls">
      <div className="search-wrapper">
        <i className="bi bi-search"></i>
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher un produit..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => onFilterChange("all")}
        >
          Tous
        </button>
        <button
          className={`filter-btn ${filter === "low" ? "active" : ""}`}
          onClick={() => onFilterChange("low")}
        >
          Stock faible ({lowStockCount})
        </button>
        <button
          className={`filter-btn ${filter === "out" ? "active" : ""}`}
          onClick={() => onFilterChange("out")}
        >
          Rupture ({outOfStockCount})
        </button>
      </div>

      <button className="btn-history" onClick={onToggleHistory}>
        <i className="bi bi-clock-history"></i> Historique
      </button>
    </div>
  );
};

export default AdminStockControls;
