import "./OrderCardCompact.scss";

interface OrderCardCompactProps {
  orderId: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  isExpanded: boolean;
  downloadingInvoice: string | null;
  formatDate: (date: string) => string;
  formatPrice: (price: number) => string;
  getStatusLabel: (status: string) => string;
  getStatusClass: (status: string) => string;
  onToggleExpand: () => void;
  onDownloadInvoice: (e: React.MouseEvent) => void;
}

const OrderCardCompact = ({
  orderId,
  createdAt,
  totalAmount,
  status,
  isExpanded,
  downloadingInvoice,
  formatDate,
  formatPrice,
  getStatusLabel,
  getStatusClass,
  onToggleExpand,
  onDownloadInvoice,
}: OrderCardCompactProps) => {
  return (
    <div className="orders-card-compact" onClick={onToggleExpand}>
      <div className="orders-card-compact-info">
        <div className="orders-card-compact-main">
          <h3>Commande #{orderId.slice(-8).toUpperCase()}</h3>
          <p className="orders-card-date">{formatDate(createdAt)}</p>
        </div>
        <div className="orders-card-compact-right">
          <div className="orders-total-compact">
            <span className="orders-total-amount">
              {formatPrice(totalAmount)}
              {" TTC"}
            </span>
          </div>
          <div className={`orders-status ${getStatusClass(status)}`}>
            {getStatusLabel(status)}
          </div>
        </div>
      </div>
      <div className="orders-card-compact-actions">
        {status === "paid" && (
          <button
            className="orders-download-invoice-btn-compact"
            onClick={onDownloadInvoice}
            disabled={downloadingInvoice === orderId}
          >
            {downloadingInvoice === orderId
              ? "Téléchargement..."
              : "📄 Télécharger la facture"}
          </button>
        )}
        <button className="orders-expand-btn">
          {isExpanded ? "▼ Masquer les détails" : "▶ Voir les détails"}
        </button>
      </div>
    </div>
  );
};

export default OrderCardCompact;
