import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../hooks/useAuth";
import Nav from "../../components/nav/nav";
import ProductPrice from "../../components/shared/ProductPrice";
import "./productDetail.scss";
import Footer from "../../components/footer/footer";
import HeroBg from "../../components/shop/herobg/heroBg";
import "bootstrap-icons/font/bootstrap-icons.css";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id || "");
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();

  if (loading) {
    return (
      <>
        <Nav />
        <div className="product-detail-container">
          <p className="loading-message">Chargement du produit...</p>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Nav />
        <div className="product-detail-container">
          <p className="error-message">{error || "Produit non trouvé"}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <HeroBg />
      <div className="product-detail-container">
        <div className="product-detail-content">
          <div className="product-image-section">
            {product.URL_IMAGE && (
              <img src={product.URL_IMAGE} alt={product.NOM} />
            )}
          </div>

          <div className="product-info-section">
            <h1>{product.NOM}</h1>

            {product.FORMAT && (
              <div className="product-format">
                <span className="format-label">Format :</span>
                <span>{product.FORMAT}</span>
              </div>
            )}

            {product.DESCRIPTION && (
              <div className="product-description">
                <p>{product.DESCRIPTION}</p>
              </div>
            )}

            <ProductPrice product={product} className="product-price" />

            {isAuthenticated && (
              <div className="product-actions">
                <button
                  className={`product-action-btn favorite-btn ${
                    isFavorite(product._id) ? "active" : ""
                  }`}
                  onClick={() => toggleFavorite(product._id)}
                  title={
                    isFavorite(product._id)
                      ? "Retirer des favoris"
                      : "Ajouter aux favoris"
                  }
                >
                  <i
                    className={`bi ${
                      isFavorite(product._id) ? "bi-heart-fill" : "bi-heart"
                    }`}
                  ></i>
                  <span>
                    {isFavorite(product._id)
                      ? "Retirer des favoris"
                      : "Ajouter aux favoris"}
                  </span>
                </button>
                <button
                  className={`product-action-btn cart-btn ${
                    isInCart(product._id) ? "active" : ""
                  }`}
                  onClick={() => addToCart(product._id)}
                  title={
                    isInCart(product._id)
                      ? "Déjà dans le panier"
                      : "Ajouter au panier"
                  }
                >
                  <i
                    className={`bi ${
                      isInCart(product._id) ? "bi-cart-check-fill" : "bi-cart"
                    }`}
                  ></i>
                  <span>
                    {isInCart(product._id)
                      ? "Déjà dans le panier"
                      : "Ajouter au panier"}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetail;
