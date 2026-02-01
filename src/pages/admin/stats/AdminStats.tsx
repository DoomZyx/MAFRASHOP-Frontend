import { useAdminStats } from "../../../hooks/useAdminStats";
import AdminStatsHeader from "../../../components/admin/AdminStatsHeader/AdminStatsHeader";
import AdminRevenueSection from "../../../components/admin/AdminRevenueSection/AdminRevenueSection";
import AdminBestsellersSection from "../../../components/admin/AdminBestsellersSection/AdminBestsellersSection";
import AdminOrdersStatusSection from "../../../components/admin/AdminOrdersStatusSection/AdminOrdersStatusSection";
import AdminClientsSection from "../../../components/admin/AdminClientsSection/AdminClientsSection";
import AdminRevenueByProductTable from "../../../components/admin/AdminRevenueByProductTable/AdminRevenueByProductTable";
import "./AdminStats.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Loader from "../../../components/loader/loader";

function AdminStats() {
  const {
    stats,
    loading,
    period,
    setPeriod,
    exporting,
    handleExport,
    formatCurrency,
    formatDate,
  } = useAdminStats();

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
      <AdminStatsHeader period={period} onPeriodChange={setPeriod} />

      <AdminRevenueSection
        revenue={stats.revenue}
        revenueByPeriod={stats.revenueByPeriod}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
        exporting={exporting}
        onExport={() => handleExport("orders")}
      />

      <AdminBestsellersSection
        bestsellers={stats.bestsellers}
        formatCurrency={formatCurrency}
        exporting={exporting}
        onExport={() => handleExport("products")}
      />

      <AdminOrdersStatusSection
        ordersByStatus={stats.ordersByStatus}
        formatCurrency={formatCurrency}
      />

      <AdminClientsSection
        clients={stats.clients}
        exporting={exporting}
        onExport={() => handleExport("clients")}
      />

      <AdminRevenueByProductTable
        revenueByProduct={stats.revenueByProduct}
        formatCurrency={formatCurrency}
      />
    </div>
  );
}

export default AdminStats;

