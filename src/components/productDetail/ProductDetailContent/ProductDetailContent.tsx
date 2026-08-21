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
}

const ProductDetailContent = ({
  product,
  isAuthenticated,
  isFavorite,
  onToggleFavorite,
}: ProductDetailContentProps) => {
  return (
    <div className="product-detail-content">
      <ProductImage imageUrl={product.url_image} productName={product.nom} />

      <div className="product-info-section-wrapper">
        <ProductInfo product={product} />

        {isAuthenticated && (
          <ProductActions
            productId={product.id}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetailContent;
