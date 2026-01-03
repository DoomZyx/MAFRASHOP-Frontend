import { Link } from "react-router-dom";
import LoginButtonMobile from "../buttons/primary/login/mobile/login";
import LogoutButtonMobile from "../buttons/primary/login/mobile/logout";
import "./menu.scss";
import SearchProducts from "../shop/searchProducts/searchProducts";
import { useProducts } from "../../hooks/useProducts";
import AuthModal from "../auth/AuthModal";
import { useNav } from "../../hooks/useNav";

interface MenuBurgerProps {
  isModalOpen: boolean;
  toggleModal: () => void;
}

function MenuBurger({ isModalOpen, toggleModal }: MenuBurgerProps) {
  const { products } = useProducts();
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
      <div className="menu-burger">
        <div className="menu-burger-container">
          <div className="menu-header">
            <img src="/public/logoMAFRA.webp" alt="Logo Mafrashop" />
            <button
              className="close-menu-button"
              onClick={toggleModal}
              aria-label="Fermer le menu"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div className="links-burger-container">
            <div className="nav-mobile-profile-container">
              {isAuthenticated ? (
                <>
                  <div className="nav-user-info">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="nav-user-avatar"
                      />
                    ) : (
                      <div className="avatar">
                        <i className="bi bi-person"></i>
                      </div>
                    )}
                    <span className="nav-user-name">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <ul className="links">
              <li>
                <Link to="/" onClick={toggleModal}>
                  ACCUEIL
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={toggleModal}>
                  CATALOGUE
                </Link>
              </li>
              <li>
                <Link to="/sav" onClick={toggleModal}>
                  MON COMPTE
                </Link>
              </li>
            </ul>
            {isAuthenticated ? (
              <div className="nav-btn-container">
                <button className="nav-btn-logout" onClick={handleLogout}>
                  SE DECONNECTER
                </button>
              </div>
            ) : (
              <div className="nav-btn-container">
                <button className="nav-btn-connect" onClick={openAuthModal}>
                  SE CONNECTER
                </button>
              </div>
            )}
            <div className="search-products-mobile">
              <SearchProducts products={products} />
            </div>
          </div>

          <div className="menu-line"></div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </nav>
  );
}

export default MenuBurger;
