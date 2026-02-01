import "./AdminClientsSection.scss";

interface ClientsData {
  active: number;
  new: number;
  totalWithOrders: number;
}

interface AdminClientsSectionProps {
  clients: ClientsData;
  exporting: string | null;
  onExport: () => void;
}

const AdminClientsSection = ({
  clients,
  exporting,
  onExport,
}: AdminClientsSectionProps) => {
  return (
    <div className="stats-section">
      <div className="section-header">
        <h2>
          <i className="bi bi-people"></i> Clients
        </h2>
        <button
          className="btn-export"
          onClick={onExport}
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
            <p className="stat-value">{clients.active}</p>
            <p className="stat-label">30 derniers jours</p>
          </div>
        </div>

        <div className="stat-card client-card">
          <div className="stat-icon">
            <i className="bi bi-person-plus"></i>
          </div>
          <div className="stat-content">
            <h3>Nouveaux clients</h3>
            <p className="stat-value">{clients.new}</p>
            <p className="stat-label">30 derniers jours</p>
          </div>
        </div>

        <div className="stat-card client-card">
          <div className="stat-icon">
            <i className="bi bi-people"></i>
          </div>
          <div className="stat-content">
            <h3>Total clients</h3>
            <p className="stat-value">{clients.totalWithOrders}</p>
            <p className="stat-label">Avec commandes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClientsSection;
