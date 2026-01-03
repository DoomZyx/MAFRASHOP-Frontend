import Header from "../../components/homepage/header/header";
import Nav from "../../components/nav/nav";
import CategoryCards from "../../components/cards/categoryCards/categorie";
import ExpertiseInfo from "../../components/cards/expertiseInfo/expertiseInfo";
import Bestsellers from "../../components/homepage/bestsellers/bestsellers";
import Promotions from "../../components/homepage/promotions/promotions";
import Newsletter from "../../components/homepage/newsletter/newsletter";
import Footer from "../../components/footer/footer";

function Homepage() {
  return (
    <>
      <Nav />
      <Header />
      <CategoryCards />
      <ExpertiseInfo />
      <Bestsellers />
      <Promotions />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Homepage;
