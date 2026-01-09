import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import ProductPrice from "../shared/ProductPrice";
import "./cartModal.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TVA_RATE = 1.2; // TVA de 20% pour les particuliers

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
  const isPro = user?.isPro || false;

  if (!isOpen) return null;

  const total = getCartTotal();

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
    if (isPro) {
      return product.GARAGE || product.PUBLIC_HT || 0;
    } else {
      const priceHT = product.PUBLIC_HT || 0;
      return priceHT * TVA_RATE; // Prix TTC pour les particuliers
    }
  };

  const getPriceSuffix = () => {
    return isPro ? "€ HT" : "€ TTC";
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
                    <div key={product._id} className="cart-item">
                      <Link
                        to={`/product/${product._id}`}
                        onClick={onClose}
                        className="cart-item-image"
                      >
                        {product.URL_IMAGE ? (
                          <img src={product.URL_IMAGE} alt={product.NOM} />
                        ) : (
                          <div className="cart-item-placeholder">
                            <i className="bi bi-image"></i>
                          </div>
                        )}
                      </Link>

                      <div className="cart-item-info">
                        <Link
                          to={`/product/${product._id}`}
                          onClick={onClose}
                          className="cart-item-name"
                        >
                          {product.NOM}
                        </Link>
                        {product.REF && (
                          <p className="cart-item-ref">Ref: {product.REF}</p>
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
                                  product._id,
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
                                  product._id,
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
                              const success = await removeFromCart(product._id);
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
                    disabled={isLoading}
                  >
                    VIDER LE PANIER
                  </button>
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="cart-checkout-btn"
                  >
                    COMMANDER
                  </Link>
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
