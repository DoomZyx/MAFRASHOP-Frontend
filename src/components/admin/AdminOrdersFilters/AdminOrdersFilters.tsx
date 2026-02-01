import "./AdminOrdersFilters.scss";

interface StatusCounts {
  all: number;
  pending: number;
  paid: number;
  preparing: number;
  shipped: number;
  failed: number;
  cancelled: number;
  refunded: number;
}

interface AdminOrdersFiltersProps {
  statusFilter: string;
  onFilterChange: (filter: string) => void;
  statusCounts: StatusCounts;
}

const AdminOrdersFilters = ({
  statusFilter,
  onFilterChange,
  statusCounts,
}: AdminOrdersFiltersProps) => {
  const filters = [
    { value: "all", label: "Toutes", count: statusCounts.all },
    { value: "pending", label: "En attente", count: statusCounts.pending },
    { value: "paid", label: "Payées", count: statusCounts.paid },
    { value: "preparing", label: "En préparation", count: statusCounts.preparing },
    { value: "shipped", label: "Expédiées", count: statusCounts.shipped },
    { value: "failed", label: "Échouées", count: statusCounts.failed },
  ];

  return (
    <div className="orders-filters">
      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`filter-btn ${statusFilter === filter.value ? "active" : ""}`}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminOrdersFilters;
