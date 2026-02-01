import "./ProductImage.scss";

interface ProductImageProps {
  imageUrl?: string;
  productName: string;
}

const ProductImage = ({ imageUrl, productName }: ProductImageProps) => {
  return (
    <div className="product-image-section">
      {imageUrl ? (
        <img src={imageUrl} alt={productName} />
      ) : (
        <div className="product-image-placeholder">
          <i className="bi bi-image"></i>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
