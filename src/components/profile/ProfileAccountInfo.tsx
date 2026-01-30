import { useAuth } from "../../hooks/useAuth";
import "./ProfileAccountInfo.scss";

function ProfileAccountInfo() {
  const { user } = useAuth();

  return (
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
  );
}

export default ProfileAccountInfo;
