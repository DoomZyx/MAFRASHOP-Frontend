import ProductPrice from "../../shared/ProductPrice";
import "./ProductInfo.scss";

interface Product {
  id: string;
  nom: string;
  format?: string;
  description?: string;
  prix_ht: number;
  prix_ttc: number;
}

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className="product-info-section">
      <h1>{product.nom}</h1>

      {product.format && (
        <div className="product-format">
          <span className="format-label">Format :</span>
          <span>{product.format}</span>
        </div>
      )}

      {product.description && (
        <div className="product-description">
          <p>{product.description}</p>
        </div>
      )}

      <ProductPrice product={product} className="product-price" />
    </div>
  );
};

export default ProductInfo;
