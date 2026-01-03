import { Link } from "react-router-dom";
import { useProducts } from "../../../hooks/useProducts";
import { useFilters } from "../../../hooks/useFilters";
import Filters from "../filters/filters";
import "./catalogue.scss";

function Catalogue() {
  const { products, loading, error } = useProducts();
  const { toggleFilter, isFilterActive } = useFilters();

  if (loading) {
    return (
      <div className="catalogue-container">
        <p>Chargement des produits...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalogue-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="catalogue-container">
      <Filters onToggleFilter={toggleFilter} isFilterActive={isFilterActive} />
      <div className="catalogue-content">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="product-card"
          >
            {product.URL_IMAGE && (
              <img src={product.URL_IMAGE} alt={product.NOM} />
            )}
            {product.CATEGORY && (
              <p className="product-category">{product.CATEGORY}</p>
            )}
            <h3>{product.NOM}</h3>
            {product.FORMAT && (
              <p className="product-format">{product.FORMAT}</p>
            )}
            <p className="product-price">
              {product.PUBLIC_HT !== null
                ? `${product.PUBLIC_HT.toFixed(2)}€ HT`
                : "Prix non disponible"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Catalogue;
