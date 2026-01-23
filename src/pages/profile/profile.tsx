import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import "./profile.scss";
import Nav from "../../components/nav/nav";
import HeroBg from "../../components/shop/herobg/heroBg";
import Avatar from "../../components/shared/Avatar";

function Profile() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const {
    formData,
    error,
    success,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useProfile();

  if (authLoading) {
    return <div className="profile-loading">Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
    <HeroBg />
      <Nav />
      <div className="profile-page">
        <div className="profile-container">

          <div className="profile-header">
            <div className="profile-avatar">
              <Avatar
                src={user?.avatar}
                alt={`${user?.firstName || ""} ${user?.lastName || ""}`}
                size="large"
              />
            </div>
            <div className="profile-info">
              <h2>
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="profile-email">{user?.email}</p>
              {user?.authProvider === "google" && (
                <span className="profile-badge">Compte Google</span>
              )}
              {user?.authProvider === "local" && (
                <span className="profile-badge">Compte local</span>
              )}
            </div>
          </div>

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

          <div className="profile-actions">
            <h3>Informations du compte</h3>
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <span className="profile-info-label">Date d'inscription</span>
                <span className="profile-info-value">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </span>
              </div>
              <div className="profile-info-item">
                <span className="profile-info-label">Compte vérifié</span>
                <span className="profile-info-value">
                  {user?.isVerified ? "Oui" : "Non"}
                </span>
              </div>
              {user?.isPro && (
                <div className="profile-info-item">
                  <span className="profile-info-label">Statut</span>
                  <span className="profile-info-value profile-info-value-pro">
                    Compte Professionnel
                  </span>
                </div>
              )}
              {user?.googleId && (
                <div className="profile-info-item">
                  <span className="profile-info-label">ID Google</span>
                  <span className="profile-info-value profile-info-value-small">
                    {user.googleId}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
