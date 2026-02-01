import { Fragment } from "react";
import { AdminUser } from "../../../API/admin/api";
import AdminUserCompanyDetails from "../AdminUserCompanyDetails/AdminUserCompanyDetails";
import "./AdminUserRow.scss";

interface AdminUserRowProps {
  user: AdminUser;
  shouldShowAvatar: (user: AdminUser) => boolean;
  onImageError: (userId: string) => void;
  onValidatePro: (userId: string, approved: boolean) => void;
  onRetryInsee: (userId: string) => void;
  onValidateVat: (userId: string, approved: boolean) => void;
  proActionUserId: string | null;
  vatActionUserId: string | null;
}

const AdminUserRow = ({
  user,
  shouldShowAvatar,
  onImageError,
  onValidatePro,
  onRetryInsee,
  onValidateVat,
  proActionUserId,
  vatActionUserId,
}: AdminUserRowProps) => {
  return (
    <Fragment key={user.id}>
      <tr>
        <td>
          <div className="admin-users-user-info">
            {shouldShowAvatar(user) ? (
              <img
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="admin-users-avatar"
                onError={() => onImageError(user.id)}
                loading="lazy"
              />
            ) : (
              <div className="admin-users-avatar-placeholder">
                <i className="bi bi-person-circle"></i>
              </div>
            )}
            <div>
              <div className="admin-users-name">
                {user.firstName} {user.lastName}
              </div>
              {user.phone && (
                <div className="admin-users-phone">{user.phone}</div>
              )}
            </div>
          </div>
        </td>
        <td>
          <div className="admin-users-email">
            {user.email}
            {user.isVerified && (
              <span className="admin-users-verified">
                <i className="bi bi-check-circle-fill"></i>
              </span>
            )}
          </div>
        </td>
        <td>
          <span
            className={`admin-users-auth-badge ${
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
            <span className="admin-users-pro-badge validated">
              <i className="bi bi-check-circle"></i> Pro
            </span>
          ) : user.proStatus === "pending" ? (
            <span className="admin-users-pro-badge pending">
              <i className="bi bi-hourglass-split"></i>
              {user.verificationMode === "manual"
                ? "En attente (manuel)"
                : "En attente"}
            </span>
          ) : user.proStatus === "rejected" ? (
            <span className="admin-users-pro-badge rejected">
              Refusé
            </span>
          ) : (
            <span className="admin-users-pro-badge none">-</span>
          )}
        </td>
        <td>
          <div className="admin-users-actions">
            {user.proStatus === "pending" &&
              user.decisionSource == null && (
                <div className="admin-users-pro-actions">
                  <button
                    type="button"
                    className="admin-users-pro-btn validate"
                    onClick={() => onValidatePro(user.id, true)}
                    disabled={proActionUserId === user.id}
                    title="Valider le compte pro"
                  >
                    <i className="bi bi-check-circle"></i> Valider pro
                  </button>
                  <button
                    type="button"
                    className="admin-users-pro-btn reject"
                    onClick={() => onValidatePro(user.id, false)}
                    disabled={proActionUserId === user.id}
                    title="Refuser le compte pro"
                  >
                    <i className="bi bi-x-circle"></i> Refuser
                  </button>
                  {user.verificationMode === "manual" && (
                    <button
                      type="button"
                      className="admin-users-pro-btn retry"
                      onClick={() => onRetryInsee(user.id)}
                      disabled={proActionUserId === user.id}
                      title="Retenter la vérification INSEE"
                    >
                      <i className="bi bi-arrow-repeat"></i> Retenter
                      INSEE
                    </button>
                  )}
                </div>
              )}
          </div>
        </td>
      </tr>
      {user.proStatus === "pending" && user.company && (
        <tr key={`${user.id}-company`} className="admin-users-company-row">
          <td colSpan={5}>
            <AdminUserCompanyDetails
              user={user}
              onValidatePro={onValidatePro}
              onRetryInsee={onRetryInsee}
              onValidateVat={onValidateVat}
              proActionUserId={proActionUserId}
              vatActionUserId={vatActionUserId}
            />
          </td>
        </tr>
      )}
    </Fragment>
  );
};

export default AdminUserRow;
