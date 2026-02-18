import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useCheckout } from "../../hooks/useCheckout";
import ProductPrice from "../shared/ProductPrice";
import { getImageUrl } from "../../utils/imageUtils";
import "./cartModal.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TVA_RATE = 1.2; // TVA 20% : TTC pour tous à la validation du panier

function CartModal({ isOpen, onClose }: CartModalProps) {
  const {
    cart,
    perfumeValidation,
    isLoading,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartSubtotal,
    getDeliveryFee,
    getCartTotal,
  } = useCart();
  const { user } = useAuth();
  const { handleCheckout, loading: checkoutLoading } = useCheckout();
  const isPro = user?.isPro || false;
  const [perfumeWarningDismissed, setPerfumeWarningDismissed] = useState(false);

  useEffect(() => {
    if (isOpen) setPerfumeWarningDismissed(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = getCartSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getCartTotal();

  const handleCheckoutClick = async () => {
    try {
      // Validation parfums (minimum 6) : uniquement pour les pros
      if (isPro && perfumeValidation && !perfumeValidation.isValid) {
        alert(
          perfumeValidation.message ||
          `Vous devez commander au minimum ${perfumeValidation.minimumRequired} produits parfum. Vous en avez actuellement ${perfumeValidation.totalCount}.`
        );
        return;
      }

      await handleCheckout();
      onClose();
    } catch (error: any) {
      console.error("Erreur lors du checkout:", error);
      
      // Erreur validation parfums (backend ne renvoie que pour les pros, garde défensive)
      if (isPro && (error?.data?.perfumeValidation || error?.message?.includes("parfum"))) {
        const errorData = error.data || error.response?.data;
        if (errorData?.perfumeValidation) {
          const { totalCount, minimumRequired } = errorData.perfumeValidation;
          alert(
            errorData.message || 
            `Vous devez commander au minimum ${minimumRequired} produits parfum. Vous en avez actuellement ${totalCount}.`
          );
        } else {
          alert(error.message || "Erreur lors du checkout");
        }
      } else {
        alert(error.message || "Erreur lors du checkout");
      }
    }
  };

  const handleQuantityChange = async (
    productId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) {
      await removeFromCart(productId);
    } else {
      await updateQuantity(productId, newQuantity);
    }
  };

  const getItemPrice = (product: any) => {
    const priceHT = isPro
      ? (product.garage || product.public_ht || 0)
      : (product.public_ht || 0);
    return priceHT * TVA_RATE;
  };

  const getPriceSuffix = () => {
    return "€ TTC";
  };

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cart-modal-close" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="cart-modal-content">
          <h2 className="cart-modal-title">PANIER</h2>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <i className="bi bi-cart-x"></i>
              <p>Votre panier est vide</p>
              <Link to="/shop" onClick={onClose} className="cart-empty-link">
                CONTINUER LES ACHATS
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => {
                  const product = item.productId;
                  const price = getItemPrice(product);
                  const itemTotal = price * item.quantity;

                  return (
                    <div key={product.id} className="cart-item">
                      <Link
                        to={`/${product.slug || product.id}`}
                        onClick={onClose}
                        className="cart-item-image"
                      >
                        {(() => {
                          const imageUrl = getImageUrl(product.url_image);
                          return imageUrl ? (
                            <img src={imageUrl} alt={product.nom} />
                          ) : (
                            <div className="cart-item-placeholder">
                              <i className="bi bi-image"></i>
                            </div>
                          );
                        })()}
                      </Link>

                      <div className="cart-item-info">
                        <Link
                          to={`/${product.slug || product.id}`}
                          onClick={onClose}
                          className="cart-item-name"
                        >
                          {product.nom}
                        </Link>

                        <div className="cart-item-price">
                          <ProductPrice product={product} />
                        </div>

                        <div className="cart-item-actions">
                          <div className="quantity-controls">
                            <button
                              className="quantity-btn"
                              onClick={() =>
                                handleQuantityChange(
                                  product.id,
                                  item.quantity - 1
                                )
                              }
                              disabled={isLoading}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                            <span className="quantity-value">
                              {item.quantity}
                            </span>
                            <button
                              className="quantity-btn"
                              onClick={() =>
                                handleQuantityChange(
                                  product.id,
                                  item.quantity + 1
                                )
                              }
                              disabled={isLoading}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>

                          <div className="cart-item-total">
                            <span className="item-total-label">
                              Sous-total:
                            </span>
                            <span className="item-total-value">
                              {itemTotal.toFixed(2)}
                              {getPriceSuffix()}
                            </span>
                          </div>

                          <button
                            className="cart-item-remove"
                            onClick={async (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const success = await removeFromCart(product.id);
                              if (!success) {
                                console.error(
                                  "Erreur lors de la suppression du panier"
                                );
                              }
                            }}
                            disabled={isLoading}
                            title="Retirer du panier"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {isPro && perfumeValidation && !perfumeValidation.isValid && !perfumeWarningDismissed && (
                <div className="cart-perfume-warning">
                  <button
                    type="button"
                    className="cart-perfume-warning-close"
                    onClick={() => setPerfumeWarningDismissed(true)}
                    title="Fermer"
                    aria-label="Fermer"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                  <i className="bi bi-exclamation-triangle"></i>
                  <p>{perfumeValidation.message}</p>
                  <span className="perfume-count">
                    Produits parfum: {perfumeValidation.totalCount} / {perfumeValidation.minimumRequired}
                  </span>
                </div>
              )}

              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="cart-summary-row">
                    <span className="cart-summary-label">Sous-total</span>
                    <span className="cart-summary-value">
                      {subtotal.toFixed(2)}
                      {getPriceSuffix()}
                    </span>
                  </div>
                  <div className="cart-summary-row">
                    <span className="cart-summary-label">Frais de livraison</span>
                    <span className="cart-summary-value">
                      {Number(deliveryFee) === 0 ? "Offerts" : `${Number(deliveryFee).toFixed(2)} €`}
                    </span>
                  </div>
                </div>
                <div className="cart-total">
                  <span className="cart-total-label">TOTAL</span>
                  <span className="cart-total-value">
                    {total.toFixed(2)}
                    {getPriceSuffix()}
                  </span>
                </div>

                <div className="cart-actions">
                  <button
                    className="cart-clear-btn"
                    onClick={clearCart}
                    disabled={isLoading || checkoutLoading}
                  >
                    VIDER LE PANIER
                  </button>
                  <button
                    className="cart-checkout-btn"
                    onClick={handleCheckoutClick}
                    disabled={
                      isLoading ||
                      checkoutLoading ||
                      cart.length === 0 ||
                      Boolean(isPro && perfumeValidation && !perfumeValidation.isValid)
                    }
                    title={
                      isPro && perfumeValidation && !perfumeValidation.isValid
                        ? (perfumeValidation.message ?? "Vous devez commander au minimum 6 parfums différents")
                        : undefined
                    }
                  >
                    {checkoutLoading ? "TRAITEMENT..." : "COMMANDER"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartModal;
