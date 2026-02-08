import "./footer.scss";
import { Link } from "react-router-dom";
import RaceCarousel from "./raceCarousel/raceCarousel";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo-section">
          <img
            src="/images/fanatecLogo.webp"
            alt="Logo FANATEC"
            className="footer-logo"
          />
        </div>

        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-title">À PROPOS</h3>
            <ul className="footer-links">
              <li>
                <Link to="/about">Qui sommes-nous</Link>
              </li>
              <li>
                <Link to="/expertise">Notre expertise</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">AIDE & SERVICE</h3>
            <ul className="footer-links">
              <li>
                <Link to="/sav">SAV</Link>
              </li>
              <li>
                <Link to="/shipping">Livraison</Link>
              </li>
              <li>
                <Link to="/returns">Retours & Remboursements</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">INFORMATIONS LÉGALES</h3>
            <ul className="footer-links">
              <li>
                <Link to="/terms">Conditions générales de vente</Link>
              </li>
              <li>
                <Link to="/privacy">Politique de confidentialité</Link>
              </li>
              <li>
                <Link to="/mentions">Mentions légales</Link>
              </li>
              <li>
                <Link to="/cookies">Gestion des cookies</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">CONTACTEZ NOUS</h3>
            <p className="footer-contact-info">
              Email: contact.mymafrashop@gmail.com
              <br />
              Tél: +33 6 08 49 94 32
            </p>
          </div>
        </div>

        <RaceCarousel />

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 MAFRA SHOP - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
