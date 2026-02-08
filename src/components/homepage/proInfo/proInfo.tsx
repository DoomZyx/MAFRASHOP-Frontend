import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import "./proInfo.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function ProInfo() {
  const { user, isAuthenticated } = useAuth();
  const isPro = user?.isPro || false;
  const isProPending = user?.proStatus === "pending";

  return (
    <div className="pro-info-section">
      <div className="pro-info-container">
        <div className="pro-info-icon">
          <i className="bi bi-briefcase-fill"></i>
        </div>
        <div className="pro-info-content">
          <h2 className="pro-info-title">Tarifs Professionnels</h2>
          <p className="pro-info-description">
            Les professionnels authentifiés bénéficient de <strong>prix professionnels</strong> exclusifs sur tous nos produits.
          </p>
          {!isAuthenticated ? (
            <div className="pro-info-actions">
              <Link to="/profile" className="pro-info-link">
                Créer un compte professionnel
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          ) : !isPro ? (
            <div className="pro-info-actions">
              <Link to="/profile" className="pro-info-link">
                Demander l'accès professionnel
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          ) : isProPending ? (
            <div className="pro-info-status pro-info-status--pending">
              <i className="bi bi-hourglass-split"></i>
              <span>Votre demande est en cours de vérification (délai de 48h)</span>
            </div>
          ) : (
            <div className="pro-info-status pro-info-status--active">
              <i className="bi bi-check-circle-fill"></i>
              <span>Vous bénéficiez des tarifs professionnels</span>
            </div>
          )}
        </div>
        <div className="pro-info-details">
          <div className="pro-info-detail-item">
            <i className="bi bi-shield-check"></i>
            <div>
              <h3>Vérification en 48h</h3>
              <p>Votre compte professionnel est validé sous 48h après renseignement de vos informations.</p>
            </div>
          </div>
          <div className="pro-info-detail-item">
            <i className="bi bi-tag-fill"></i>
            <div>
              <h3>Prix professionnels</h3>
              <p>Accédez à des tarifs préférentiels réservés aux professionnels de l'automobile.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProInfo;

