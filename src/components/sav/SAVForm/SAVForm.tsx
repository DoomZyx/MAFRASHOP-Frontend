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
}

const SAVForm = ({ formData, onSubmit, onChange }: SAVFormProps) => {
  return (
    <section className="sav-form-section" id="formulaire">
      <h2>Formulaire de Contact</h2>
      <p className="sav-form-intro">
        Remplissez ce formulaire pour nous contacter. Nous vous répondrons sous 48h ouvrées.
      </p>
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

        <button type="submit" className="sav-form-submit">
          Envoyer ma demande
        </button>
      </form>
    </section>
  );
};

export default SAVForm;
