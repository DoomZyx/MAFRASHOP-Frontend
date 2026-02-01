import "./Returns.scss";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";

function Returns() {
  return (
    <div className="returns-page">
      <Nav />
      <div className="returns-container">
        <div className="returns-hero">
          <h1>Retours & Remboursements</h1>
          <div className="returns-hero-line"></div>
          <p className="returns-hero-subtitle">
            Politique de retour simple et transparente
          </p>
        </div>

        <div className="returns-content">
          <section className="returns-intro">
            <h2>Droit de Rétractation</h2>
            <p>
              Conformément à la législation en vigueur, vous disposez d'un droit de 
              rétractation de 14 jours pour retourner un produit qui ne vous convient pas.
            </p>
          </section>

          <section className="returns-policy">
            <h2>Conditions de Retour</h2>
            <div className="returns-policy-grid">
              <div className="returns-policy-card">
                <i className="bi bi-calendar-check"></i>
                <h3>Délai</h3>
                <p>
                  <strong>14 jours</strong> à compter de la réception de votre commande 
                  pour exercer votre droit de rétractation.
                </p>
              </div>

              <div className="returns-policy-card">
                <i className="bi bi-box-seam"></i>
                <h3>État du Produit</h3>
                <p>
                  Le produit doit être retourné dans son <strong>emballage d'origine scellé</strong>, 
                  non ouvert, avec tous les documents fournis.
                </p>
              </div>

              <div className="returns-policy-card">
                <i className="bi bi-shield-check"></i>
                <h3>Produits Éligibles</h3>
                <p>
                  Tous nos produits sont éligibles au retour dans leur emballage d'origine 
                  non ouvert. Les produits ouverts ou entamés ne peuvent être repris pour 
                  des raisons d'hygiène et de sécurité.
                </p>
              </div>

              <div className="returns-policy-card">
                <i className="bi bi-cash-coin"></i>
                <h3>Retour</h3>
                <p>
                  Le retour se fait à l'adresse de notre dépôt. Les frais de retour sont 
                  à votre charge en cas de rétractation.
                </p>
              </div>
            </div>
          </section>

          <section className="returns-process">
            <h2>Procédure de Retour</h2>
            <div className="returns-steps">
              <div className="returns-step">
                <div className="returns-step-number">1</div>
                <h3>Contacter le service client</h3>
                <p>
                  Contactez notre service client par email avec votre numéro de commande 
                  pour demander un retour.
                </p>
              </div>
              <div className="returns-step">
                <div className="returns-step-number">2</div>
                <h3>Recevoir l'adresse</h3>
                <p>
                  Nous vous envoyons par email l'adresse de notre dépôt pour le retour.
                </p>
              </div>
              <div className="returns-step">
                <div className="returns-step-number">3</div>
                <h3>Renvoyer le produit</h3>
                <p>
                  Renvoyez le produit dans son emballage d'origine scellé à l'adresse 
                  indiquée. Les frais de retour sont à votre charge.
                </p>
              </div>
              <div className="returns-step">
                <div className="returns-step-number">4</div>
                <h3>Remboursement</h3>
                <p>
                  Après réception et vérification du produit, nous procédons au remboursement 
                  sur votre moyen de paiement initial.
                </p>
              </div>
            </div>
          </section>

          <section className="returns-types">
            <h2>Types de Retour</h2>
            <div className="returns-types-grid">
              <div className="returns-type-card">
                <div className="returns-type-icon">
                  <i className="bi bi-arrow-return-left"></i>
                </div>
                <h3>Droit de Rétractation</h3>
                <p className="returns-type-subtitle">
                  Changement d'avis
                </p>
                <ul>
                  <li>Délai : 14 jours après réception</li>
                  <li>Frais de retour : À votre charge</li>
                  <li>Remboursement : Après vérification</li>
                  <li>Produit : Emballage scellé obligatoire</li>
                </ul>
                <div className="returns-type-note">
                  Le produit doit être dans son emballage d'origine scellé, non ouvert.
                </div>
              </div>

              <div className="returns-type-card highlighted">
                <div className="returns-type-icon">
                  <i className="bi bi-exclamation-triangle"></i>
                </div>
                <h3>Produit Défectueux</h3>
                <p className="returns-type-subtitle">
                  Produit endommagé ou non conforme
                </p>
                <ul>
                  <li>Délai : Signalement sous 48h après réception</li>
                  <li>Frais de retour : Pris en charge</li>
                  <li>Remboursement ou échange : Selon disponibilité</li>
                  <li>Produit : Peut être ouvert</li>
                </ul>
                <div className="returns-type-note">
                  Contactez notre service client avec photos du défaut et votre numéro 
                  de commande.
                </div>
              </div>

              <div className="returns-type-card">
                <div className="returns-type-icon">
                  <i className="bi bi-x-circle"></i>
                </div>
                <h3>Erreur de Commande</h3>
                <p className="returns-type-subtitle">
                  Erreur dans la préparation
                </p>
                <ul>
                  <li>Délai : Signalement sous 48h après réception</li>
                  <li>Frais de retour : Pris en charge</li>
                  <li>Remboursement ou échange : Selon disponibilité</li>
                  <li>Produit : Emballage scellé obligatoire</li>
                </ul>
                <div className="returns-type-note">
                  Contactez notre service client avec votre numéro de commande et une 
                  description de l'erreur.
                </div>
              </div>
            </div>
          </section>

          <section className="returns-refund">
            <h2>Remboursement</h2>
            <div className="returns-refund-content">
              <div className="returns-refund-card">
                <h3>
                  <i className="bi bi-credit-card"></i>
                  Moyen de Remboursement
                </h3>
                <p>
                  Le remboursement s'effectue sur le même moyen de paiement utilisé 
                  lors de l'achat.
                </p>
              </div>

              <div className="returns-refund-card">
                <h3>
                  <i className="bi bi-clock"></i>
                  Délai
                </h3>
                <p>
                  Le remboursement est effectué après réception et vérification du 
                  produit retourné.
                </p>
              </div>

              <div className="returns-refund-card">
                <h3>
                  <i className="bi bi-calculator"></i>
                  Montant
                </h3>
                <p>
                  Le prix du produit est remboursé. Les frais de livraison initiaux ne 
                  sont pas remboursés en cas de rétractation.
                </p>
              </div>
            </div>
          </section>

          <section className="returns-exchange">
            <h2>Échange de Produit</h2>
            <div className="returns-exchange-content">
              <p>
                Nous ne proposons pas d'échange direct. Pour obtenir un autre produit :
              </p>
              <ol className="returns-exchange-list">
                <li>
                  <strong>Effectuez un retour</strong> du produit selon la procédure 
                  de rétractation.
                </li>
                <li>
                  <strong>Passez une nouvelle commande</strong> pour le produit souhaité.
                </li>
                <li>
                  <strong>Remboursement</strong> après réception et vérification du produit 
                  retourné.
                </li>
              </ol>
            </div>
          </section>

          <section className="returns-faq">
            <h2>Questions Fréquentes</h2>
            <div className="returns-faq-list">
              <div className="returns-faq-item">
                <h3>
                  <i className="bi bi-question-circle-fill"></i>
                  Puis-je retourner un produit après l'avoir ouvert ?
                </h3>
                <p>
                  Non, pour des raisons d'hygiène et de sécurité, les produits d'entretien 
                  automobile ouverts ou entamés ne peuvent être repris. Le produit doit 
                  être retourné dans son emballage d'origine scellé.
                </p>
              </div>

              <div className="returns-faq-item">
                <h3>
                  <i className="bi bi-question-circle-fill"></i>
                  Que faire si l'emballage d'origine est abîmé ?
                </h3>
                <p>
                  L'emballage peut présenter des traces d'ouverture, mais il doit être 
                  complet et permettre de protéger le produit. Si l'emballage est trop 
                  endommagé, utilisez un carton adapté.
                </p>
              </div>

              <div className="returns-faq-item">
                <h3>
                  <i className="bi bi-question-circle-fill"></i>
                  Les frais de livraison initiaux sont-ils remboursés ?
                </h3>
                <p>
                  En cas de retour standard (changement d'avis), seul le prix du produit 
                  est remboursé. En cas de produit défectueux ou d'erreur de notre part, 
                  les frais de livraison sont également remboursés.
                </p>
              </div>

              <div className="returns-faq-item">
                <h3>
                  <i className="bi bi-question-circle-fill"></i>
                  Comment suivre mon retour ?
                </h3>
                <p>
                  Le numéro de suivi fourni avec l'étiquette de retour vous permet de 
                  suivre votre colis. Vous recevrez également un email de confirmation 
                  dès réception du produit par nos services.
                </p>
              </div>

              <div className="returns-faq-item">
                <h3>
                  <i className="bi bi-question-circle-fill"></i>
                  Puis-je annuler ma commande avant expédition ?
                </h3>
                <p>
                  Oui, si votre commande n'a pas encore été expédiée, vous pouvez 
                  l'annuler gratuitement en contactant notre service client. Le 
                  remboursement sera immédiat.
                </p>
              </div>
            </div>
          </section>

          <section className="returns-cta">
            <h2>Question sur un retour ?</h2>
            <p>
              Contactez notre service client pour toute question concernant un retour.
            </p>
            <div className="returns-cta-buttons">
              <a href="/orders" className="returns-cta-button primary">
                Mes commandes
              </a>
              <a href="/sav" className="returns-cta-button secondary">
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

export default Returns;
