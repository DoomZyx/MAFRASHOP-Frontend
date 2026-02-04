import { useSAVForm } from "../../hooks/useSAVForm";
import "./SAV.scss";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import SAVForm from "../../components/sav/SAVForm/SAVForm";

function SAV() {
  const { formData, handleChange, handleSubmit, isSubmitting, submitStatus } = useSAVForm();

  return (
    <div className="sav-page">
      <Nav />
      <div className="sav-container">
        <div className="sav-hero">
          <h1>Service Client</h1>
          <div className="sav-hero-line"></div>
          <p className="sav-hero-subtitle">
            Nous sommes à votre écoute
          </p>
        </div>

        <div className="sav-content">
          <section className="sav-intro">
            <h2>Contactez-nous</h2>
            <p>
              Notre service client est disponible du lundi au vendredi de 9h à 18h pour 
              répondre à vos questions concernant nos produits, vos commandes ou les 
              modalités de livraison et de retour.
            </p>
          </section>

          <section className="sav-services">
            <h2>Motifs de Contact</h2>
            <div className="sav-services-grid">
              <div className="sav-service-card">
                <i className="bi bi-box-seam"></i>
                <h3>Questions sur les produits</h3>
                <p>
                  Informations sur les produits disponibles dans notre catalogue.
                </p>
                <ul>
                  <li>Caractéristiques des produits</li>
                  <li>Disponibilité en stock</li>
                  <li>Prix et conditionnements</li>
                  <li>Utilisation recommandée</li>
                </ul>
              </div>

              <div className="sav-service-card">
                <i className="bi bi-cart-check"></i>
                <h3>Suivi de commande</h3>
                <p>
                  Informations concernant votre commande en cours.
                </p>
                <ul>
                  <li>État de la commande</li>
                  <li>Numéro de suivi</li>
                  <li>Date de livraison estimée</li>
                  <li>Modification de commande</li>
                </ul>
              </div>

              <div className="sav-service-card">
                <i className="bi bi-exclamation-triangle"></i>
                <h3>Produit défectueux</h3>
                <p>
                  Signalement d'un produit endommagé ou non conforme.
                </p>
                <ul>
                  <li>Produit endommagé à la réception</li>
                  <li>Produit non conforme</li>
                  <li>Emballage défectueux</li>
                  <li>Erreur de commande</li>
                </ul>
              </div>

              <div className="sav-service-card">
                <i className="bi bi-arrow-return-left"></i>
                <h3>Retours</h3>
                <p>
                  Demande de retour dans le cadre du droit de rétractation.
                </p>
                <ul>
                  <li>Retour sous 14 jours</li>
                  <li>Demande d'étiquette retour</li>
                  <li>Suivi du remboursement</li>
                  <li>Conditions de retour</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="sav-process">
            <h2>Nous Contacter</h2>
            <div className="sav-contact-methods">
              <div className="sav-contact-card">
                <i className="bi bi-clock"></i>
                <h3>Horaires</h3>
                <p>Du lundi au vendredi</p>
                <p>9h - 18h</p>
              </div>

              <div className="sav-contact-card">
                <i className="bi bi-envelope-fill"></i>
                <h3>Par Email</h3>
                <p>Contactez-nous par email</p>
                <p>
                  Adresse email à venir
                </p>
              </div>

              <div className="sav-contact-card">
                <i className="bi bi-file-text"></i>
                <h3>Formulaire</h3>
                <p>Remplissez le formulaire ci-dessous</p>
                <a href="#formulaire" className="sav-contact-link">
                  Accéder au formulaire
                </a>
              </div>
            </div>
          </section>

          <SAVForm
            formData={formData}
            onSubmit={handleSubmit}
            onChange={handleChange}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
          />

          <section className="sav-faq">
            <h2>Questions Fréquentes</h2>
            <div className="sav-faq-list">
              <div className="sav-faq-item">
                <h3>
                  <i className="bi bi-question-circle-fill"></i>
                  Quels sont vos horaires ?
                </h3>
                <p>
                  Notre service client est disponible du lundi au vendredi de 9h à 18h.
                </p>
              </div>

              <div className="sav-faq-item">
                <h3>
                  <i className="bi bi-question-circle-fill"></i>
                  Comment suivre ma commande ?
                </h3>
                <p>
                  Vous recevez un email avec le numéro de suivi dès l'expédition de votre 
                  commande. Vous pouvez également consulter l'état de votre commande dans 
                  votre compte client.
                </p>
              </div>

              <div className="sav-faq-item">
                <h3>
                  <i className="bi bi-question-circle-fill"></i>
                  Que faire si mon produit est défectueux ?
                </h3>
                <p>
                  Contactez-nous avec votre numéro de commande et une description du problème. 
                  Nous procéderons à l'échange ou au remboursement selon les conditions de vente.
                </p>
              </div>

              <div className="sav-faq-item">
                <h3>
                  <i className="bi bi-question-circle-fill"></i>
                  Comment faire un retour ?
                </h3>
                <p>
                  Consultez notre page "Retours & Remboursements" pour connaître les conditions 
                  et la procédure de retour. Vous disposez de 14 jours pour exercer votre droit 
                  de rétractation.
                </p>
              </div>
            </div>
          </section>

          <section className="sav-cta">
            <h2>Une question ?</h2>
            <p>
              Contactez notre service client du lundi au vendredi de 9h à 18h.
            </p>
            <a href="#formulaire" className="sav-cta-button">
              Formulaire de contact
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SAV;
