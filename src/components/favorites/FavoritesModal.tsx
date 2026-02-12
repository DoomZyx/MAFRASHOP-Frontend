import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { useCart } from "../../hooks/useCart";
import ProductPrice from "../shared/ProductPrice";
import { getImageUrl } from "../../utils/imageUtils";
import "./favoritesModal.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const { favorites, isLoading, removeFromFavorites } = useFavorites();
  const { addToCart, isInCart } = useCart();

  if (!isOpen) return null;

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId);
  };

  return (
    <div className="favorites-modal-overlay" onClick={onClose}>
      <div className="favorites-modal" onClick={(e) => e.stopPropagation()}>
        <button className="favorites-modal-close" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="favorites-modal-content">
          <h2 className="favorites-modal-title">FAVORIS</h2>

          {favorites.length === 0 ? (
            <div className="favorites-empty">
              <i className="bi bi-heart"></i>
              <p>Vous n'avez aucun produit en favoris</p>
              <Link
                to="/shop"
                onClick={onClose}
                className="favorites-empty-link"
              >
                DÉCOUVRIR LES PRODUITS
              </Link>
            </div>
          ) : (
            <div className="favorites-items">
              {favorites.map((item) => {
                const product = item.productId;

                return (
                  <div key={product.id} className="favorites-item">
                    <Link
                      to={`/${product.slug || product.id}`}
                      onClick={onClose}
                      className="favorites-item-image"
                    >
                      {(() => {
                        const imageUrl = getImageUrl(product.url_image);
                        return imageUrl ? (
                          <img src={imageUrl} alt={product.nom} />
                        ) : (
                          <div className="favorites-item-placeholder">
                            <i className="bi bi-image"></i>
                          </div>
                        );
                      })()}
                    </Link>

                    <div className="favorites-item-info">
                      <Link
                        to={`/${product.slug || product.id}`}
                        onClick={onClose}
                        className="favorites-item-name"
                      >
                        {product.nom}
                      </Link>
                      {product.ref && (
                        <p className="favorites-item-ref">Ref: {product.ref}</p>
                      )}
                      {product.category && (
                        <p className="favorites-item-category">
                          {product.category}
                        </p>
                      )}

                      <div className="favorites-item-price">
                        <ProductPrice product={product} />
                      </div>

                      <div className="favorites-item-actions">
                        <button
                          className={`favorites-add-cart-btn ${
                            isInCart(product.id) ? "in-cart" : ""
                          }`}
                          onClick={() => handleAddToCart(product.id)}
                          disabled={isLoading || isInCart(product.id)}
                        >
                          <i
                            className={`bi ${
                              isInCart(product.id)
                                ? "bi-cart-check-fill"
                                : "bi-cart-plus"
                            }`}
                          ></i>
                          <span>
                            {isInCart(product.id)
                              ? "Dans le panier"
                              : "Ajouter au panier"}
                          </span>
                        </button>

                        <button
                          className="favorites-remove-btn"
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const success = await removeFromFavorites(
                              product.id
                            );
                            if (!success) {
                              console.error(
                                "Erreur lors de la suppression des favoris"
                              );
                            }
                          }}
                          disabled={isLoading}
                          title="Retirer des favoris"
                        >
                          <i className="bi bi-heart-fill"></i>
                          <span>Retirer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoritesModal;
