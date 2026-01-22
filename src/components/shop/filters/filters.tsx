import "./filters.scss";
import { CategoryType } from "../../../hooks/useFilters";

interface FiltersProps {
  onToggleFilter: (category: CategoryType, filter: string) => void;
  isFilterActive: (category: CategoryType, filter: string) => boolean;
}

function Filters({ onToggleFilter, isFilterActive }: FiltersProps) {
  const exterieurFilters = [
    "Carrosserie",
    "Détachants spécifiques",
    "Jantes & Pneus",
    "Nettoyants spécialisés",
  ];

  const interieurFilters = [
    "Plastiques & Tableaux de bord",
    "Cuir",
    "Tissus & Moquettes",
    "Protection & Imperméabilisation",
  ];

  const accessoiresFilters = [
    "Parfums d'ambiance",
    "Chiffons & Accessoires",
    "Lubrifiants & Entretien mécanique",
    "Nettoyants mains",
    "Nettoyants sols & Dégraissants",
  ];

  const interieurExterieurFilters = ["Vitres & Surfaces"];

  const kitFilters = ["Kits cuir", "Kits polissage"];

  return (
    <aside className="filters-sidebar">
      <div className="filters-header">
        <img
          src="/images/logoMAFRA.webp"
          alt="Logo MAFRA"
          className="filters-logo"
        />
      </div>

      <div className="filters-content">
        <div className="filter-section">
          <h3>ACCESSOIRES</h3>
          <div className="filter-options">
            {accessoiresFilters.map((filter) => (
              <label key={filter} className="filter-option">
                <input
                  type="checkbox"
                  checked={isFilterActive("accessoires", filter)}
                  onChange={() => onToggleFilter("accessoires", filter)}
                />
                <span>{filter}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>EXTÉRIEUR</h3>
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
          <h3>INTÉRIEUR</h3>
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

        <div className="filter-section">
          <h3>INTÉRIEUR / EXTÉRIEUR</h3>
          <div className="filter-options">
            {interieurExterieurFilters.map((filter) => (
              <label key={filter} className="filter-option">
                <input
                  type="checkbox"
                  checked={isFilterActive("interieur_exterieur", filter)}
                  onChange={() =>
                    onToggleFilter("interieur_exterieur", filter)
                  }
                />
                <span>{filter}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>KIT</h3>
          <div className="filter-options">
            {kitFilters.map((filter) => (
              <label key={filter} className="filter-option">
                <input
                  type="checkbox"
                  checked={isFilterActive("kit", filter)}
                  onChange={() => onToggleFilter("kit", filter)}
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
