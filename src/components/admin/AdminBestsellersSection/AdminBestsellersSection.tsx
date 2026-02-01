import "./AdminBestsellersSection.scss";

interface Bestseller {
  id: string;
  nom: string;
  ref: string;
  url_image?: string;
  totalQuantity: number;
  totalRevenue: number;
}

interface AdminBestsellersSectionProps {
  bestsellers: Bestseller[];
  formatCurrency: (amount: number) => string;
  exporting: string | null;
  onExport: () => void;
}

const AdminBestsellersSection = ({
  bestsellers,
  formatCurrency,
  exporting,
  onExport,
}: AdminBestsellersSectionProps) => {
  return (
    <div className="stats-section">
      <div className="section-header">
        <h2>
          <i className="bi bi-star-fill"></i> Produits les plus vendus
        </h2>
        <button
          className="btn-export"
          onClick={onExport}
          disabled={exporting === "products"}
        >
          {exporting === "products" ? (
            <>
              <i className="bi bi-hourglass-split"></i> Export...
            </>
          ) : (
            <>
              <i className="bi bi-download"></i> Exporter CSV
            </>
          )}
        </button>
      </div>

      <div className="bestsellers-list">
        {bestsellers.length === 0 ? (
          <p className="no-data">Aucun produit vendu</p>
        ) : (
          bestsellers.map((product, index) => (
            <div key={product.id} className="bestseller-item">
              <div className="bestseller-rank">#{index + 1}</div>
              <div className="bestseller-image">
                {product.url_image ? (
                  <img src={product.url_image} alt={product.nom} />
                ) : (
                  <i className="bi bi-image"></i>
                )}
              </div>
              <div className="bestseller-info">
                <h4>{product.nom}</h4>
                <p className="bestseller-ref">Ref: {product.ref}</p>
              </div>
              <div className="bestseller-stats">
                <div className="stat-item">
                  <span className="stat-label">Quantité vendue</span>
                  <span className="stat-value">{product.totalQuantity}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">CA généré</span>
                  <span className="stat-value">{formatCurrency(product.totalRevenue)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminBestsellersSection;
