import { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import MenuButton from "../buttons/menu/menuButton";
import useResponsive from "../../hooks/useResponsive";
import MenuBurger from "../menuBurger/menu";
import MenuDesktop from "../menuDesktop/menu";
import useModal from "../../hooks/useModal";
import { useNav } from "../../hooks/useNav";
import { useCart } from "../../hooks/useCart";
import AuthModal from "../auth/AuthModal";
import ProRequestModal from "../auth/ProRequestModal";
import CartModal from "../cart/CartModal";
import FavoritesModal from "../favorites/FavoritesModal";

function Nav() {
  const { isModalOpen, toggleModal } = useModal();
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const deviceType = useResponsive();
  const {
    isAuthModalOpen,
    user,
    isAuthenticated,
    openAuthModal,
    closeAuthModal,
    handleLogout,
  } = useNav();
  const { getCartCount } = useCart();

  // Afficher le bouton pro si l'utilisateur est connecté mais pas pro (ou demande rejetée)
  const showProButton =
    isAuthenticated &&
    user &&
    !user.isPro &&
    (user.proStatus === "none" || user.proStatus === "rejected");

  return (
    <nav>
      {deviceType === "desktop" ? (
        <div className="nav-desktop">
          <div className="nav-left">
            <svg
              className="nav-curve-left"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2000 77"
              preserveAspectRatio="none"
            >
              <defs>
                <style>{`.a{fill:#27292a;}.b{fill:#fff;opacity:0.2;}`}</style>
              </defs>
              <path
                className="a"
                d="M0,0V77H1898.53a59.1,59.1,0,0,0,41.8-17.33L2000,0Z"
              />
              <path
                className="b"
                d="M1998.59,0l-59,59a57.67,57.67,0,0,1-41.09,17H0v1H1898.53a59.06,59.06,0,0,0,41.8-17.33L2000,0Z"
              />
            </svg>
            <div className="nav-left-content">
              <button className="menu-toggle" onClick={toggleModal}>
                <i className="bi bi-list"></i>
                <span>MENU</span>
              </button>
              {isModalOpen && (
                <div className="mobile-menu-overlay">
                  <MenuDesktop
                    isModalOpen={isModalOpen}
                    toggleModal={toggleModal}
                  />
                </div>
              )}
              <ul className="nav-menu-links">
                <li>
                  <Link to="/">ACCUEIL</Link>
                </li>
                <li>
                  <Link to="/shop">Catalogue</Link>
                </li>
                <li>
                  <Link to="/expertise">NOTRE EXPERTISE</Link>
                </li>
                <li>
                  <Link to="/contact">NOUS CONTACTER</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="nav-center">
            <img src="/images/logoMAFRA.webp" alt="MAFRA" className="nav-logo" />
          </div>

          <div className="nav-right">
            <div className="nav-right-content">
              <div className="nav-icons">
                {isAuthenticated && (
                  <>
                    <button
                      className="nav-icon-btn"
                      title="Panier"
                      onClick={() => setIsCartModalOpen(true)}
                    >
                      <i className="bi bi-cart"></i>
                      {getCartCount() > 0 && (
                        <span className="nav-icon-badge">{getCartCount()}</span>
                      )}
                    </button>
                    <button
                      className="nav-icon-btn"
                      title="Favoris"
                      onClick={() => setIsFavoritesModalOpen(true)}
                    >
                      <i className="bi bi-heart"></i>
                    </button>
                  </>
                )}
                {isAuthenticated && (
                  <Link to="/profile">
                    <button className="nav-icon-btn">
                      <i className="bi bi-person"></i>
                    </button>
                  </Link>
                )}
              </div>
              {isAuthenticated ? (
                <>
                  {showProButton && (
                    <button
                      className="nav-btn-pro"
                      onClick={() => setIsProModalOpen(true)}
                      title="Devenir professionnel"
                    >
                      <i className="bi bi-briefcase"></i>
                      DEVENIR PRO
                    </button>
                  )}
                  <div className="nav-user-info">
                    {user?.avatar && (
                      <img
                        src={user.avatar}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="nav-user-avatar"
                      />
                    )}
                    <span className="nav-user-name">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                  <button className="nav-btn-logout" onClick={handleLogout}>
                    DÉCONNEXION
                  </button>
                </>
              ) : (
                <>
                  <button className="nav-btn-connect" onClick={openAuthModal}>
                    SE CONNECTER
                  </button>
                  <button className="nav-btn-register" onClick={openAuthModal}>
                    S'INSCRIRE
                  </button>
                </>
              )}
            </div>
            <svg
              className="nav-curve-right"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2000 77"
              preserveAspectRatio="none"
            >
              <defs>
                <style>{`.a{fill:#27292a;}.b{fill:#fff;opacity:0.2;}`}</style>
              </defs>
              <path
                className="a"
                d="M0,0V77H1898.53a59.1,59.1,0,0,0,41.8-17.33L2000,0Z"
              />
              <path
                className="b"
                d="M1998.59,0l-59,59a57.67,57.67,0,0,1-41.09,17H0v1H1898.53a59.06,59.06,0,0,0,41.8-17.33L2000,0Z"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="nav-container">
          <MenuButton onClick={toggleModal} />
          {isAuthenticated && (
            <div className="nav-mobile-icons">
              <button
                className="nav-icon-btn"
                title="Panier"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsCartModalOpen(true);
                }}
              >
                <i className="bi bi-cart"></i>
                {getCartCount() > 0 && (
                  <span className="nav-icon-badge">{getCartCount()}</span>
                )}
              </button>
              <button
                className="nav-icon-btn"
                title="Favoris"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsFavoritesModalOpen(true);
                }}
              >
                <i className="bi bi-heart"></i>
              </button>
            </div>
          )}
          {isModalOpen && (
            <div className="mobile-menu-overlay">
              <MenuBurger isModalOpen={isModalOpen} toggleModal={toggleModal} />
            </div>
          )}
        </div>
      )}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
      <ProRequestModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
      {isAuthenticated && (
        <>
          <CartModal
            isOpen={isCartModalOpen}
            onClose={() => setIsCartModalOpen(false)}
          />
          <FavoritesModal
            isOpen={isFavoritesModalOpen}
            onClose={() => setIsFavoritesModalOpen(false)}
          />
        </>
      )}
    </nav>
  );
}

export default Nav;
