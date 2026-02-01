import ProductImage from "../ProductImage/ProductImage";
import ProductInfo from "../ProductInfo/ProductInfo";
import ProductActions from "../ProductActions/ProductActions";
import "./ProductDetailContent.scss";

interface Product {
  id: string;
  nom: string;
  format?: string;
  description?: string;
  url_image?: string;
  prix_ht: number;
  prix_ttc: number;
}

interface ProductDetailContentProps {
  product: Product;
  isAuthenticated: boolean;
  isFavorite: boolean;
  isInCart: boolean;
  isOutOfStock?: boolean;
  onToggleFavorite: () => void;
  onAddToCart: () => void;
}

const ProductDetailContent = ({
  product,
  isAuthenticated,
  isFavorite,
  isInCart,
  isOutOfStock = false,
  onToggleFavorite,
  onAddToCart,
}: ProductDetailContentProps) => {
  return (
    <div className="product-detail-content">
      <ProductImage imageUrl={product.url_image} productName={product.nom} />

      <div className="product-info-section-wrapper">
        <ProductInfo product={product} isOutOfStock={isOutOfStock} />

        {isAuthenticated && (
          <ProductActions
            productId={product.id}
            isFavorite={isFavorite}
            isInCart={isInCart}
            isOutOfStock={isOutOfStock}
            onToggleFavorite={onToggleFavorite}
            onAddToCart={onAddToCart}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetailContent;
