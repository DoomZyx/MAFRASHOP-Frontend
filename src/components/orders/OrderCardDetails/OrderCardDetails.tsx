import OrderItems from "../OrderItems/OrderItems";
import OrderDeliveryInfo from "../OrderDeliveryInfo/OrderDeliveryInfo";
import "./OrderCardDetails.scss";

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

interface OrderCardDetailsProps {
  items?: OrderItem[];
  delivery?: Delivery | null;
  isPro: boolean;
  formatPrice: (price: number) => string;
  getDeliveryStatusLabel: (status: string) => string;
  getDeliveryStatusClass: (status: string) => string;
}

const OrderCardDetails = ({
  items,
  delivery,
  isPro,
  formatPrice,
  getDeliveryStatusLabel,
  getDeliveryStatusClass,
}: OrderCardDetailsProps) => {
  return (
    <div className="orders-card-details">
      {items && items.length > 0 && (
        <OrderItems items={items} isPro={isPro} formatPrice={formatPrice} />
      )}

      {delivery && (
        <OrderDeliveryInfo
          delivery={delivery}
          getDeliveryStatusLabel={getDeliveryStatusLabel}
          getDeliveryStatusClass={getDeliveryStatusClass}
        />
      )}
    </div>
  );
};

export default OrderCardDetails;
