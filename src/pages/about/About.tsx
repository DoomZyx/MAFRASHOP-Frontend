import "./About.scss";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import SEO from "../../components/shared/SEO";

function About() {
  return (
    <div className="about-page">
      <SEO
        title="À propos - Qui sommes-nous ?"
        description="MAFRA SHOP est un concessionnaire officiel français de la distribution de produits d'entretien automobile de la marque MA-FRA, fondée en 1965 en Italie."
        keywords="à propos, MAFRA SHOP, concessionnaire MA-FRA, produits entretien auto, histoire, valeurs"
        url="/about"
      />
      <Nav />
      <div className="about-container">
        <div className="about-hero">
          <h1>Qui sommes-nous ?</h1>
          <div className="about-hero-line"></div>
        </div>

        <div className="about-content">
          <section className="about-section">
            <div className="about-section-text">
              <h2>MAFRA SHOP</h2>
              <p>
                MAFRA SHOP est un concessionnaire officiel français de la distribution de produits d'entretien automobile de la 
                marque MA-FRA, fondée en 1965 en Italie.
              </p>
              <p>
                Nous proposons plus de 100 produits pour le lavage, le polissage et 
                l'entretien des véhicules, destinés aux particuliers et aux professionnels.
              </p>
            </div>
            <div className="about-section-image">
              <img 
                src="/images/logoMAFRA.webp" 
                alt="MAFRA SHOP"
                width="143"
                height="50"
                loading="lazy"
              />
            </div>
          </section>

          <section className="about-section about-section-reverse">
            <div className="about-section-image">
              <div className="about-values-grid">
                <div className="about-value-card">
                  <i className="bi bi-box-seam"></i>
                  <h3>Plus de 100 produits</h3>
                  <p>Catalogue MA-FRA</p>
                </div>
                <div className="about-value-card">
                  <i className="bi bi-geo-alt"></i>
                  <h3>Zone de livraison</h3>
                  <p>20km autout de notre dépôt</p>
                </div>
                <div className="about-value-card">
                  <i className="bi bi-truck"></i>
                  <h3>Livraison</h3>
                  <p>72h - 7,50€</p>
                </div>
                <div className="about-value-card">
                  <i className="bi bi-arrow-return-left"></i>
                  <h3>Retours</h3>
                  <p>14 jours (produit scellé)</p>
                </div>
              </div>
            </div>
            <div className="about-section-text">
              <h2>Notre Offre</h2>
              <p>
                Commandez en ligne les produits d'entretien automobile MA-FRA.
              </p>
              <ul className="about-list">
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Plus de 100 produits MA-FRA disponibles
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Commande en ligne 24h/24
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Livraison en main propre sous 72h
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Service client du lundi au vendredi 9h-18h
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Droit de rétractation de 14 jours
                </li>
              </ul>
            </div>
          </section>

          <section className="about-section about-cta">
            <h2>Découvrez nos produits</h2>
            <p>
              Consultez notre catalogue de produits d'entretien automobile MAFRA.
            </p>
            <a href="/shop" className="about-cta-button">
              Voir le catalogue
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
