import "./Expertise.scss";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";

function Expertise() {
  return (
    <div className="expertise-page">
      <Nav />
      <div className="expertise-container">
        <div className="expertise-hero">
          <h1>Nos Produits</h1>
          <div className="expertise-hero-line"></div>
          <p className="expertise-hero-subtitle">
            Plus de 100 produits d'entretien automobile MA-FRA
          </p>
        </div>

        <div className="expertise-content">
          <section className="expertise-intro">
            <h2>La gamme MA-FRA</h2>
            <p>
              MA-FRA est une marque italienne de produits d'entretien automobile fondée 
              en 1965. Nous proposons plus de 100 produits de cette gamme sur notre 
              boutique en ligne.
            </p>
          </section>

          <section className="expertise-domains">
            <h2>Catégories de Produits</h2>
            <div className="expertise-grid">
              <div className="expertise-card">
                <div className="expertise-card-icon">
                  <i className="bi bi-droplet-fill"></i>
                </div>
                <h3>Lavage</h3>
                <p>
                  Produits pour le lavage extérieur des véhicules.
                </p>
                <ul>
                  <li>Shampooings auto</li>
                  <li>Prélavages</li>
                  <li>Nettoyants jantes</li>
                  <li>Nettoyants vitres</li>
                </ul>
              </div>

              <div className="expertise-card">
                <div className="expertise-card-icon">
                  <i className="bi bi-stars"></i>
                </div>
                <h3>Polissage</h3>
                <p>
                  Produits pour le polissage et la rénovation de la carrosserie.
                </p>
                <ul>
                  <li>Polishs</li>
                  <li>Compounds</li>
                  <li>Lustreurs</li>
                  <li>Efface-rayures</li>
                </ul>
              </div>

              <div className="expertise-card">
                <div className="expertise-card-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h3>Protection</h3>
                <p>
                  Produits de protection pour la carrosserie.
                </p>
                <ul>
                  <li>Cires</li>
                  <li>Sealants</li>
                  <li>Protections céramiques</li>
                  <li>Traitements hydrophobes</li>
                </ul>
              </div>

              <div className="expertise-card">
                <div className="expertise-card-icon">
                  <i className="bi bi-car-front-fill"></i>
                </div>
                <h3>Intérieur</h3>
                <p>
                  Produits pour l'entretien de l'habitacle.
                </p>
                <ul>
                  <li>Nettoyants plastiques</li>
                  <li>Nettoyants cuir</li>
                  <li>Nettoyants tissus</li>
                  <li>Désodorisants</li>
                </ul>
              </div>

              <div className="expertise-card">
                <div className="expertise-card-icon">
                  <i className="bi bi-tools"></i>
                </div>
                <h3>Accessoires</h3>
                <p>
                  Accessoires pour l'application des produits.
                </p>
                <ul>
                  <li>Microfibres</li>
                  <li>Applicateurs</li>
                  <li>Brosses</li>
                  <li>Seaux</li>
                </ul>
              </div>

              <div className="expertise-card">
                <div className="expertise-card-icon">
                  <i className="bi bi-briefcase"></i>
                </div>
                <h3>Gamme Pro</h3>
                <p>
                  Produits destinés aux professionnels.
                </p>
                <ul>
                  <li>Formats professionnels</li>
                  <li>Produits concentrés</li>
                  <li>Bidons de 5L et plus</li>
                  <li>Prix dégressifs</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="expertise-process">
            <h2>Comment Commander</h2>
            <div className="expertise-steps">
              <div className="expertise-step">
                <div className="expertise-step-number">1</div>
                <h3>Parcourir le catalogue</h3>
                <p>
                  Consultez notre sélection de produits MAFRA disponibles en ligne.
                </p>
              </div>
              <div className="expertise-step">
                <div className="expertise-step-number">2</div>
                <h3>Ajouter au panier</h3>
                <p>
                  Sélectionnez les produits souhaités et ajoutez-les à votre panier.
                </p>
              </div>
              <div className="expertise-step">
                <div className="expertise-step-number">3</div>
                <h3>Valider la commande</h3>
                <p>
                  Finalisez votre commande et procédez au paiement sécurisé en ligne.
                </p>
              </div>
              <div className="expertise-step">
                <div className="expertise-step-number">4</div>
                <h3>Recevoir vos produits</h3>
                <p>
                  Votre commande est préparée et expédiée sous 72h ouvrées.
                </p>
              </div>
            </div>
          </section>

          <section className="expertise-cta">
            <h2>Consulter notre catalogue</h2>
            <p>
              Découvrez les plus de 100 produits MA-FRA disponibles sur notre boutique en ligne.
            </p>
            <div className="expertise-cta-buttons">
              <a href="/shop" className="expertise-cta-button primary">
                Voir les produits
              </a>
              <a href="/sav" className="expertise-cta-button secondary">
                Nous contacter
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Expertise;
