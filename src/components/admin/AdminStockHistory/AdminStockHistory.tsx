import { StockMovement } from "../../../types/stock";
import "./AdminStockHistory.scss";

interface AdminStockHistoryProps {
  history: StockMovement[];
}

const AdminStockHistory = ({ history }: AdminStockHistoryProps) => {
  const getMovementIcon = (type: string) => {
    switch (type) {
      case "entry":
        return <><i className="bi bi-arrow-down-circle"></i> Entrée</>;
      case "exit":
        return <><i className="bi bi-arrow-up-circle"></i> Sortie</>;
      case "adjustment":
        return <><i className="bi bi-arrow-left-right"></i> Ajustement</>;
      case "sale":
        return <><i className="bi bi-cart"></i> Vente</>;
      case "return":
        return <><i className="bi bi-arrow-counterclockwise"></i> Retour</>;
      default:
        return type;
    }
  };

  return (
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
                  {getMovementIcon(movement.movementType)}
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
  );
};

export default AdminStockHistory;
