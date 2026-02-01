import { useNavigate } from "react-router-dom";
import "./CheckoutCancelContent.scss";

const CheckoutCancelContent = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout-cancel-content">
      <div className="cancel-icon">
        <i className="bi bi-x-circle-fill"></i>
      </div>
      <h1>Paiement annulé</h1>
      <p className="cancel-message">
        Votre paiement a été annulé. Aucun montant n'a été débité.
      </p>
      <div className="cancel-actions">
        <button className="btn-primary" onClick={() => navigate("/cart")}>
          Retour au panier
        </button>
        <button className="btn-secondary" onClick={() => navigate("/")}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default CheckoutCancelContent;
