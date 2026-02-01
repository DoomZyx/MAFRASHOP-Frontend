import { useState, useEffect } from "react";
import { adminStockAPI } from "../API/admin/stock";
import { StockProduct, StockMovement } from "../types/stock";

export const useAdminStock = () => {
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

  const handleCloseStockModal = () => {
    setShowStockModal(false);
    setSelectedProduct(null);
    setStockForm({ quantity: "", movementType: "adjustment", reason: "" });
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
    if (!showHistory) {
      loadHistory();
    }
  };

  const filteredProducts = products.filter((product) => {
    if (filter === "low" && !product.isLowStock) return false;
    if (filter === "out" && !product.isOutOfStock) return false;

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

  return {
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
  };
};
