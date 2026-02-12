import "./GuideRecommendedProducts.scss";
import { useProducts } from "../../../hooks/useProducts";
import ProductCard from "../../shared/ProductCard";
import { useCart } from "../../../hooks/useCart";
import { useFavorites } from "../../../hooks/useFavorites";
import { useNav } from "../../../hooks/useNav";
import { RecommendedProduct } from "../../../data/guideThemesData";

interface GuideRecommendedProductsProps {
  recommendedProducts?: RecommendedProduct[];
}

function GuideRecommendedProducts({
  recommendedProducts = [],
}: GuideRecommendedProductsProps) {
  const { products } = useProducts();
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useNav();

  // Normaliser le texte (enlever accents, caractères spéciaux)
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  // Trouver les produits correspondant aux noms spécifiés
  const displayedProducts = recommendedProducts
    .map((recommended) => {
      // Chercher le produit par nom exact (insensible à la casse et aux accents)
      const foundProduct = products.find((p) => {
        const normalizedProductName = normalizeText(p.nom || "");
        const normalizedRecommendedName = normalizeText(recommended.productName);
        return normalizedProductName === normalizedRecommendedName;
      });
      return foundProduct;
    })
    .filter((product): product is NonNullable<typeof product> => product !== undefined);


  if (displayedProducts.length === 0) {
    return null;
  }

  return (
    <div className="guide-recommended-products">
      <h3>
        <i className="bi bi-star-fill"></i>
        Produits recommandés
      </h3>
      <div className="guide-products-grid">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showActions={isAuthenticated}
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            isInCart={isInCart}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
}

export default GuideRecommendedProducts;
