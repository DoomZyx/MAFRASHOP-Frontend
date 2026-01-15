import { useAuth } from "../../hooks/useAuth";
import { Product } from "../../types/product";
import "./ProductPrice.scss";

interface ProductPriceProps {
  product: Product;
  className?: string;
}

const TVA_RATE = 1.2; // TVA de 20% pour les particuliers

function ProductPrice({ product, className = "" }: ProductPriceProps) {
  const { user } = useAuth();
  const isPro = user?.isPro || false;

  // Déterminer le prix à afficher
  let price: number | null = null;
  let priceSuffix = "";

  if (isPro) {
    price = product.garage || null;
    priceSuffix = "€ HT";
  } else {
    const priceHT = product.public_ht || null;
    if (priceHT !== null) {
      price = priceHT * TVA_RATE; // Prix TTC pour les particuliers
      priceSuffix = "€ TTC";
    }
  }

  if (price === null || price === undefined) {
    return <div className={className}>Prix non disponible</div>;
  }

  return (
    <div className={`product-price ${className}`}>
      <span className="price-value">
        {price.toFixed(2)}
        {priceSuffix}
      </span>
    </div>
  );
}

export default ProductPrice;
