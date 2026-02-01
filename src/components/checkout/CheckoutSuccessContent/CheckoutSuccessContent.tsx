import { useNavigate } from "react-router-dom";
import "./CheckoutSuccessContent.scss";

interface CheckoutSuccessContentProps {
  sessionStatus: any;
}

const CheckoutSuccessContent = ({ sessionStatus }: CheckoutSuccessContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="checkout-success-content">
      <div className="success-icon">
        <i className="bi bi-check-circle-fill"></i>
      </div>
      <h1>Commande confirmée !</h1>
      <p className="success-message">
        Merci pour votre achat. Votre commande a été traitée avec succès.
      </p>
      {sessionStatus?.order && (
        <div className="order-details">
          <p>
            <strong>Numéro de commande:</strong> #{sessionStatus.order.id}
          </p>
          <p>
            <strong>Montant total:</strong>{" "}
            {sessionStatus.order.totalAmount.toFixed(2)} €
          </p>
        </div>
      )}
      <div className="success-actions">
        <button className="btn-primary" onClick={() => navigate("/")}>
          Retour à l'accueil
        </button>
        <button className="btn-secondary" onClick={() => navigate("/orders")}>
          Voir mes commandes
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccessContent;
