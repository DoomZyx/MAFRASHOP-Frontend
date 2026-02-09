import "./expertiseInfo.scss";

function ExpertiseInfo() {
  return (
    <section className="expertise-info-section">
      <div className="expertise-cards-wrapper">
        <div className="expertise-info-card">
          <div className="card-image-wrapper">
            <img 
              src="/images/expertise2.webp" 
              alt="Gamme professionnelle" 
              width="675"
              height="413"
              loading="lazy"
            />
            <div className="card-overlay">
              <h2 className="card-title">
                UNE GAMME PENSÉE PAR LES PROFESSIONNELLES
              </h2>
            </div>
          </div>
          <div className="card-text-content">
            <p className="card-intro">
              MAFRA propose une large sélection de solutions adaptées à un usage
              intensif :
            </p>
            <ul className="card-list">
              <li>Nettoyage intérieur et extérieur</li>
              <li>Détergents techniques et dégraissants</li>
              <li>Traitements carrosserie et plastiques</li>
              <li>
                Produits pour centres de lavage et flottes professionnelles
              </li>
            </ul>
            <p className="card-description">
              Chaque produit est conçu pour optimiser le temps d'intervention,
              garantir un résultat constant et préserver les surfaces traitées.
            </p>
          </div>
        </div>

        <div className="expertise-info-card">
          <div className="card-image-wrapper">
            <img 
              src="/images/expertisebg.webp" 
              alt="Notre expertise" 
              width="675"
              height="450"
              loading="lazy"
            />
            <div className="card-overlay">
              <h2 className="card-title">NOTRE EXPERTISE</h2>
            </div>
          </div>
          <div className="card-text-content">
            <p className="card-description">
              Depuis plus de 50 ans, MAFRA est une référence internationale dans
              le domaine des produits d'entretien automobile professionnels.
              Reconnue pour la qualité et l'efficacité de ses solutions, la
              marque accompagne au quotidien les garages, carrosseries, centres
              de lavage et professionnels de l'automobile. Développés en Italie
              dans des laboratoires spécialisés, les produits MAFRA répondent
              aux exigences élevées des professionnels : performance, fiabilité,
              sécurité d'utilisation et respect des matériaux.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExpertiseInfo;
