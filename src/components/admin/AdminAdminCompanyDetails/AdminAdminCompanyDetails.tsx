import { AdminUser } from "../../../API/admin/api";
import "./AdminAdminCompanyDetails.scss";

interface AdminAdminCompanyDetailsProps {
  user: AdminUser;
  onValidatePro: (userId: string, approved: boolean) => void;
  onRetryInsee: (userId: string) => void;
  proActionUserId: string | null;
}

const AdminAdminCompanyDetails = ({
  user,
  onValidatePro,
  onRetryInsee,
  proActionUserId,
}: AdminAdminCompanyDetailsProps) => {
  if (!user.company) return null;

  return (
    <div className="admin-admins-company-block">
      <h4 className="admin-admins-company-title">
        <i className="bi bi-building"></i> Données entreprise
        (vérification manuelle)
      </h4>
      <p className="admin-admins-company-insee-link">
        Vérifier le SIRET sur le site INSEE :{" "}
        <a
          href="https://avis-situation-sirene.insee.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vérifier ici
        </a>
      </p>
      <div className="admin-admins-company-grid">
        <div className="admin-admins-company-item">
          <span className="admin-admins-company-label">
            Nom de l'entreprise
          </span>
          <span className="admin-admins-company-value">
            {user.company.name || "-"}
          </span>
        </div>
        <div className="admin-admins-company-item">
          <span className="admin-admins-company-label">SIRET</span>
          <span className="admin-admins-company-value">
            {user.company.siret || "-"}
          </span>
        </div>
        <div className="admin-admins-company-item">
          <span className="admin-admins-company-label">Adresse</span>
          <span className="admin-admins-company-value">
            {user.company.address || "-"}
          </span>
        </div>
        <div className="admin-admins-company-item">
          <span className="admin-admins-company-label">Ville</span>
          <span className="admin-admins-company-value">
            {user.company.city || "-"}
          </span>
        </div>
        <div className="admin-admins-company-item">
          <span className="admin-admins-company-label">Code postal</span>
          <span className="admin-admins-company-value">
            {user.company.zipCode || "-"}
          </span>
        </div>
        <div className="admin-admins-company-item">
          <span className="admin-admins-company-label">
            Téléphone entreprise
          </span>
          <span className="admin-admins-company-value">
            {user.company.phone || "-"}
          </span>
        </div>
        <div className="admin-admins-company-item">
          <span className="admin-admins-company-label">
            Email entreprise
          </span>
          <span className="admin-admins-company-value">
            {user.company.email || "-"}
          </span>
        </div>
      </div>
      {user.decisionSource == null && (
        <div className="admin-admins-company-actions">
          <button
            type="button"
            className="admin-admins-pro-btn validate"
            onClick={() => onValidatePro(user.id, true)}
            disabled={proActionUserId === user.id}
          >
            <i className="bi bi-check-circle"></i> Valider le compte pro
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
              <i className="bi bi-arrow-repeat"></i> Retenter INSEE
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminAdminCompanyDetails;
