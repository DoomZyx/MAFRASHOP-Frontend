import Nav from "../../components/nav/nav";
import Catalogue from "../../components/shop/catalogue/catalogue";
import HeroBg from "../../components/shop/herobg/heroBg";
import SearchProducts from "../../components/shop/searchProducts/searchProducts";
import Footer from "../../components/footer/footer";
import { useProducts } from "../../hooks/useProducts";
import SEO from "../../components/shared/SEO";

function Shop() {
  const { products } = useProducts();

  return (
    <>
      <SEO
        title="Mafrashop - Votre spécialiste en pièces auto et équipements"
        description="Parcourez notre catalogue complet de produits d'entretien automobile MA-FRA. Plus de 100 produits pour le lavage, polissage et protection de votre véhicule."
        keywords="catalogue auto, produits entretien, lavage auto, polissage, protection carrosserie, MA-FRA, boutique en ligne"
        url="/shop"
      />
      <Nav />
      <HeroBg />
      <div className="shop-search-container">
        <SearchProducts products={products} />
      </div>
      <Catalogue />
      <Footer />
    </>
  );
}

export default Shop;
