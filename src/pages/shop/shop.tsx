import Nav from "../../components/nav/nav";
import Catalogue from "../../components/shop/catalogue/catalogue";
import HeroBg from "../../components/shop/herobg/heroBg";
import SearchProducts from "../../components/shop/searchProducts/searchProducts";
import Footer from "../../components/footer/footer";
import { useProducts } from "../../hooks/useProducts";

function Shop() {
  const { products } = useProducts();

  return (
    <>
      <Nav />
      <HeroBg />
      <SearchProducts products={products} />
      <Catalogue />
      <Footer />
    </>
  );
}

export default Shop;
