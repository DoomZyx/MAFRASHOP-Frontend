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
                Numéro SIRET {!formData.hasVatNumber && <span className="required">*</span>}
              </label>
              <input
                type="text"
                id="siret"
                name="siret"
                value={formData.siret}
                onChange={handleInputChange}
                required={!formData.hasVatNumber}
                disabled={isLoading || !!success || formData.hasVatNumber}
                placeholder="14 chiffres"
                maxLength={14}
              />
              <small className="pro-request-modal-hint">
                {formData.hasVatNumber 
                  ? "Non requis pour les professionnels UE avec TVA intracommunautaire"
                  : "Le SIRET doit contenir exactement 14 chiffres"}
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

            <div className="pro-request-modal-checkbox-field">
              <label className="pro-request-modal-checkbox-label">
                <input
                  type="checkbox"
                  name="hasVatNumber"
                  checked={formData.hasVatNumber}
                  onChange={handleInputChange}
                  disabled={isLoading || !!success}
                />
                <span>
                  Je suis un professionnel UE avec un numéro de TVA intracommunautaire
                </span>
              </label>
              <small className="pro-request-modal-hint">
                Cochez cette case si vous êtes établi dans l'UE (hors France) et disposez d'un numéro de TVA intracommunautaire. 
                Le SIRET ne sera pas requis.
              </small>
            </div>

            {formData.hasVatNumber && (
              <>
                <div className="pro-request-modal-divider">
                  <span>TVA intracommunautaire</span>
                </div>

                <div className="pro-request-modal-row">
              <div className="pro-request-modal-field">
                <label htmlFor="companyCountry">Pays</label>
                <select
                  id="companyCountry"
                  name="companyCountry"
                  value={formData.companyCountry}
                  onChange={handleInputChange}
                  disabled={isLoading || !!success}
                >
                  <option value="FR">France</option>
                  <option value="BE">Belgique</option>
                  <option value="DE">Allemagne</option>
                  <option value="IT">Italie</option>
                  <option value="ES">Espagne</option>
                  <option value="NL">Pays-Bas</option>
                  <option value="PT">Portugal</option>
                  <option value="LU">Luxembourg</option>
                  <option value="IE">Irlande</option>
                  <option value="AT">Autriche</option>
                  <option value="SE">Suède</option>
                  <option value="DK">Danemark</option>
                  <option value="FI">Finlande</option>
                  <option value="PL">Pologne</option>
                  <option value="CZ">République tchèque</option>
                  <option value="RO">Roumanie</option>
                  <option value="BG">Bulgarie</option>
                  <option value="HR">Croatie</option>
                  <option value="CY">Chypre</option>
                  <option value="EE">Estonie</option>
                  <option value="GR">Grèce</option>
                  <option value="HU">Hongrie</option>
                  <option value="LT">Lituanie</option>
                  <option value="LV">Lettonie</option>
                  <option value="MT">Malte</option>
                  <option value="SK">Slovaquie</option>
                  <option value="SI">Slovénie</option>
                </select>
              </div>

              <div className="pro-request-modal-field">
                <label htmlFor="vatNumber">
                  Numéro de TVA intracommunautaire <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="vatNumber"
                  name="vatNumber"
                  value={formData.vatNumber}
                  onChange={handleInputChange}
                  required={formData.hasVatNumber}
                  disabled={isLoading || !!success}
                  placeholder="Ex: BE0123456789"
                />
              </div>
            </div>

            <small className="pro-request-modal-hint">
              Après vérification automatique ou validation manuelle de votre numéro de TVA, 
              vous bénéficierez de la TVA à 0% (autoliquidation).
            </small>
              </>
            )}

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
