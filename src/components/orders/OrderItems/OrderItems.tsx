import "./OrderItems.scss";

interface OrderItem {
  id: string;
  productName?: string;
  productRef?: string;
  productImage?: string;
  quantity: number;
  totalPrice: number;
}

interface OrderItemsProps {
  items: OrderItem[];
  isPro: boolean;
  formatPrice: (price: number) => string;
}

const OrderItems = ({ items, isPro, formatPrice }: OrderItemsProps) => {
  return (
    <div className="orders-items-section">
      <h4 className="orders-details-title">Articles commandés</h4>
      <div className="orders-items">
        {items.map((item) => (
          <div key={item.id} className="orders-item">
            <div className="orders-item-image">
              {item.productImage ? (
                <img
                  src={item.productImage}
                  alt={item.productName || "Produit"}
                />
              ) : (
                <div className="orders-item-placeholder">📦</div>
              )}
            </div>
            <div className="orders-item-details">
              <h4>{item.productName || "Produit"}</h4>
              {item.productRef && (
                <p className="orders-item-ref">Réf: {item.productRef}</p>
              )}
              <p className="orders-item-quantity">Quantité: {item.quantity}</p>
            </div>
            <div className="orders-item-price">
              {formatPrice(item.totalPrice * 1.2)}
              {" TTC"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
