import "./ProductError.scss";

interface ProductErrorProps {
  message: string;
}

const ProductError = ({ message }: ProductErrorProps) => {
  return (
    <div className="product-error-container">
      <p className="error-message">{message}</p>
    </div>
  );
};

export default ProductError;
