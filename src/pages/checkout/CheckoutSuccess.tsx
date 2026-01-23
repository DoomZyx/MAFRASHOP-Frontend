import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCheckout } from "../../hooks/useCheckout";
import Loader from "../../components/loader/loader";
import "./CheckoutSuccess.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checkSessionStatus, loading } = useCheckout();
  const [sessionStatus, setSessionStatus] = useState<any>(null);
  const [verifying, setVerifying] = useState(true);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      verifySession();
    } else {
      setVerifying(false);
    }
  }, [sessionId]);

  const verifySession = async () => {
    try {
      const response = await checkSessionStatus(sessionId!);
      setSessionStatus(response.data);
      setVerifying(false);
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <div className="checkout-success-container">
        <div className="checkout-loading">
          <Loader />
          <p>Vérification de votre commande...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-success-container">
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
          <button
            className="btn-primary"
            onClick={() => navigate("/")}
          >
            Retour à l'accueil
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate("/orders")}
          >
            Voir mes commandes
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSuccess;

