import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import "./ProfilePersonalForm.scss";

function ProfilePersonalForm() {
  const { user } = useAuth();
  const {
    formData,
    error,
    success,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useProfile();

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      {error && <div className="profile-error">{error}</div>}
      {success && <div className="profile-success">{success}</div>}

      <div className="profile-section">
        <h3 className="profile-section-title">
          Informations personnelles
        </h3>

        <div className="profile-form-row">
          <div className="profile-field">
            <label htmlFor="firstName">Prénom *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="profile-field">
            <label htmlFor="lastName">Nom *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="profile-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={user?.email || ""}
            disabled
            className="profile-field-disabled"
          />
          <small className="profile-field-note">
            L'email ne peut pas être modifié
          </small>
        </div>

        <div className="profile-field">
          <label htmlFor="phone">Téléphone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="06 12 34 56 78"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="profile-section">
        <h3 className="profile-section-title">Adresse</h3>

        <div className="profile-field">
          <label htmlFor="address">Adresse</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="123 Rue de la République"
            disabled={isLoading}
          />
        </div>

        <div className="profile-form-row">
          <div className="profile-field">
            <label htmlFor="zipCode">Code postal</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="75001"
              maxLength={5}
              disabled={isLoading}
            />
          </div>

          <div className="profile-field">
            <label htmlFor="city">Ville</label>
            <input
              type="text"
              id="city"
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
          : "ENREGISTRER LES MODIFICATIONS"}
      </button>
    </form>
  );
}

export default ProfilePersonalForm;
