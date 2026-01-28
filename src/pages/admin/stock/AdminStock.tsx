import { useState, useEffect } from "react";
import { adminStockAPI } from "../../../API/admin/stock";
import { StockProduct, StockMovement } from "../../../types/stock";
import "./AdminStock.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Loader from "../../../components/loader/loader";

function AdminStock() {
  const [products, setProducts] = useState<StockProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<StockMovement[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<StockProduct | null>(null);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockForm, setStockForm] = useState({
    quantity: "",
    movementType: "adjustment" as "entry" | "exit" | "adjustment" | "sale" | "return",
    reason: "",
  });
  const [updating, setUpdating] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "low" | "out">("all");

  useEffect(() => {
    loadProducts();
    loadHistory();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await adminStockAPI.getAllProductsStock();
      setProducts(response.data.products);
    } catch (error: any) {
      console.error("Erreur:", error);
      alert("Erreur lors du chargement des produits");
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async (productId?: string) => {
    try {
      const response = await adminStockAPI.getStockHistory(productId, 50, 0);
      setHistory(response.data.movements);
    } catch (error: any) {
      console.error("Erreur:", error);
    }
  };

  const handleUpdateStock = async (product: StockProduct) => {
    if (!stockForm.quantity || isNaN(parseInt(stockForm.quantity, 10))) {
      alert("Veuillez saisir une quantité valide");
      return;
    }

    setUpdating(product.id);
    try {
      await adminStockAPI.updateProductStock(product.id, {
        quantity: parseInt(stockForm.quantity, 10),
        movementType: stockForm.movementType,
        reason: stockForm.reason || undefined,
      });

      await loadProducts();
      await loadHistory(product.id);
      setShowStockModal(false);
      setStockForm({ quantity: "", movementType: "adjustment", reason: "" });
      setSelectedProduct(null);
    } catch (error: any) {
      alert(error.message || "Erreur lors de la mise à jour du stock");
    } finally {
      setUpdating(null);
    }
  };

  const handleOpenStockModal = (product: StockProduct) => {
    setSelectedProduct(product);
    setStockForm({
      quantity: product.stockQuantity?.toString() || "0",
      movementType: "adjustment",
      reason: "",
    });
    setShowStockModal(true);
  };

  const filteredProducts = products.filter((product) => {
    // Filtre par statut
    if (filter === "low" && !product.isLowStock) return false;
    if (filter === "out" && !product.isOutOfStock) return false;

    // Recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        product.nom.toLowerCase().includes(query) ||
        product.ref.toLowerCase().includes(query) ||
        product.sku?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const lowStockCount = products.filter((p) => p.isLowStock).length;
  const outOfStockCount = products.filter((p) => p.isOutOfStock).length;

  if (loading) {
    return (
      <div className="admin-stock-container">
        <div className="admin-loading">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-stock-container">
      <div className="stock-header">
        <h1>
          <i className="bi bi-boxes"></i> Gestion des stocks
        </h1>
      </div>

      <div className="stock-stats">
        <div className="stat-card">
          <h3>Total produits</h3>
          <p className="stat-number">{products.length}</p>
        </div>
        <div className={`stat-card ${lowStockCount > 0 ? "stat-warning" : ""}`}>
          <h3>
            <i className="bi bi-exclamation-triangle"></i> Stock faible
          </h3>
          <p className="stat-number">{lowStockCount}</p>
        </div>
        <div className={`stat-card ${outOfStockCount > 0 ? "stat-danger" : ""}`}>
          <h3>
            <i className="bi bi-x-circle"></i> Rupture de stock
          </h3>
          <p className="stat-number">{outOfStockCount}</p>
        </div>
      </div>

      <div className="stock-controls">
        <div className="search-wrapper">
          <i className="bi bi-search"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Tous
          </button>
          <button
            className={`filter-btn ${filter === "low" ? "active" : ""}`}
            onClick={() => setFilter("low")}
          >
            Stock faible ({lowStockCount})
          </button>
          <button
            className={`filter-btn ${filter === "out" ? "active" : ""}`}
            onClick={() => setFilter("out")}
          >
            Rupture ({outOfStockCount})
          </button>
        </div>

        <button
          className="btn-history"
          onClick={() => {
            setShowHistory(!showHistory);
            if (!showHistory) {
              loadHistory();
            }
          }}
        >
          <i className="bi bi-clock-history"></i> Historique
        </button>
      </div>

      {showHistory && (
        <div className="stock-history-section">
          <h2>Historique des mouvements</h2>
          <div className="history-list">
            {history.length === 0 ? (
              <p className="no-data">Aucun mouvement enregistré</p>
            ) : (
              history.map((movement) => (
                <div key={movement.id} className="history-item">
                  <div className="history-main">
                    <div className="history-product">
                      <strong>{movement.product?.nom || "Produit supprimé"}</strong>
                      <span className="history-ref">{movement.product?.ref}</span>
                    </div>
                    <div className={`history-type history-type-${movement.movementType}`}>
                      {movement.movementType === "entry" && (
                        <><i className="bi bi-arrow-down-circle"></i> Entrée</>
                      )}
                      {movement.movementType === "exit" && (
                        <><i className="bi bi-arrow-up-circle"></i> Sortie</>
                      )}
                      {movement.movementType === "adjustment" && (
                        <><i className="bi bi-arrow-left-right"></i> Ajustement</>
                      )}
                      {movement.movementType === "sale" && (
                        <><i className="bi bi-cart"></i> Vente</>
                      )}
                      {movement.movementType === "return" && (
                        <><i className="bi bi-arrow-counterclockwise"></i> Retour</>
                      )}
                    </div>
                    <div className="history-quantity">
                      {movement.previousQuantity} → {movement.newQuantity}
                      <span className="quantity-delta">
                        ({movement.quantity > 0 ? "+" : ""}{movement.quantity})
                      </span>
                    </div>
                  </div>
                  {movement.reason && (
                    <div className="history-reason">{movement.reason}</div>
                  )}
                  <div className="history-meta">
                    <span className="history-date">
                      {new Date(movement.createdAt).toLocaleString("fr-FR")}
                    </span>
                    {movement.createdByUser && (
                      <span className="history-user">
                        par {movement.createdByUser.firstName} {movement.createdByUser.lastName}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="stock-products">
        <h2>Produits ({filteredProducts.length})</h2>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`product-stock-card ${
                product.isOutOfStock
                  ? "stock-out"
                  : product.isLowStock
                  ? "stock-low"
                  : ""
              }`}
            >
              <div className="product-stock-header">
                <h3>{product.nom}</h3>
                {product.isOutOfStock && (
                  <span className="stock-badge stock-badge-out">
                    <i className="bi bi-x-circle"></i> Rupture
                  </span>
                )}
                {product.isLowStock && !product.isOutOfStock && (
                  <span className="stock-badge stock-badge-low">
                    <i className="bi bi-exclamation-triangle"></i> Stock faible
                  </span>
                )}
              </div>

              <div className="product-stock-info">
                <p className="product-ref">Ref: {product.ref}</p>
                {product.sku && <p className="product-sku">SKU: {product.sku}</p>}
              </div>

              <div className="product-stock-quantity">
                <div className="quantity-display">
                  <span className="quantity-label">Stock actuel:</span>
                  <span className={`quantity-value ${product.isOutOfStock ? "out" : product.isLowStock ? "low" : ""}`}>
                    {product.stockQuantity || 0}
                  </span>
                </div>
                <div className="alert-threshold">
                  <span>Seuil d'alerte: {product.stockAlertThreshold || 10}</span>
                </div>
              </div>

              <button
                className="btn-update-stock"
                onClick={() => handleOpenStockModal(product)}
              >
                <i className="bi bi-pencil"></i> Modifier le stock
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <i className="bi bi-inbox"></i>
            <p>Aucun produit trouvé</p>
          </div>
        )}
      </div>

      {showStockModal && selectedProduct && (
        <div className="stock-modal-overlay" onClick={() => setShowStockModal(false)}>
          <div className="stock-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Modifier le stock - {selectedProduct.nom}</h2>
              <button className="modal-close" onClick={() => setShowStockModal(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-content">
              <div className="current-stock">
                <p>
                  Stock actuel: <strong>{selectedProduct.stockQuantity || 0}</strong>
                </p>
                <p>
                  Seuil d'alerte: <strong>{selectedProduct.stockAlertThreshold || 10}</strong>
                </p>
              </div>

              <div className="form-group">
                <label>Type de mouvement</label>
                <select
                  value={stockForm.movementType}
                  onChange={(e) =>
                    setStockForm({
                      ...stockForm,
                      movementType: e.target.value as any,
                    })
                  }
                >
                  <option value="adjustment">Ajustement direct</option>
                  <option value="entry">Entrée de stock</option>
                  <option value="exit">Sortie de stock</option>
                  <option value="sale">Vente</option>
                  <option value="return">Retour</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  Quantité
                  {stockForm.movementType === "entry" && " (à ajouter)"}
                  {stockForm.movementType === "exit" && " (à retirer)"}
                  {stockForm.movementType === "sale" && " (vendue)"}
                  {stockForm.movementType === "return" && " (retournée)"}
                  {stockForm.movementType === "adjustment" && " (nouveau stock)"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={stockForm.quantity}
                  onChange={(e) =>
                    setStockForm({ ...stockForm, quantity: e.target.value })
                  }
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label>Raison (optionnel)</label>
                <textarea
                  value={stockForm.reason}
                  onChange={(e) =>
                    setStockForm({ ...stockForm, reason: e.target.value })
                  }
                  rows={3}
                  placeholder="Ex: Réception de commande, Inventaire..."
                />
              </div>

              {stockForm.movementType !== "adjustment" && stockForm.quantity && (
                <div className="stock-preview">
                  <p>
                    Nouveau stock:{" "}
                    <strong>
                      {stockForm.movementType === "entry" || stockForm.movementType === "return"
                        ? (selectedProduct.stockQuantity || 0) + parseInt(stockForm.quantity, 10)
                        : Math.max(
                            0,
                            (selectedProduct.stockQuantity || 0) - parseInt(stockForm.quantity, 10)
                          )}
                    </strong>
                  </p>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowStockModal(false)}
                disabled={updating === selectedProduct.id}
              >
                Annuler
              </button>
              <button
                className="btn-save"
                onClick={() => handleUpdateStock(selectedProduct)}
                disabled={updating === selectedProduct.id}
              >
                {updating === selectedProduct.id ? (
                  <>
                    <i className="bi bi-hourglass-split"></i> Enregistrement...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-lg"></i> Enregistrer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminStock;

