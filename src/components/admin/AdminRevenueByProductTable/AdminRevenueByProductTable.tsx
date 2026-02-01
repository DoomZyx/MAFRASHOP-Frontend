import "./AdminRevenueByProductTable.scss";

interface RevenueByProduct {
  id: string;
  nom: string;
  ref: string;
  revenue: number;
}

interface AdminRevenueByProductTableProps {
  revenueByProduct: RevenueByProduct[];
  formatCurrency: (amount: number) => string;
}

const AdminRevenueByProductTable = ({
  revenueByProduct,
  formatCurrency,
}: AdminRevenueByProductTableProps) => {
  if (revenueByProduct.length === 0) {
    return null;
  }

  return (
    <div className="stats-section">
      <h2>
        <i className="bi bi-graph-up-arrow"></i> Chiffre d'affaires par produit
      </h2>
      <div className="revenue-products-table">
        <table>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Référence</th>
              <th>Chiffre d'affaires</th>
            </tr>
          </thead>
          <tbody>
            {revenueByProduct.map((product) => (
              <tr key={product.id}>
                <td>{product.nom}</td>
                <td>{product.ref}</td>
                <td className="revenue-cell">{formatCurrency(product.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRevenueByProductTable;
