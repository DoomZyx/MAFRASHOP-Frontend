import OrderCardCompact from "../OrderCardCompact/OrderCardCompact";
import OrderCardDetails from "../OrderCardDetails/OrderCardDetails";
import "./OrderCard.scss";

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

interface OrderCardProps {
  order: Order;
  isExpanded: boolean;
  downloadingInvoice: string | null;
  formatDate: (date: string) => string;
  formatPrice: (price: number) => string;
  getStatusLabel: (status: string) => string;
  getStatusClass: (status: string) => string;
  getDeliveryStatusLabel: (status: string) => string;
  getDeliveryStatusClass: (status: string) => string;
  onToggleExpand: (orderId: string) => void;
  onDownloadInvoice: (orderId: string) => void;
}

const OrderCard = ({
  order,
  isExpanded,
  downloadingInvoice,
  formatDate,
  formatPrice,
  getStatusLabel,
  getStatusClass,
  getDeliveryStatusLabel,
  getDeliveryStatusClass,
  onToggleExpand,
  onDownloadInvoice,
}: OrderCardProps) => {
  return (
    <div className="orders-card">
      <OrderCardCompact
        orderId={order.id}
        createdAt={order.createdAt}
        totalAmount={order.totalAmount}
        status={order.status}
        isExpanded={isExpanded}
        downloadingInvoice={downloadingInvoice}
        formatDate={formatDate}
        formatPrice={formatPrice}
        getStatusLabel={getStatusLabel}
        getStatusClass={getStatusClass}
        onToggleExpand={() => onToggleExpand(order.id)}
        onDownloadInvoice={(e) => {
          e.stopPropagation();
          onDownloadInvoice(order.id);
        }}
      />

      {isExpanded && (
        <OrderCardDetails
          items={order.items}
          delivery={order.delivery}
          isPro={order.isPro}
          formatPrice={formatPrice}
          getDeliveryStatusLabel={getDeliveryStatusLabel}
          getDeliveryStatusClass={getDeliveryStatusClass}
        />
      )}
    </div>
  );
};

export default OrderCard;
