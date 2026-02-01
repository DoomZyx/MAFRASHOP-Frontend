import "./AdminProductsSearch.scss";

interface AdminProductsSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const AdminProductsSearch = ({
  searchQuery,
  onSearchChange,
}: AdminProductsSearchProps) => {
  return (
    <div className="products-search">
      <div className="search-input-wrapper">
        <i className="bi bi-search"></i>
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher un produit (nom, référence, SKU, catégorie...)"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={() => onSearchChange("")}
            title="Effacer la recherche"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminProductsSearch;
