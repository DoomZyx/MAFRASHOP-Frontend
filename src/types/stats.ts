export interface RevenueStats {
  total: number;
  totalOrders: number;
  avgOrderValue: number;
}

export interface RevenueByPeriod {
  month: string; // Format YYYY-MM
  revenue: number;
  ordersCount: number;
}

export interface Bestseller {
  id: string;
  nom: string;
  ref: string;
  url_image: string | null;
  totalQuantity: number;
  totalRevenue: number;
}

export interface OrderStatus {
  status: string;
  count: number;
  totalAmount: number;
}

export interface ClientsStats {
  active: number;
  new: number;
  totalWithOrders: number;
}

export interface RevenueByProduct {
  id: string;
  nom: string;
  ref: string;
  revenue: number;
}

export interface StatsResponse {
  success: boolean;
  data: {
    revenue: RevenueStats;
    revenueByPeriod: RevenueByPeriod[];
    revenueByProduct: RevenueByProduct[];
    bestsellers: Bestseller[];
    ordersByStatus: OrderStatus[];
    clients: ClientsStats;
    period: string;
  };
}

