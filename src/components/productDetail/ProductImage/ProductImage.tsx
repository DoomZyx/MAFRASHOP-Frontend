import "./ProductImage.scss";
import { getImageUrl } from "../../../utils/imageUtils";

interface ProductImageProps {
  imageUrl?: string;
  productName: string;
}

const ProductImage = ({ imageUrl, productName }: ProductImageProps) => {
  const normalizedUrl = getImageUrl(imageUrl);
  
  return (
    <div className="product-image-section">
      {normalizedUrl ? (
        <img 
          src={normalizedUrl} 
          alt={productName}
          loading="eager"
        />
      ) : (
        <div className="product-image-placeholder">
          <i className="bi bi-image"></i>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
