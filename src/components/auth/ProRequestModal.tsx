import "./proRequestModal.scss";
import { useProRequest } from "../../hooks/useProRequest";

interface ProRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ProRequestModal({ isOpen, onClose }: ProRequestModalProps) {
  const {
    formData,
    error,
    success,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useProRequest(onClose);

  if (!isOpen) return null;

  return (
    <div className="pro-request-modal-overlay" onClick={onClose}>
      <div className="pro-request-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pro-request-modal-close" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="pro-request-modal-content">
          <h2 className="pro-request-modal-title">
            PASSER EN COMPTE PROFESSIONNEL
          </h2>

          <p className="pro-request-modal-description">
            Remplissez le formulaire ci-dessous pour demander l'accès aux tarifs
            professionnels. Votre demande sera vérifiée sous 24-48h.
          </p>

          {error && <div className="pro-request-modal-error">{error}</div>}

          {success && (
            <div className="pro-request-modal-success">{success}</div>
          )}

          <form className="pro-request-modal-form" onSubmit={handleSubmit}>
            <div className="pro-request-modal-field">
              <label htmlFor="companyName">
                Nom de l'entreprise <span className="required">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                disabled={isLoading || !!success}
                placeholder="Ex: Garage Dupont"
              />
            </div>

            <div className="pro-request-modal-field">
              <label htmlFor="siret">
                Numéro SIRET <span className="required">*</span>
              </label>
              <input
                type="text"
                id="siret"
                name="siret"
                value={formData.siret}
                onChange={handleInputChange}
                required
                disabled={isLoading || !!success}
                placeholder="14 chiffres"
                maxLength={14}
              />
              <small className="pro-request-modal-hint">
                Le SIRET doit contenir exactement 14 chiffres
              </small>
            </div>

            <div className="pro-request-modal-field">
              <label htmlFor="address">Adresse de l'entreprise</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={isLoading || !!success}
                placeholder="Ex: 123 Rue Example"
              />
              <small className="pro-request-modal-hint">
                Recommandé pour une validation plus rapide
              </small>
            </div>

            <div className="pro-request-modal-row">
              <div className="pro-request-modal-field">
                <label htmlFor="zipCode">Code postal</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  disabled={isLoading || !!success}
                  placeholder="Ex: 75001"
                  maxLength={5}
                />
              </div>

              <div className="pro-request-modal-field">
                <label htmlFor="city">Ville</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={isLoading || !!success}
                  placeholder="Ex: Paris"
                />
              </div>
            </div>

            <button
              type="submit"
              className="pro-request-modal-submit"
              disabled={isLoading || !!success}
            >
              {isLoading
                ? "ENVOI EN COURS..."
                : success
                ? "DEMANDE ENVOYÉE"
                : "ENVOYER LA DEMANDE"}
            </button>
          </form>

          <div className="pro-request-modal-info">
            <p>
              <i className="bi bi-info-circle"></i>
              Seules les entreprises du secteur automobile peuvent être
              validées. Votre SIRET sera vérifié auprès de l'INSEE.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProRequestModal;
