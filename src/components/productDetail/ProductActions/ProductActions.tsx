import "./ProductActions.scss";

interface ProductActionsProps {
  productId: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ProductActions = ({
  productId,
  isFavorite,
  onToggleFavorite,
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
    </div>
  );
};

export default ProductActions;
