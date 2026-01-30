import { useProProfile } from "../../hooks/useProProfile";
import "./ProfileCompanyForm.scss";

function ProfileCompanyForm() {
  const {
    formData,
    error,
    success,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useProProfile();

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      {error && <div className="profile-error">{error}</div>}
      {success && <div className="profile-success">{success}</div>}

      <div className="profile-section">
        <h3 className="profile-section-title">
          Informations entreprise
        </h3>

        <div className="profile-field">
          <label htmlFor="companyName">Nom de l'entreprise *</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className="profile-field">
          <label htmlFor="proSiret">SIRET *</label>
          <input
            type="text"
            id="proSiret"
            name="siret"
            value={formData.siret}
            onChange={handleInputChange}
            placeholder="14 chiffres"
            maxLength={14}
            disabled={isLoading}
          />
        </div>

        <div className="profile-field">
          <label htmlFor="proCompanyPhone">Téléphone entreprise</label>
          <input
            type="tel"
            id="proCompanyPhone"
            name="companyPhone"
            value={formData.companyPhone}
            onChange={handleInputChange}
            placeholder="01 23 45 67 89"
            disabled={isLoading}
          />
        </div>

        <div className="profile-field">
          <label htmlFor="proCompanyEmail">Email entreprise</label>
          <input
            type="email"
            id="proCompanyEmail"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleInputChange}
            placeholder="contact@entreprise.fr"
            disabled={isLoading}
          />
        </div>

        <div className="profile-field">
          <label htmlFor="proAddress">Adresse</label>
          <input
            type="text"
            id="proAddress"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="123 Rue de la République"
            disabled={isLoading}
          />
        </div>

        <div className="profile-form-row">
          <div className="profile-field">
            <label htmlFor="proZipCode">Code postal</label>
            <input
              type="text"
              id="proZipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="75001"
              maxLength={5}
              disabled={isLoading}
            />
          </div>

          <div className="profile-field">
            <label htmlFor="proCity">Ville</label>
            <input
              type="text"
              id="proCity"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Paris"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="profile-submit"
        disabled={isLoading}
      >
        {isLoading
          ? "ENREGISTREMENT..."
          : "ENREGISTRER LES INFORMATIONS ENTREPRISE"}
      </button>
    </form>
  );
}

export default ProfileCompanyForm;
