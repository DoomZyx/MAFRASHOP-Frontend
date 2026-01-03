import "./promotions.scss";

function Promotions() {
  return (
    <section className="promotions-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">PROMOTIONS</h2>
          <div className="navigation-arrows">
            <button className="arrow-btn arrow-left" aria-label="Précédent">
              <i className="bi bi-chevron-left"></i>
            </button>
            <button className="arrow-btn arrow-right" aria-label="Suivant">
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="products-grid">
          {/* Les produits seront ajoutés plus tard */}
          <p className="placeholder-text">Produits à venir...</p>
        </div>
      </div>
    </section>
  );
}

export default Promotions;
