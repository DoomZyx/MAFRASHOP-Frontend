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

  // Déterminer le prix de base
  let basePrice: number | null = null;
  let priceSuffix = "";

  if (isPro) {
    basePrice = product.garage || null;
    priceSuffix = "€ HT";
  } else {
    const priceHT = product.public_ht || null;
    if (priceHT !== null) {
      basePrice = priceHT * TVA_RATE; // Prix TTC pour les particuliers
      priceSuffix = "€ TTC";
    }
  }

  if (basePrice === null || basePrice === undefined) {
    return <div className={className}>Prix non disponible</div>;
  }

  // Calculer le prix réduit si promotion active
  const hasPromotion = product.is_promotion && product.promotion_percentage && product.promotion_percentage > 0;
  let finalPrice = basePrice;
  let originalPrice = basePrice;

  if (hasPromotion && product.promotion_percentage) {
    // Calculer la réduction (soustraire le pourcentage)
    const discount = (basePrice * product.promotion_percentage) / 100;
    finalPrice = basePrice - discount; // SOUSTRAIRE, pas ajouter
    originalPrice = basePrice;
  }

  return (
    <div className={`product-price ${className}`}>
      {hasPromotion ? (
        <>
          <span className="price-original">{originalPrice.toFixed(2)}{priceSuffix}</span>
          <span className="price-discounted">{finalPrice.toFixed(2)}{priceSuffix}</span>
          <span className="price-discount-badge">-{product.promotion_percentage}%</span>
        </>
      ) : (
        <span className="price-value">
          {finalPrice.toFixed(2)}{priceSuffix}
        </span>
      )}
    </div>
  );
}

export default ProductPrice;
