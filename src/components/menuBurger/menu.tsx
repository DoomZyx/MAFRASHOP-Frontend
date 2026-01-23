import { useState } from "react";
import { Link } from "react-router-dom";
import LoginButtonMobile from "../buttons/primary/login/mobile/login";
import LogoutButtonMobile from "../buttons/primary/login/mobile/logout";
import "./menu.scss";
import SearchProducts from "../shop/searchProducts/searchProducts";
import { useProducts } from "../../hooks/useProducts";
import AuthModal from "../auth/AuthModal";
import ProRequestModal from "../auth/ProRequestModal";
import CartModal from "../cart/CartModal";
import FavoritesModal from "../favorites/FavoritesModal";
import { useNav } from "../../hooks/useNav";
import { useCart } from "../../hooks/useCart";
import Avatar from "../shared/Avatar";

interface MenuBurgerProps {
  isModalOpen: boolean;
  toggleModal: () => void;
}

function MenuBurger({ isModalOpen, toggleModal }: MenuBurgerProps) {
  const { products } = useProducts();
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const {
    isAuthModalOpen,
    user,
    isAuthenticated,
    openAuthModal,
    closeAuthModal,
    handleLogout,
  } = useNav();
  const { getCartCount } = useCart();

  const showProButton =
    isAuthenticated &&
    user &&
    !user.isPro &&
    (user.proStatus === "none" || user.proStatus === "rejected");

  return (
    <nav>
      <div className="menu-burger">
        <div className="menu-burger-container">
          <div className="menu-header">
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
                    <Avatar
                      src={user?.avatar}
                      alt={`${user?.firstName || ""} ${user?.lastName || ""}`}
                      size="medium"
                      className="nav-user-avatar"
                    />
                    <span className="nav-user-name">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <ul className="links-burger">
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
                <Link to="/profile" onClick={toggleModal}>
                  MON COMPTE
                </Link>
              </li>
              <li>
                <Link to="/orders" onClick={toggleModal}>
                  MES COMMANDES
                </Link>
              </li>
            </ul>
            {isAuthenticated ? (
              <>
                <div className="nav-btn-layout">
                  {showProButton && (
                    <div className="nav-btn-container">
                      <button
                        className="nav-btn-pro"
                        onClick={() => setIsProModalOpen(true)}
                      >
                        <i className="bi bi-briefcase"></i>
                        DEVENIR PRO
                      </button>
                    </div>
                  )}
                  <div className="nav-btn-container">
                    <button className="nav-btn-logout" onClick={handleLogout}>
                      SE DECONNECTER
                    </button>
                  </div>
                </div>
              </>
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
      <ProRequestModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
      />
    </nav>
  );
}

export default MenuBurger;
