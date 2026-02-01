import { StockProduct } from "../../../types/stock";
import "./AdminStockModal.scss";

interface StockForm {
  quantity: string;
  movementType: "entry" | "exit" | "adjustment" | "sale" | "return";
  reason: string;
}

interface AdminStockModalProps {
  product: StockProduct;
  stockForm: StockForm;
  onFormChange: (form: StockForm) => void;
  onSave: () => void;
  onClose: () => void;
  updating: boolean;
}

const AdminStockModal = ({
  product,
  stockForm,
  onFormChange,
  onSave,
  onClose,
  updating,
}: AdminStockModalProps) => {
  const calculateNewStock = () => {
    const quantity = parseInt(stockForm.quantity, 10);
    if (isNaN(quantity)) return product.stockQuantity || 0;

    if (stockForm.movementType === "adjustment") {
      return quantity;
    } else if (stockForm.movementType === "entry" || stockForm.movementType === "return") {
      return (product.stockQuantity || 0) + quantity;
    } else {
      return Math.max(0, (product.stockQuantity || 0) - quantity);
    }
  };

  return (
    <div className="stock-modal-overlay" onClick={onClose}>
      <div className="stock-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Modifier le stock - {product.nom}</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="modal-content">
          <div className="current-stock">
            <p>
              Stock actuel: <strong>{product.stockQuantity || 0}</strong>
            </p>
            <p>
              Seuil d'alerte: <strong>{product.stockAlertThreshold || 10}</strong>
            </p>
          </div>

          <div className="form-group">
            <label>Type de mouvement</label>
            <select
              value={stockForm.movementType}
              onChange={(e) =>
                onFormChange({
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
                onFormChange({ ...stockForm, quantity: e.target.value })
              }
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label>Raison (optionnel)</label>
            <textarea
              value={stockForm.reason}
              onChange={(e) =>
                onFormChange({ ...stockForm, reason: e.target.value })
              }
              rows={3}
              placeholder="Ex: Réception de commande, Inventaire..."
            />
          </div>

          {stockForm.movementType !== "adjustment" && stockForm.quantity && (
            <div className="stock-preview">
              <p>
                Nouveau stock: <strong>{calculateNewStock()}</strong>
              </p>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button
            className="btn-cancel"
            onClick={onClose}
            disabled={updating}
          >
            Annuler
          </button>
          <button
            className="btn-save"
            onClick={onSave}
            disabled={updating}
          >
            {updating ? (
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
  );
};

export default AdminStockModal;
