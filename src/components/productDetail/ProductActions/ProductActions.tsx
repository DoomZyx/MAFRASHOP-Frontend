import "./ProductActions.scss";

interface ProductActionsProps {
  productId: string;
  isFavorite: boolean;
  isInCart: boolean;
  onToggleFavorite: () => void;
  onAddToCart: () => void;
}

const ProductActions = ({
  productId,
  isFavorite,
  isInCart,
  onToggleFavorite,
  onAddToCart,
}: ProductActionsProps) => {
  return (
    <div className="product-actions">
      <button
        className={`product-action-btn favorite-btn ${
          isFavorite ? "active" : ""
        }`}
        onClick={onToggleFavorite}
        title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
        <span>{isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}</span>
      </button>
      <button
        className={`product-action-btn cart-btn ${isInCart ? "active" : ""}`}
        onClick={onAddToCart}
        title={isInCart ? "Déjà dans le panier" : "Ajouter au panier"}
      >
        <i
          className={`bi ${isInCart ? "bi-cart-check-fill" : "bi-cart"}`}
        ></i>
        <span>{isInCart ? "Déjà dans le panier" : "Ajouter au panier"}</span>
      </button>
    </div>
  );
};

export default ProductActions;
