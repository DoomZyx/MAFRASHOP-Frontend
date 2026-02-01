import "./AdminStatsHeader.scss";

interface AdminStatsHeaderProps {
  period: string;
  onPeriodChange: (period: string) => void;
}

const AdminStatsHeader = ({ period, onPeriodChange }: AdminStatsHeaderProps) => {
  const periods = [
    { value: "all", label: "Toutes" },
    { value: "today", label: "Aujourd'hui" },
    { value: "week", label: "7 jours" },
    { value: "month", label: "30 jours" },
    { value: "year", label: "1 an" },
  ];

  return (
    <div className="stats-header">
      <h1>
        <i className="bi bi-graph-up"></i> Statistiques
      </h1>
      <div className="period-selector">
        {periods.map((p) => (
          <button
            key={p.value}
            className={`period-btn ${period === p.value ? "active" : ""}`}
            onClick={() => onPeriodChange(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminStatsHeader;
