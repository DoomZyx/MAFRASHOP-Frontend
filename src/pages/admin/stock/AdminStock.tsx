import { useAdminStock } from "../../../hooks/useAdminStock";
import AdminStockStats from "../../../components/admin/AdminStockStats/AdminStockStats";
import AdminStockControls from "../../../components/admin/AdminStockControls/AdminStockControls";
import AdminStockHistory from "../../../components/admin/AdminStockHistory/AdminStockHistory";
import AdminStockProductCard from "../../../components/admin/AdminStockProductCard/AdminStockProductCard";
import AdminStockModal from "../../../components/admin/AdminStockModal/AdminStockModal";
import "./AdminStock.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Loader from "../../../components/loader/loader";

function AdminStock() {
  const {
    products,
    loading,
    history,
    showHistory,
    selectedProduct,
    showStockModal,
    stockForm,
    setStockForm,
    updating,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    filteredProducts,
    lowStockCount,
    outOfStockCount,
    handleUpdateStock,
    handleOpenStockModal,
    handleCloseStockModal,
    toggleHistory,
  } = useAdminStock();

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

      <AdminStockStats
        totalProducts={products.length}
        lowStockCount={lowStockCount}
        outOfStockCount={outOfStockCount}
      />

      <AdminStockControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
        lowStockCount={lowStockCount}
        outOfStockCount={outOfStockCount}
        onToggleHistory={toggleHistory}
      />

      {showHistory && <AdminStockHistory history={history} />}

      <div className="stock-products">
        <h2>Produits ({filteredProducts.length})</h2>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <AdminStockProductCard
              key={product.id}
              product={product}
              onUpdateClick={handleOpenStockModal}
            />
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
        <AdminStockModal
          product={selectedProduct}
          stockForm={stockForm}
          onFormChange={setStockForm}
          onSave={() => handleUpdateStock(selectedProduct)}
          onClose={handleCloseStockModal}
          updating={updating === selectedProduct.id}
        />
      )}
    </div>
  );
}

export default AdminStock;

