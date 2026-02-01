import OrdersHeader from "../OrdersHeader/OrdersHeader";
import OrdersEmpty from "../OrdersEmpty/OrdersEmpty";
import OrdersList from "../OrdersList/OrdersList";
import "./OrdersContent.scss";

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

interface OrdersContentProps {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
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

const OrdersContent = ({
  orders,
  isLoading,
  error,
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
}: OrdersContentProps) => {
  return (
    <div className="orders-container">
      <OrdersHeader />

      {isLoading && (
        <div className="orders-loading-state">
          <p>Chargement de vos commandes...</p>
        </div>
      )}

      {error && (
        <div className="orders-error">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && orders.length === 0 && <OrdersEmpty />}

      {!isLoading && !error && orders.length > 0 && (
        <OrdersList
          orders={orders}
          downloadingInvoice={downloadingInvoice}
          formatDate={formatDate}
          formatPrice={formatPrice}
          getStatusLabel={getStatusLabel}
          getStatusClass={getStatusClass}
          getDeliveryStatusLabel={getDeliveryStatusLabel}
          getDeliveryStatusClass={getDeliveryStatusClass}
          isOrderExpanded={isOrderExpanded}
          onToggleExpand={onToggleExpand}
          onDownloadInvoice={onDownloadInvoice}
        />
      )}
    </div>
  );
};

export default OrdersContent;
