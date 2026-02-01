import { AdminUser } from "../../../API/admin/api";
import "./AdminUserCompanyDetails.scss";

interface AdminUserCompanyDetailsProps {
  user: AdminUser;
  onValidatePro: (userId: string, approved: boolean) => void;
  onRetryInsee: (userId: string) => void;
  onValidateVat: (userId: string, approved: boolean) => void;
  proActionUserId: string | null;
  vatActionUserId: string | null;
}

const AdminUserCompanyDetails = ({
  user,
  onValidatePro,
  onRetryInsee,
  onValidateVat,
  proActionUserId,
  vatActionUserId,
}: AdminUserCompanyDetailsProps) => {
  if (!user.company) return null;

  return (
    <div className="admin-users-company-block">
      <h4 className="admin-users-company-title">
        <i className="bi bi-building"></i> Données entreprise
        (vérification manuelle)
      </h4>
      <p className="admin-users-company-insee-link">
        Vérifier le SIRET sur le site INSEE :{" "}
        <a
          href="https://avis-situation-sirene.insee.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vérifier ici
        </a>
      </p>
      <div className="admin-users-company-grid">
        <div className="admin-users-company-item">
          <span className="admin-users-company-label">
            Nom de l'entreprise
          </span>
          <span className="admin-users-company-value">
            {user.company.name || "-"}
          </span>
        </div>
        <div className="admin-users-company-item">
          <span className="admin-users-company-label">
            SIRET
          </span>
          <span className="admin-users-company-value">
            {user.company.siret || "-"}
          </span>
        </div>
        <div className="admin-users-company-item">
          <span className="admin-users-company-label">
            Adresse
          </span>
          <span className="admin-users-company-value">
            {user.company.address || "-"}
          </span>
        </div>
        <div className="admin-users-company-item">
          <span className="admin-users-company-label">
            Ville
          </span>
          <span className="admin-users-company-value">
            {user.company.city || "-"}
          </span>
        </div>
        <div className="admin-users-company-item">
          <span className="admin-users-company-label">
            Code postal
          </span>
          <span className="admin-users-company-value">
            {user.company.zipCode || "-"}
          </span>
        </div>
        <div className="admin-users-company-item">
          <span className="admin-users-company-label">
            Téléphone entreprise
          </span>
          <span className="admin-users-company-value">
            {user.company.phone || "-"}
          </span>
        </div>
        <div className="admin-users-company-item">
          <span className="admin-users-company-label">
            Email entreprise
          </span>
          <span className="admin-users-company-value">
            {user.company.email || "-"}
          </span>
        </div>
        {user.company.vatNumber && (
          <>
            <div className="admin-users-company-item">
              <span className="admin-users-company-label">
                Pays
              </span>
              <span className="admin-users-company-value">
                {user.company.country || "FR"}
              </span>
            </div>
            <div className="admin-users-company-item">
              <span className="admin-users-company-label">
                N° TVA intracommunautaire
              </span>
              <span className="admin-users-company-value">
                {user.company.vatNumber}
              </span>
            </div>
            <div className="admin-users-company-item">
              <span className="admin-users-company-label">
                Statut TVA
              </span>
              <span className={`admin-users-vat-status ${user.company.vatStatus}`}>
                {user.company.vatStatus === "validated" && "✓ Validé"}
                {user.company.vatStatus === "pending_manual" && "⏳ En attente validation"}
                {user.company.vatStatus === "rejected" && "✗ Rejeté"}
                {user.company.vatStatus === "none" && "Aucun"}
              </span>
            </div>
          </>
        )}
      </div>

      {user.company?.vatStatus === "pending_manual" && (
        <div className="admin-users-vat-actions">
          <p className="admin-users-vat-notice">
            <i className="bi bi-exclamation-circle"></i>
            Ce numéro de TVA intracommunautaire nécessite une validation manuelle
          </p>
          <div className="admin-users-vat-buttons">
            <button
              type="button"
              className="admin-users-pro-btn validate"
              onClick={() => onValidateVat(user.id, true)}
              disabled={vatActionUserId === user.id}
              title="Valider le numéro de TVA"
            >
              <i className="bi bi-check-circle"></i> Valider TVA
            </button>
            <button
              type="button"
              className="admin-users-pro-btn reject"
              onClick={() => onValidateVat(user.id, false)}
              disabled={vatActionUserId === user.id}
              title="Refuser le numéro de TVA"
            >
              <i className="bi bi-x-circle"></i> Refuser TVA
            </button>
          </div>
        </div>
      )}

      {user.decisionSource == null && (
        <div className="admin-users-company-actions">
          <button
            type="button"
            className="admin-users-pro-btn validate"
            onClick={() => onValidatePro(user.id, true)}
            disabled={proActionUserId === user.id}
          >
            <i className="bi bi-check-circle"></i> Valider le
            compte pro
          </button>
          <button
            type="button"
            className="admin-users-pro-btn reject"
            onClick={() => onValidatePro(user.id, false)}
            disabled={proActionUserId === user.id}
          >
            <i className="bi bi-x-circle"></i> Refuser
          </button>
          {user.verificationMode === "manual" && (
            <button
              type="button"
              className="admin-users-pro-btn retry"
              onClick={() => onRetryInsee(user.id)}
              disabled={proActionUserId === user.id}
            >
              <i className="bi bi-arrow-repeat"></i> Retenter
              INSEE
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUserCompanyDetails;
