import { useAdminProducts } from "../../../hooks/useAdminProducts";
import { useAdminProductsPage } from "../../../hooks/useAdminProductsPage";
import ProductAdminCard from "../../../components/admin/ProductAdminCard";
import ProductForm from "../../../components/admin/ProductForm";
import AdminProductsStats from "../../../components/admin/AdminProductsStats/AdminProductsStats";
import AdminProductsHeader from "../../../components/admin/AdminProductsHeader/AdminProductsHeader";
import AdminProductsSearch from "../../../components/admin/AdminProductsSearch/AdminProductsSearch";
import "./AdminProducts.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Loader from "../../../components/loader/loader";

function AdminProducts() {
  const {
    products,
    loading,
    updating,
    promotionPercentages,
    minimumQuantityRules,
    minimumQuantities,
    handleToggleBestseller,
    handleTogglePromotion,
    handlePercentageChange,
    handleSavePromotion,
    handleMinimumQuantityChange,
    handleSaveMinimumQuantity,
    handleDeleteMinimumQuantity,
    calculateDiscountedPrice,
    formatPrice,
    refreshProducts,
  } = useAdminProducts();

  const {
    showForm,
    editingProduct,
    deletingProductId,
    searchQuery,
    setSearchQuery,
    listFilter,
    setListFilter,
    filteredProducts,
    handleCreateProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleFormSuccess,
    handleCloseForm,
  } = useAdminProductsPage(products, refreshProducts);

  if (loading) {
    return (
      <div className="admin-products-container">
        <div className="admin-loading"><Loader /></div>
      </div>
    );
  }

  return (
    <div className="admin-products-container">
      <AdminProductsStats
        products={products}
        listFilter={listFilter}
        onFilterChange={setListFilter}
      />

      <div className="admin-products">
        <AdminProductsHeader
          filteredCount={filteredProducts.length}
          totalCount={products.length}
          hasSearch={!!searchQuery}
          onCreateProduct={handleCreateProduct}
        />

        <AdminProductsSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

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
              minimumQuantityRule={minimumQuantityRules[product.id] || null}
              minimumQuantity={minimumQuantities[product.id]}
              onToggleBestseller={handleToggleBestseller}
              onTogglePromotion={handleTogglePromotion}
              onPercentageChange={handlePercentageChange}
              onSavePromotion={handleSavePromotion}
              onMinimumQuantityChange={handleMinimumQuantityChange}
              onSaveMinimumQuantity={handleSaveMinimumQuantity}
              onDeleteMinimumQuantity={handleDeleteMinimumQuantity}
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
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}

export default AdminProducts;

