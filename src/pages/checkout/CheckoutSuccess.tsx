import { useSearchParams } from "react-router-dom";
import { useCheckoutSuccess } from "../../hooks/useCheckoutSuccess";
import Loader from "../../components/loader/loader";
import CheckoutSuccessContent from "../../components/checkout/CheckoutSuccessContent/CheckoutSuccessContent";
import "./CheckoutSuccess.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { sessionStatus, verifying } = useCheckoutSuccess(sessionId);

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
      <CheckoutSuccessContent sessionStatus={sessionStatus} />
    </div>
  );
}

export default CheckoutSuccess;

