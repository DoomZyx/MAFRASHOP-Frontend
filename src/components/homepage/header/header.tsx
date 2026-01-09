import "./header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="header-homepage">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              L'EXPERTISE PROFESSIONNELLE DE L'ENTRETIEN AUTOMOBILE
            </h1>
            <Link to="/shop" className="hero-btn-catalogue">
              ACCÉDER AU CATALOGUE
            </Link>
          </div>
        </div>

        <div className="logo-section">
          <img
            src="/public/images/logoMAFRA.webp"
            alt="Logo Mafra Shop"
            className="main-logo"
          />
        </div>
      </header>
    </>
  );
}

export default Header;
