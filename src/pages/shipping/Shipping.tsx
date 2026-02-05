import "./Shipping.scss";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import SEO from "../../components/shared/SEO";

function Shipping() {
  return (
    <div className="shipping-page">
      <SEO
        title="Livraison - Informations et Tarifs"
        description="Livraison en main propre partout en France sous 72h. Frais de livraison : 7,50€ (gratuit dès 120€ d'achat). Zone de livraison : 20km autour de notre dépôt."
        keywords="livraison, frais de port, délai livraison, zone livraison, transport, expédition"
        url="/shipping"
      />
      <Nav />
      <div className="shipping-container">
        <div className="shipping-hero">
          <h1>Livraison</h1>
          <div className="shipping-hero-line"></div>
          <p className="shipping-hero-subtitle">
            Livraison en main propre partout en France
          </p>
        </div>

        <div className="shipping-content">
          <section className="shipping-intro">
            <h2>Zone de Livraison</h2>
            <p>
              Nous livrons vos commandes en main propre partout en France.
              Délai de livraison : 72h.
            </p>
          </section>

          <section className="shipping-options">
            <h2>Tarifs et Délais</h2>
            <div className="shipping-options-flex">
              <div className="shipping-option-card">
                <div className="shipping-option-icon">
                  <i className="bi bi-person-walking"></i>
                </div>
                <h3>Livraison en Main Propre</h3>
                <div className="shipping-price">7,50 €</div>
                <p className="shipping-delivery-time">Délai : 72h</p>
                <ul>
                  <li>Livraison par notre livreur</li>                  
                  <li>Date de livraison communiquée</li>
                  <li>Remise en main propre</li>
                </ul>
                <div className="shipping-free-badge">
                  <i className="bi bi-gift-fill"></i>
                  Gratuite dès 120€ d'achat
                </div>
              </div>
            </div>
          </section>

          <section className="shipping-zones">
            <h2>Zone de Livraison</h2>
            <div className="shipping-zones-flex">
              <div className="shipping-zone-card">
                <i className="bi bi-geo-alt-fill"></i>
                <p>Livraison en main propre : 72h</p>
                <p>Dans un rayon de 20km autout de notre dépôt</p>
                <div className="shipping-zone-price">7,50 € (gratuit dès 120€)</div>
              </div>
            </div>
          </section>

          <section className="shipping-process">
            <h2>Processus de Livraison</h2>
            <div className="shipping-steps">
              <div className="shipping-step">
                <div className="shipping-step-number">1</div>
                <h3>Commande</h3>
                <p>
                  Vous passez commande en ligne sur notre site.
                </p>
              </div>
              <div className="shipping-step">
                <div className="shipping-step-number">2</div>
                <h3>Préparation</h3>
                <p>
                  Votre commande est préparée dans notre dépôt.
                </p>
              </div>
              <div className="shipping-step">
                <div className="shipping-step-number">3</div>
                <h3>Date de livraison</h3>
                <p>
                  Vous recevez la date de livraison prévue (sous 72h).
                </p>
              </div>
              <div className="shipping-step">
                <div className="shipping-step-number">4</div>
                <h3>Livraison</h3>
                <p>
                  Notre livreur vous livre en main propre à votre domicile.
                </p>
              </div>
            </div>
          </section>

          <section className="shipping-info">
            <h2>Informations Importantes</h2>
            <div className="shipping-info-grid">
              <div className="shipping-info-card">
                <i className="bi bi-clock-history"></i>
                <h3>Délai</h3>
                <p>
                  Livraison sous 72h après validation de votre commande.
                </p>
              </div>

              <div className="shipping-info-card">
                <i className="bi bi-geo-alt"></i>
                <h3>Zone</h3>
                <p>
                  Livraison dans un rayon de 20km autour de Mondelange.
                </p>
              </div>

              <div className="shipping-info-card">
                <i className="bi bi-person-walking"></i>
                <h3>Mode</h3>
                <p>
                  Livraison en main propre par notre livreur à votre domicile.
                </p>
              </div>

              <div className="shipping-info-card">
                <i className="bi bi-exclamation-triangle"></i>
                <h3>Colis Endommagé</h3>
                <p>
                  En cas de colis endommagé, signalez-le immédiatement au livreur et 
                  contactez-nous.
                </p>
              </div>
            </div>
          </section>

          <section className="shipping-faq">
            <h2>Questions Fréquentes</h2>
            <div className="shipping-faq-list">
              <div className="shipping-faq-item">
                <h3>
                  <i className="bi bi-question-circle-fill"></i>
                  Quelle est votre zone de livraison ?
                </h3>
                <p>
                  Nous livrons dans un rayon de 20km autout de notre dépôt.
                </p>
              </div>

              <div className="shipping-faq-item">
                <h3>
                  <i className="bi bi-question-circle-fill"></i>
                  Quel est le délai de livraison ?
                </h3>
                <p>
                  Le délai de livraison est de 72h après validation de votre commande. 
                  Vous recevrez la date de livraison prévue.
                </p>
              </div>

              <div className="shipping-faq-item">
                <h3>
                  <i className="bi bi-question-circle-fill"></i>
                  Quand la livraison est-elle gratuite ?
                </h3>
                <p>
                  Les frais de livraison de 7,50€ sont offerts pour toute commande d'un 
                  montant égal ou supérieur à 120€.
                </p>
              </div>

              <div className="shipping-faq-item">
                <h3>
                  <i className="bi bi-question-circle-fill"></i>
                  Comment se passe la livraison ?
                </h3>
                <p>
                  La livraison est effectuée en main propre par notre livreur à votre 
                  domicile.
                </p>
              </div>
            </div>
          </section>

          <section className="shipping-cta">
            <h2>Questions sur la livraison ?</h2>
            <p>
              Contactez notre service client pour toute question concernant votre livraison.
            </p>
            <a href="/sav" className="shipping-cta-button">
              Nous contacter
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Shipping;
