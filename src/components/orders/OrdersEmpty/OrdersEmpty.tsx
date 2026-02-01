import "./OrdersEmpty.scss";

const OrdersEmpty = () => {
  return (
    <div className="orders-empty">
      <div className="orders-empty-icon">📦</div>
      <h2>Aucune commande</h2>
      <p>Vous n'avez pas encore passé de commande.</p>
    </div>
  );
};

export default OrdersEmpty;
