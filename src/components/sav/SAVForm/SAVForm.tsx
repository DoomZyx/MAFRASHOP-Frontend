import "./SAVForm.scss";

interface SAVFormProps {
  formData: {
    orderNumber: string;
    email: string;
    subject: string;
    message: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  isSubmitting?: boolean;
  submitStatus?: {
    type: "success" | "error" | null;
    message: string;
  };
  onStatusClose?: () => void;
}

const SAVForm = ({ formData, onSubmit, onChange, isSubmitting = false, submitStatus, onStatusClose }: SAVFormProps) => {
  return (
    <section className="sav-form-section" id="formulaire">
      <h2>Formulaire de Contact</h2>
      <p className="sav-form-intro">
        Remplissez ce formulaire pour nous contacter. Nous vous répondrons sous 48h ouvrées.
      </p>
      
      {submitStatus?.type && (
        <div
          className={`sav-form-status ${
            submitStatus.type === "success" ? "sav-form-status--success" : "sav-form-status--error"
          }`}
        >
          <i
            className={`bi ${
              submitStatus.type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill"
            }`}
          ></i>
          <div className="sav-form-status-content">
            <span className="sav-form-status-title">
              {submitStatus.type === "success" ? "Message envoyé !" : "Erreur"}
            </span>
            <span className="sav-form-status-message">{submitStatus.message}</span>
          </div>
          <button
            className="sav-form-status-close"
            onClick={onStatusClose}
            aria-label="Fermer"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      )}

      <form className="sav-form" onSubmit={onSubmit}>
        <div className="sav-form-row">
          <div className="sav-form-group">
            <label htmlFor="orderNumber">
              Numéro de commande <span className="required">*</span>
            </label>
            <input
              type="text"
              id="orderNumber"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={onChange}
              placeholder="Ex: CMD-12345"
              required
            />
          </div>

          <div className="sav-form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="votre@email.com"
              required
            />
          </div>
        </div>

        <div className="sav-form-group">
          <label htmlFor="subject">
            Sujet de votre demande <span className="required">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={onChange}
            required
          >
            <option value="">Sélectionnez un sujet</option>
            <option value="produit">Question sur un produit</option>
            <option value="commande">Suivi de commande</option>
            <option value="livraison">Question sur la livraison</option>
            <option value="defaut">Produit défectueux</option>
            <option value="retour">Demande de retour</option>
            <option value="facturation">Question de facturation</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div className="sav-form-group">
          <label htmlFor="message">
            Décrivez votre problème <span className="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={onChange}
            placeholder="Décrivez votre problème en détail..."
            rows={6}
            required
          ></textarea>
        </div>

        <button type="submit" className="sav-form-submit" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
        </button>
      </form>
    </section>
  );
};

export default SAVForm;
