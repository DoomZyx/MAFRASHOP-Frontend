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
            src="/images/logoMAFRA.webp"
            alt="Logo MAFRA"
            className="main-logo"
            width="143"
            height="50"
            loading="eager"
          />
        </div>
      </header>
    </>
  );
}

export default Header;
