import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../hooks/useAuth";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import HeroBg from "../../components/shop/herobg/heroBg";
import Loader from "../../components/loader/loader";
import ProductDetailContent from "../../components/productDetail/ProductDetailContent/ProductDetailContent";
import ProductError from "../../components/productDetail/ProductError/ProductError";
import SEO from "../../components/shared/SEO";
import "./productDetail.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading, error } = useProduct(slug || "");
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();

  if (loading) {
    return (
      <>
        <Nav />
        <Loader />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Nav />
        <div className="product-detail-container">
          <ProductError message={error || "Produit non trouvé"} />
        </div>
      </>
    );
  }

  const isOutOfStock =
    product.stock === "out_of_stock" || (product.stockQuantity ?? 0) <= 0;

  const productTitle = product?.nom ? `${product.nom} - Mafrashop` : "Produit - Mafrashop";
  const productDescription = product?.nom
    ? `${product.nom} - ${product.description || "Produit d'entretien automobile MA-FRA"}`
    : "Découvrez ce produit d'entretien automobile de la gamme MA-FRA";
  const productImage = product?.url_image || "/images/logoMAFRA.webp";
  const productUrl = `/product/${product?.slug || slug}`;

  return (
    <>
      <SEO
        title={productTitle}
        description={productDescription}
        keywords={`${product?.nom}, MA-FRA, entretien automobile, ${product?.category || "produit auto"}`}
        image={productImage}
        url={productUrl}
        type="product"
      />
      <Nav />
      <HeroBg />
      <div className="product-detail-container">
        <ProductDetailContent
          product={product}
          isAuthenticated={isAuthenticated}
          isFavorite={isFavorite(product.id)}
          isInCart={isInCart(product.id)}
          isOutOfStock={isOutOfStock}
          onToggleFavorite={() => toggleFavorite(product.id)}
          onAddToCart={() => addToCart(product.id)}
        />
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;
