import Header from "../../components/homepage/header/header";
import Nav from "../../components/nav/nav";
import CategoryCards from "../../components/cards/categoryCards/categorie";
import ExpertiseInfo from "../../components/cards/expertiseInfo/expertiseInfo";
import ProInfo from "../../components/homepage/proInfo/proInfo";
import Bestsellers from "../../components/homepage/bestsellers/bestsellers";
import Promotions from "../../components/homepage/promotions/promotions";
import Newsletter from "../../components/homepage/newsletter/newsletter";
import Footer from "../../components/footer/footer";
import SEO from "../../components/shared/SEO";

function Homepage() {
  return (
    <>
      <SEO
        title="MAFRA - Votre spécialiste en pièces auto et équipements"
        description="Découvrez notre large gamme de pièces détachées automobiles, équipements et accessoires pour professionnels et particuliers. Livraison rapide et expertise technique."
        keywords="pièces auto, pièces détachées, équipements auto, accessoires automobile, professionnel auto, MA-FRA, entretien automobile"
        url="/"
      />
      <Nav />
      <Header />
      <CategoryCards />
      <ExpertiseInfo />
      <ProInfo />
      <Bestsellers />
      <Promotions />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Homepage;
