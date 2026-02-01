import { Fragment } from "react";
import { AdminUser } from "../../../API/admin/api";
import AdminAdminCompanyDetails from "../AdminAdminCompanyDetails/AdminAdminCompanyDetails";
import "./AdminAdminRow.scss";

interface AdminAdminRowProps {
  user: AdminUser;
  shouldShowAvatar: (user: AdminUser) => boolean;
  onImageError: (userId: string) => void;
  onDemoteToUser: (userId: string) => void;
  onValidatePro: (userId: string, approved: boolean) => void;
  onRetryInsee: (userId: string) => void;
  updatingUserId: string | null;
  proActionUserId: string | null;
}

const AdminAdminRow = ({
  user,
  shouldShowAvatar,
  onImageError,
  onDemoteToUser,
  onValidatePro,
  onRetryInsee,
  updatingUserId,
  proActionUserId,
}: AdminAdminRowProps) => {
  return (
    <Fragment key={user.id}>
      <tr>
        <td>
          <div className="admin-admins-user-info">
            {shouldShowAvatar(user) ? (
              <img
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="admin-admins-avatar"
                onError={() => onImageError(user.id)}
                loading="lazy"
              />
            ) : (
              <div className="admin-admins-avatar-placeholder">
                <i className="bi bi-person-circle"></i>
              </div>
            )}
            <div>
              <div className="admin-admins-name">
                {user.firstName} {user.lastName}
              </div>
              {user.phone && (
                <div className="admin-admins-phone">{user.phone}</div>
              )}
            </div>
          </div>
        </td>
        <td>
          <div className="admin-admins-email">
            {user.email}
            {user.isVerified && (
              <span className="admin-admins-verified">
                <i className="bi bi-check-circle-fill"></i>
              </span>
            )}
          </div>
        </td>
        <td>
          <span
            className={`admin-admins-auth-badge ${
              user.authProvider === "google" ? "google" : "local"
            }`}
          >
            <i
              className={`bi ${
                user.authProvider === "google"
                  ? "bi-google"
                  : "bi-envelope"
              }`}
            ></i>
            {user.authProvider === "google" ? "Google" : "Email"}
          </span>
        </td>
        <td>
          {user.isPro ? (
            <span className="admin-admins-pro-badge validated">
              <i className="bi bi-check-circle"></i> Pro
            </span>
          ) : user.proStatus === "pending" ? (
            <span className="admin-admins-pro-badge pending">
              <i className="bi bi-hourglass-split"></i>
              {user.verificationMode === "manual"
                ? "En attente (manuel)"
                : "En attente"}
            </span>
          ) : user.proStatus === "rejected" ? (
            <span className="admin-admins-pro-badge rejected">
              Refusé
            </span>
          ) : (
            <span className="admin-admins-pro-badge none">-</span>
          )}
        </td>
        <td>
          <div className="admin-admins-actions">
            <span className="admin-admins-admin-badge">
              <i className="bi bi-shield-check"></i> Admin
            </span>
            <button
              type="button"
              className="admin-admins-demote-btn"
              onClick={() => onDemoteToUser(user.id)}
              disabled={updatingUserId === user.id}
              title="Rétrograder en utilisateur"
            >
              <i className="bi bi-arrow-down-circle"></i> Rétrograder
              en utilisateur
            </button>
            {user.proStatus === "pending" &&
              user.decisionSource == null && (
                <div className="admin-admins-pro-actions">
                  <button
                    type="button"
                    className="admin-admins-pro-btn validate"
                    onClick={() => onValidatePro(user.id, true)}
                    disabled={proActionUserId === user.id}
                  >
                    <i className="bi bi-check-circle"></i> Valider pro
                  </button>
                  <button
                    type="button"
                    className="admin-admins-pro-btn reject"
                    onClick={() => onValidatePro(user.id, false)}
                    disabled={proActionUserId === user.id}
                  >
                    <i className="bi bi-x-circle"></i> Refuser
                  </button>
                  {user.verificationMode === "manual" && (
                    <button
                      type="button"
                      className="admin-admins-pro-btn retry"
                      onClick={() => onRetryInsee(user.id)}
                      disabled={proActionUserId === user.id}
                    >
                      <i className="bi bi-arrow-repeat"></i> Retenter
                      INSEE
                    </button>
                  )}
                </div>
              )}
            {updatingUserId === user.id && (
              <i className="bi bi-arrow-repeat admin-admins-updating"></i>
            )}
          </div>
        </td>
      </tr>
      {user.proStatus === "pending" && user.company && (
        <tr key={`${user.id}-company`} className="admin-admins-company-row">
          <td colSpan={5}>
            <AdminAdminCompanyDetails
              user={user}
              onValidatePro={onValidatePro}
              onRetryInsee={onRetryInsee}
              proActionUserId={proActionUserId}
            />
          </td>
        </tr>
      )}
    </Fragment>
  );
};

export default AdminAdminRow;
