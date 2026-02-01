import OrderCard from "../OrderCard/OrderCard";
import "./OrdersList.scss";

interface OrderItem {
  id: string;
  productName?: string;
  productRef?: string;
  productImage?: string;
  quantity: number;
  totalPrice: number;
}

interface Delivery {
  status: string;
  estimatedDeliveryDate: string | null;
  actualDeliveryDate: string | null;
  trackingNumber: string | null;
  carrier: string | null;
}

interface Order {
  id: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  isPro: boolean;
  items?: OrderItem[];
  delivery?: Delivery | null;
}

interface OrdersListProps {
  orders: Order[];
  downloadingInvoice: string | null;
  formatDate: (date: string) => string;
  formatPrice: (price: number) => string;
  getStatusLabel: (status: string) => string;
  getStatusClass: (status: string) => string;
  getDeliveryStatusLabel: (status: string) => string;
  getDeliveryStatusClass: (status: string) => string;
  isOrderExpanded: (orderId: string) => boolean;
  onToggleExpand: (orderId: string) => void;
  onDownloadInvoice: (orderId: string) => void;
}

const OrdersList = ({
  orders,
  downloadingInvoice,
  formatDate,
  formatPrice,
  getStatusLabel,
  getStatusClass,
  getDeliveryStatusLabel,
  getDeliveryStatusClass,
  isOrderExpanded,
  onToggleExpand,
  onDownloadInvoice,
}: OrdersListProps) => {
  return (
    <div className="orders-list">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          isExpanded={isOrderExpanded(order.id)}
          downloadingInvoice={downloadingInvoice}
          formatDate={formatDate}
          formatPrice={formatPrice}
          getStatusLabel={getStatusLabel}
          getStatusClass={getStatusClass}
          getDeliveryStatusLabel={getDeliveryStatusLabel}
          getDeliveryStatusClass={getDeliveryStatusClass}
          onToggleExpand={onToggleExpand}
          onDownloadInvoice={onDownloadInvoice}
        />
      ))}
    </div>
  );
};

export default OrdersList;
