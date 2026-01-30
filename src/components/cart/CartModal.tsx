import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useCheckout } from "../../hooks/useCheckout";
import ProductPrice from "../shared/ProductPrice";
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
    isLoading,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
  } = useCart();
  const { user } = useAuth();
  const { handleCheckout, loading: checkoutLoading } = useCheckout();
  const isPro = user?.isPro || false;

  if (!isOpen) return null;

  const total = getCartTotal();

  const handleCheckoutClick = async () => {
    try {
      await handleCheckout();
      onClose();
    } catch (error) {
      console.error("Erreur lors du checkout:", error);
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
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="cart-item-image"
                      >
                        {product.url_image ? (
                          <img src={product.url_image} alt={product.nom} />
                        ) : (
                          <div className="cart-item-placeholder">
                            <i className="bi bi-image"></i>
                          </div>
                        )}
                      </Link>

                      <div className="cart-item-info">
                        <Link
                          to={`/product/${product.id}`}
                          onClick={onClose}
                          className="cart-item-name"
                        >
                          {product.nom}
                        </Link>
                        {product.ref && (
                          <p className="cart-item-ref">Ref: {product.ref}</p>
                        )}

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

              <div className="cart-footer">
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
                    disabled={isLoading || checkoutLoading || cart.length === 0}
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
