import { useState, useEffect } from "react";
import { getBestsellers } from "../../../API/products/api";
import { Product } from "../../../types/product";
import ProductCard from "../../shared/ProductCard";
import "./bestsellers.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function Bestsellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const MAX_VISIBLE = 3;
  const totalPages = Math.ceil(products.length / MAX_VISIBLE);
  const visibleProducts = products.slice(
    currentIndex * MAX_VISIBLE,
    currentIndex * MAX_VISIBLE + MAX_VISIBLE
  );

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        setLoading(true);
        const data = await getBestsellers();
        setProducts(data);
      } catch (err) {
        setError("Erreur lors du chargement des bestsellers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  // Réinitialiser l'index si nécessaire
  useEffect(() => {
    const maxIndex = Math.ceil(products.length / MAX_VISIBLE) - 1;
    if (currentIndex > maxIndex && maxIndex >= 0) {
      setCurrentIndex(0);
    }
  }, [products.length, currentIndex]);

  if (loading) {
    return (
      <section className="bestsellers-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">NOS BESTSELLERS</h2>
          </div>
          <div className="products-grid">
            <p className="loading-text">Chargement...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return (
      <section className="bestsellers-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">NOS BESTSELLERS</h2>
          </div>
          <div className="products-grid">
            <p className="placeholder-text">
              {error || "Aucun bestseller pour le moment"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bestsellers-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">NOS BESTSELLERS</h2>
          {products.length > MAX_VISIBLE && (
            <div className="navigation-arrows">
              <button
                className="arrow-btn arrow-left"
                aria-label="Précédent"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev > 0 ? prev - 1 : totalPages - 1
                  )
                }
                disabled={totalPages <= 1}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                className="arrow-btn arrow-right"
                aria-label="Suivant"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev < totalPages - 1 ? prev + 1 : 0
                  )
                }
                disabled={totalPages <= 1}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
        <div className="products-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Bestsellers;
