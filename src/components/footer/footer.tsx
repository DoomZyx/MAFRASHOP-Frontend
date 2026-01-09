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
                <Link to="/contact">Nous contacter</Link>
              </li>
              <li>
                <Link to="/expertise">Notre expertise</Link>
              </li>
              <li>
                <Link to="/careers">Carrières</Link>
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
              <li>
                <Link to="/faq">Questions fréquentes</Link>
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
            <h3 className="footer-title">SUIVEZ-NOUS</h3>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
            </div>
            <p className="footer-contact-info">
              Email: contact@mafrashop.com
              <br />
              Tél: +33 1 23 45 67 89
            </p>
          </div>
        </div>

        <RaceCarousel />

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 MAFRA SHOP - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
