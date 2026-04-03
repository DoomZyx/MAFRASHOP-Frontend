import { useNavigate } from "react-router-dom";
import { PICKUP_STORE_ADDRESS } from "../../../constants/pickupStore";
import "./CheckoutSuccessContent.scss";

interface CheckoutSuccessContentProps {
  sessionStatus: any;
}

const CheckoutSuccessContent = ({ sessionStatus }: CheckoutSuccessContentProps) => {
  const navigate = useNavigate();
  const isProcessing = Boolean(sessionStatus?.processing && !sessionStatus?.order);

  return (
    <div className="checkout-success-content">
      <div className="success-icon">
        <i className="bi bi-check-circle-fill"></i>
      </div>
      <h1>{isProcessing ? "Paiement valide, commande en cours..." : "Commande confirmée !"}</h1>
      <p className="success-message">
        {isProcessing
          ? "Votre paiement est validé. Nous finalisons votre commande, cela peut prendre quelques secondes."
          : "Merci pour votre achat. Votre commande a été traitée avec succès."}
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
          {sessionStatus.order.fulfillmentType === "pickup" && (
            <p className="pickup-notice">
              <strong>Click &amp; collect :</strong> retrait au {PICKUP_STORE_ADDRESS}. Vous recevrez un e-mail
              lorsque la commande sera prête.
            </p>
          )}
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
