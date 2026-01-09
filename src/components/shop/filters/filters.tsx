import "./filters.scss";

interface FiltersProps {
  onToggleFilter: (category: "exterieur" | "interieur", filter: string) => void;
  isFilterActive: (
    category: "exterieur" | "interieur",
    filter: string
  ) => boolean;
}

function Filters({ onToggleFilter, isFilterActive }: FiltersProps) {
  const exterieurFilters = [
    "Lavage",
    "Roue et pneu",
    "Verre",
    "Produits Extérieur",
    "Polissage et Protection",
  ];

  const interieurFilters = ["Tissus et Tapis", "Peau", "Plastique", "Verre"];

  return (
    <aside className="filters-sidebar">
      <div className="filters-header">
        <img
          src="/images/logoMAFRA.webp"
          alt="Logo MAFRA"
          className="filters-logo"
        />
        <button className="filters-btn">FILTRES</button>
      </div>

      <div className="filters-content">
        <div className="filter-section">
          <h3>PRODUITS EXTÉRIEUR</h3>
          <div className="filter-options">
            {exterieurFilters.map((filter) => (
              <label key={filter} className="filter-option">
                <input
                  type="checkbox"
                  checked={isFilterActive("exterieur", filter)}
                  onChange={() => onToggleFilter("exterieur", filter)}
                />
                <span>{filter}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>PRODUITS INTÉRIEUR</h3>
          <div className="filter-options">
            {interieurFilters.map((filter) => (
              <label key={filter} className="filter-option">
                <input
                  type="checkbox"
                  checked={isFilterActive("interieur", filter)}
                  onChange={() => onToggleFilter("interieur", filter)}
                />
                <span>{filter}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Filters;
