import { useState, useEffect } from "react";
import { adminStatsAPI } from "../../../API/admin/stats";
import { StatsResponse } from "../../../types/stats";
import "./AdminStats.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Loader from "../../../components/loader/loader";

function AdminStats() {
  const [stats, setStats] = useState<StatsResponse["data"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<string>("all");
  const [exporting, setExporting] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, [period]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await adminStatsAPI.getAllStats(period);
      setStats(response.data);
    } catch (error: any) {
      console.error("Erreur:", error);
      alert("Erreur lors du chargement des statistiques");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (type: "orders" | "products" | "clients") => {
    try {
      setExporting(type);
      const blob = await adminStatsAPI.exportStatsCSV(type);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      alert(error.message || "Erreur lors de l'export");
    } finally {
      setExporting(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const formatDate = (month: string) => {
    const date = new Date(month + "-01");
    return date.toLocaleDateString("fr-FR", { year: "numeric", month: "long" });
  };

  if (loading) {
    return (
      <div className="admin-stats-container">
        <div className="admin-loading">
          <Loader />
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="admin-stats-container">
        <div className="no-stats">
          <p>Aucune statistique disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-stats-container">
      <div className="stats-header">
        <h1>
          <i className="bi bi-graph-up"></i> Statistiques
        </h1>
        <div className="period-selector">
          <button
            className={`period-btn ${period === "all" ? "active" : ""}`}
            onClick={() => setPeriod("all")}
          >
            Toutes
          </button>
          <button
            className={`period-btn ${period === "today" ? "active" : ""}`}
            onClick={() => setPeriod("today")}
          >
            Aujourd'hui
          </button>
          <button
            className={`period-btn ${period === "week" ? "active" : ""}`}
            onClick={() => setPeriod("week")}
          >
            7 jours
          </button>
          <button
            className={`period-btn ${period === "month" ? "active" : ""}`}
            onClick={() => setPeriod("month")}
          >
            30 jours
          </button>
          <button
            className={`period-btn ${period === "year" ? "active" : ""}`}
            onClick={() => setPeriod("year")}
          >
            1 an
          </button>
        </div>
      </div>

      {/* Chiffre d'affaires */}
      <div className="stats-section">
        <div className="section-header">
          <h2>
            <i className="bi bi-cash-coin"></i> Chiffre d'affaires
          </h2>
          <button
            className="btn-export"
            onClick={() => handleExport("orders")}
            disabled={exporting === "orders"}
          >
            {exporting === "orders" ? (
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

        <div className="revenue-cards">
          <div className="stat-card revenue-card">
            <div className="stat-icon">
              <i className="bi bi-currency-euro"></i>
            </div>
            <div className="stat-content">
              <h3>Total</h3>
              <p className="stat-value">{formatCurrency(stats.revenue.total)}</p>
              <p className="stat-label">{stats.revenue.totalOrders} commandes</p>
            </div>
          </div>

          <div className="stat-card revenue-card">
            <div className="stat-icon">
              <i className="bi bi-cart"></i>
            </div>
            <div className="stat-content">
              <h3>Panier moyen</h3>
              <p className="stat-value">{formatCurrency(stats.revenue.avgOrderValue)}</p>
              <p className="stat-label">Par commande</p>
            </div>
          </div>
        </div>

        {/* Graphique CA par période */}
        {stats.revenueByPeriod.length > 0 && (
          <div className="chart-container">
            <h3>Évolution du chiffre d'affaires (12 derniers mois)</h3>
            <div className="revenue-chart">
              {stats.revenueByPeriod.map((item, index) => {
                const maxRevenue = Math.max(...stats.revenueByPeriod.map((r) => r.revenue));
                const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;

                return (
                  <div key={index} className="chart-bar">
                    <div
                      className="bar-fill"
                      style={{ height: `${height}%` }}
                      title={`${formatDate(item.month)}: ${formatCurrency(item.revenue)}`}
                    >
                      <span className="bar-value">{formatCurrency(item.revenue)}</span>
                    </div>
                    <div className="bar-label">{formatDate(item.month)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Produits les plus vendus */}
      <div className="stats-section">
        <div className="section-header">
          <h2>
            <i className="bi bi-star-fill"></i> Produits les plus vendus
          </h2>
          <button
            className="btn-export"
            onClick={() => handleExport("products")}
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
          {stats.bestsellers.length === 0 ? (
            <p className="no-data">Aucun produit vendu</p>
          ) : (
            stats.bestsellers.map((product, index) => (
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

      {/* Commandes par statut */}
      <div className="stats-section">
        <h2>
          <i className="bi bi-list-check"></i> Commandes par statut
        </h2>
        <div className="orders-status-grid">
          {stats.ordersByStatus.map((status) => (
            <div key={status.status} className="status-card">
              <div className="status-header">
                <h3>{status.status}</h3>
                <span className={`status-badge status-${status.status}`}>
                  {status.status}
                </span>
              </div>
              <div className="status-stats">
                <p className="status-count">{status.count} commandes</p>
                <p className="status-amount">{formatCurrency(status.totalAmount)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clients */}
      <div className="stats-section">
        <div className="section-header">
          <h2>
            <i className="bi bi-people"></i> Clients
          </h2>
          <button
            className="btn-export"
            onClick={() => handleExport("clients")}
            disabled={exporting === "clients"}
          >
            {exporting === "clients" ? (
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

        <div className="clients-cards">
          <div className="stat-card client-card">
            <div className="stat-icon">
              <i className="bi bi-person-check"></i>
            </div>
            <div className="stat-content">
              <h3>Clients actifs</h3>
              <p className="stat-value">{stats.clients.active}</p>
              <p className="stat-label">30 derniers jours</p>
            </div>
          </div>

          <div className="stat-card client-card">
            <div className="stat-icon">
              <i className="bi bi-person-plus"></i>
            </div>
            <div className="stat-content">
              <h3>Nouveaux clients</h3>
              <p className="stat-value">{stats.clients.new}</p>
              <p className="stat-label">30 derniers jours</p>
            </div>
          </div>

          <div className="stat-card client-card">
            <div className="stat-icon">
              <i className="bi bi-people"></i>
            </div>
            <div className="stat-content">
              <h3>Total clients</h3>
              <p className="stat-value">{stats.clients.totalWithOrders}</p>
              <p className="stat-label">Avec commandes</p>
            </div>
          </div>
        </div>
      </div>

      {/* CA par produit */}
      {stats.revenueByProduct.length > 0 && (
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
                {stats.revenueByProduct.map((product) => (
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
      )}
    </div>
  );
}

export default AdminStats;

