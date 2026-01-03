import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";
import Nav from "../../components/nav/nav";
import "./productDetail.scss";
import Footer from "../../components/footer/footer";
import HeroBg from "../../components/shop/herobg/heroBg";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id || "");

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

              {product.GARAGE !== null && (
                <div className="price-item">
                  <span className="price-value">
                    {product.GARAGE.toFixed(2)}€
                  </span>
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
