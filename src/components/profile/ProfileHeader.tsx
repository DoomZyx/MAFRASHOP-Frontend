import { useAuth } from "../../hooks/useAuth";
import Avatar from "../shared/Avatar";
import "./ProfileHeader.scss";

function ProfileHeader() {
  const { user } = useAuth();

  return (
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
  );
}

export default ProfileHeader;
