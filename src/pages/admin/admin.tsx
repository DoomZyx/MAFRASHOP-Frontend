import { useState, useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types/product";
import { API_BASE_URL } from "../../API/config";
import "./admin.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function Admin() {
  const { products: initialProducts, loading } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [updating, setUpdating] = useState<Record<string, boolean>>({});
  const [promotionPercentages, setPromotionPercentages] = useState<Record<string, number | null>>({});

  // Synchroniser les produits initiaux avec l'état local
  useEffect(() => {
    if (initialProducts.length > 0) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  const handleToggleBestseller = async (product: Product) => {
    setUpdating((prev) => ({ ...prev, [`bestseller-${product.id}`]: true }));
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/${product.id}/bestseller`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_bestseller: !product.is_bestseller,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      const updatedProduct: Product = await response.json();
      
      // Mettre à jour l'état local
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updatedProduct : p))
      );
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise à jour du statut bestseller");
    } finally {
      setUpdating((prev) => ({
        ...prev,
        [`bestseller-${product.id}`]: false,
      }));
    }
  };

  const handleTogglePromotion = async (product: Product, percentage: number | null = null) => {
    setUpdating((prev) => ({ ...prev, [`promotion-${product.id}`]: true }));
    try {
      const isPromotion = !product.is_promotion;
      let promotionPercentage = null;
      
      if (isPromotion) {
        // Si on active la promotion, utiliser le pourcentage fourni ou celui existant
        promotionPercentage = percentage ?? product.promotion_percentage ?? null;
        // S'assurer que ce n'est pas NaN
        if (promotionPercentage !== null && (isNaN(promotionPercentage) || promotionPercentage < 0 || promotionPercentage > 100)) {
          promotionPercentage = null;
        }
      }

      const response = await fetch(
        `${API_BASE_URL}/products/${product.id}/promotion`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_promotion: isPromotion,
            promotion_percentage: promotionPercentage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      const updatedProduct: Product = await response.json();
      
      // Mettre à jour l'état local
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updatedProduct : p))
      );
      
      // Réinitialiser le pourcentage en cours de saisie si sauvegardé
      if (promotionPercentage !== null) {
        setPromotionPercentages((prev) => ({
          ...prev,
          [product.id]: null,
        }));
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise à jour du statut promotion");
    } finally {
      setUpdating((prev) => ({
        ...prev,
        [`promotion-${product.id}`]: false,
      }));
    }
  };

  const handlePercentageChange = (productId: string, value: string) => {
    const numValue = value === "" ? null : parseInt(value);
    if (numValue !== null && (isNaN(numValue) || numValue < 0 || numValue > 100)) {
      return;
    }
    setPromotionPercentages((prev) => ({
      ...prev,
      [productId]: numValue,
    }));
  };

  const handleSavePromotion = (product: Product) => {
    const percentageValue = promotionPercentages[product.id];
    const percentage = 
      percentageValue !== undefined && percentageValue !== null && !isNaN(percentageValue)
        ? percentageValue
        : product.promotion_percentage ?? null;
    
    if (percentage !== null && (percentage < 0 || percentage > 100)) {
      alert("Le pourcentage doit être entre 0 et 100");
      return;
    }
    
    handleTogglePromotion(product, percentage);
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="admin-loading">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Gestion des Bestsellers et Promotions</h1>
        <p>Sélectionnez les produits à afficher dans les sections bestsellers et promotions</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Bestsellers</h3>
          <p className="stat-number">
            {products.filter((p) => p.is_bestseller).length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Promotions</h3>
          <p className="stat-number">
            {products.filter((p) => p.is_promotion).length}
          </p>
        </div>
      </div>

      <div className="admin-products">
        <div className="products-header">
          <h2>Tous les produits ({products.length})</h2>
          <div className="filter-badges">
            <span className="badge bestseller-badge">
              <i className="bi bi-star-fill"></i> Bestseller
            </span>
            <span className="badge promotion-badge">
              <i className="bi bi-tag-fill"></i> Promotion
            </span>
          </div>
        </div>

        <div className="products-list">
          {products.map((product) => (
            <div key={product.id} className="product-admin-card">
              <div className="product-image">
                {product.url_image ? (
                  <img src={product.url_image} alt={product.nom} />
                ) : (
                  <div className="no-image">
                    <i className="bi bi-image"></i>
                  </div>
                )}
              </div>

              <div className="product-info">
                <h3>{product.nom}</h3>
                <p className="product-ref">Ref: {product.ref}</p>
                {product.category && (
                  <p className="product-category">{product.category}</p>
                )}
              </div>

              <div className="product-actions">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={product.is_bestseller || false}
                    onChange={() => handleToggleBestseller(product)}
                    disabled={
                      updating[`bestseller-${product.id}`] || false
                    }
                  />
                  <span className="toggle-label">
                    <i className="bi bi-star-fill"></i>
                    Bestseller
                  </span>
                </label>

                <div className="promotion-control">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={product.is_promotion || false}
                      onChange={(e) => {
                        if (e.target.checked) {
                          // Si on active la promotion, on initialise le pourcentage si nécessaire
                          const currentPercentage = product.promotion_percentage ?? null;
                          if (currentPercentage === null) {
                            // Si pas de pourcentage, on initialise à null pour afficher l'input
                            setPromotionPercentages((prev) => ({
                              ...prev,
                              [product.id]: null,
                            }));
                          }
                          // On active la promotion avec le pourcentage existant
                          handleTogglePromotion(product, currentPercentage);
                        } else {
                          // Si on désactive, on enlève le pourcentage
                          handleTogglePromotion(product, null);
                        }
                      }}
                      disabled={
                        updating[`promotion-${product.id}`] || false
                      }
                    />
                    <span className="toggle-label">
                      <i className="bi bi-tag-fill"></i>
                      Promotion
                    </span>
                  </label>
                  
                  {product.is_promotion && (
                    <div className="promotion-percentage-input">
                      <label>
                        <span>Pourcentage de réduction:</span>
                        <div className="percentage-input-group">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={
                              promotionPercentages[product.id] !== undefined
                                ? promotionPercentages[product.id] ?? ""
                                : product.promotion_percentage ?? ""
                            }
                            onChange={(e) =>
                              handlePercentageChange(product.id, e.target.value)
                            }
                            placeholder="0"
                            disabled={updating[`promotion-${product.id}`] || false}
                          />
                          <span className="percentage-symbol">%</span>
                          <button
                            className="save-percentage-btn"
                            onClick={() => handleSavePromotion(product)}
                            disabled={
                              updating[`promotion-${product.id}`] || false
                            }
                            title="Sauvegarder le pourcentage"
                          >
                            <i className="bi bi-check-lg"></i>
                          </button>
                        </div>
                      </label>
                      {product.promotion_percentage !== null && (
                        <span className="current-percentage">
                          Actuel: {product.promotion_percentage}%
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;

