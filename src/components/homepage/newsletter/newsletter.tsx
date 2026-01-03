import "./newsletter.scss";

function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2 className="newsletter-title">NE MANQUEZ PAS L'ACTUALITE</h2>
        <p className="newsletter-subtitle">
          INSCRIVEZ-VOUS POUR RECEVOIR LES PROCHAINES PROMOTIONS ET LES NOUVEAUX
          ARRIVAGES
        </p>
        <form className="newsletter-form">
          <input
            type="email"
            placeholder="ENTREZ VOTRE ADRESSE MAIL"
            className="newsletter-input"
            required
          />
          <button type="submit" className="newsletter-btn">
            S'INSCRIRE
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
