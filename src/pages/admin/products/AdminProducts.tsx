import { useState, useMemo } from "react";
import { useAdminProducts } from "../../../hooks/useAdminProducts";
import ProductAdminCard from "../../../components/admin/ProductAdminCard";
import ProductForm from "../../../components/admin/ProductForm";
import { Product } from "../../../types/product";
import { adminProductsAPI } from "../../../API/admin/api";
import "./AdminProducts.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Loader from "../../../components/loader/loader";

function AdminProducts() {
  const {
    products,
    loading,
    updating,
    promotionPercentages,
    handleToggleBestseller,
    handleTogglePromotion,
    handlePercentageChange,
    handleSavePromotion,
    calculateDiscountedPrice,
    formatPrice,
    refreshProducts,
  } = useAdminProducts();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return;
    }

    setDeletingProductId(productId);
    try {
      await adminProductsAPI.deleteProduct(productId);
      if (refreshProducts) {
        refreshProducts();
      } else {
        window.location.reload();
      }
    } catch (error: any) {
      alert(error.message || "Erreur lors de la suppression du produit");
    } finally {
      setDeletingProductId(null);
    }
  };

  const handleFormSuccess = () => {
    if (refreshProducts) {
      refreshProducts();
    } else {
      window.location.reload();
    }
  };

  // Filtrer les produits selon la recherche
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) => {
      const searchableFields = [
        product.nom,
        product.ref,
        product.sku,
        product.category,
        product.subcategory,
        product.description,
      ]
        .filter(Boolean)
        .map((field) => field?.toLowerCase() || "");

      return searchableFields.some((field) => field.includes(query));
    });
  }, [products, searchQuery]);

  if (loading) {
    return (
      <div className="admin-products-container">
        <div className="admin-loading"><Loader /></div>
      </div>
    );
  }

  return (
    <div className="admin-products-container">
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
        <div className="stat-card">
          <h3>Total produits</h3>
          <p className="stat-number">{products.length}</p>
        </div>
      </div>

      <div className="admin-products">
        <div className="products-header">
          <h2>
            Tous les produits ({filteredProducts.length}
            {searchQuery && ` / ${products.length}`})
          </h2>
          <div className="products-header-actions">
            <button className="btn-create-product" onClick={handleCreateProduct}>
              <i className="bi bi-plus-lg"></i> Créer un produit
            </button>
            <div className="filter-badges">
              <span className="badge bestseller-badge">
                <i className="bi bi-star-fill"></i> Bestseller
              </span>
              <span className="badge promotion-badge">
                <i className="bi bi-tag-fill"></i> Promotion
              </span>
            </div>
          </div>
        </div>

        <div className="products-search">
          <div className="search-input-wrapper">
            <i className="bi bi-search"></i>
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher un produit (nom, référence, SKU, catégorie...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                title="Effacer la recherche"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>

        {filteredProducts.length === 0 && !loading && (
          <div className="no-products-found">
            {searchQuery ? (
              <>
                <i className="bi bi-search"></i>
                <p>Aucun produit trouvé pour "{searchQuery}"</p>
                <button
                  className="btn-clear-search"
                  onClick={() => setSearchQuery("")}
                >
                  Effacer la recherche
                </button>
              </>
            ) : (
              <>
                <i className="bi bi-inbox"></i>
                <p>Aucun produit disponible</p>
              </>
            )}
          </div>
        )}

        <div className="products-list">
          {filteredProducts.map((product) => (
            <ProductAdminCard
              key={product.id}
              product={product}
              updating={updating}
              promotionPercentages={promotionPercentages}
              onToggleBestseller={handleToggleBestseller}
              onTogglePromotion={handleTogglePromotion}
              onPercentageChange={handlePercentageChange}
              onSavePromotion={handleSavePromotion}
              calculateDiscountedPrice={calculateDiscountedPrice}
              formatPrice={formatPrice}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              isDeleting={deletingProductId === product.id}
            />
          ))}
        </div>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}

export default AdminProducts;

