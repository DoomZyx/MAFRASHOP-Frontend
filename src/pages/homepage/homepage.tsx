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
        title="MAFRA - Votre spécialiste en produits d'entretien automobile"
        description="Découvrez notre large gamme de produits d'entretien automobile, équipements et accessoires pour professionnels et particuliers. Livraison rapide et expertise technique."
        keywords="produits d'entretien automobile, accessoires automobile, professionnel auto, MA-FRA, entretien automobile, mafra boutique , fournisseur produit nettoyage auto professionnel, produits d'entretien auto, accessoires auto, livraison rapide, expertise techniquekk"
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
