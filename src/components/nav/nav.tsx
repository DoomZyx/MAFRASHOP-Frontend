import { Link } from "react-router-dom";
import "./nav.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import MenuButton from "../buttons/menu/menuButton";
import useResponsive from "../../hooks/useResponsive";
import MenuBurger from "../menuBurger/menu";
import MenuDesktop from "../menuDesktop/menu";
import useModal from "../../hooks/useModal";
import { useNav } from "../../hooks/useNav";
import AuthModal from "../auth/AuthModal";

function Nav() {
  const { isModalOpen, toggleModal } = useModal();
  const deviceType = useResponsive();
  const {
    isAuthModalOpen,
    user,
    isAuthenticated,
    openAuthModal,
    closeAuthModal,
    handleLogout,
  } = useNav();

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
                  <Link to="/sav">SAV</Link>
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
            <img src="/logoMAFRA.webp" alt="MAFRA" className="nav-logo" />
          </div>

          <div className="nav-right">
            <div className="nav-right-content">
              <div className="nav-icons">
                <button className="nav-icon-btn">
                  <i className="bi bi-cart"></i>
                </button>
                <button className="nav-icon-btn">
                  <i className="bi bi-heart"></i>
                </button>
                {isAuthenticated && (
                  <button className="nav-icon-btn">
                    <i className="bi bi-person"></i>
                  </button>
                )}
              </div>
              {isAuthenticated ? (
                <>
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
          {isModalOpen && (
            <div className="mobile-menu-overlay">
              <MenuBurger isModalOpen={isModalOpen} toggleModal={toggleModal} />
            </div>
          )}
        </div>
      )}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </nav>
  );
}

export default Nav;
