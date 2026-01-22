import { CategoryType } from "../../../hooks/useFilters";
import "./filtersModal.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleFilter: (category: CategoryType, filter: string) => void;
  isFilterActive: (category: CategoryType, filter: string) => boolean;
  onClearFilters: () => void;
}

function FiltersModal({
  isOpen,
  onClose,
  onToggleFilter,
  isFilterActive,
  onClearFilters,
}: FiltersModalProps) {
  if (!isOpen) return null;

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
    <div className="filters-modal-overlay" onClick={onClose}>
      <div className="filters-modal" onClick={(e) => e.stopPropagation()}>
        <div className="filters-modal-header">
          <h2 className="filters-modal-title">FILTRES</h2>
          <button className="filters-modal-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="filters-modal-content">
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

        <div className="filters-modal-footer">
          <button className="filters-clear-btn" onClick={onClearFilters}>
            RÉINITIALISER
          </button>
          <button className="filters-apply-btn" onClick={onClose}>
            APPLIQUER
          </button>
        </div>
      </div>
    </div>
  );
}

export default FiltersModal;

