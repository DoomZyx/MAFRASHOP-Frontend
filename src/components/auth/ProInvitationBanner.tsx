import "./proInvitationBanner.scss";
import { useState } from "react";
import ProRequestModal from "./ProRequestModal";

interface ProInvitationBannerProps {
  proStatus?: "none" | "pending" | "verified" | "rejected";
}

function ProInvitationBanner({ proStatus }: ProInvitationBannerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ne pas afficher si déjà validé, ou si la demande est en cours
  if (proStatus === "verified" || proStatus === "pending") {
    return null;
  }

  // Afficher un message différent si la demande a été rejetée
  if (proStatus === "rejected") {
    return (
      <>
        <div className="pro-invitation-banner pro-invitation-banner--error">
          <div className="pro-invitation-banner-content">
            <div className="pro-invitation-banner-icon">
              <i className="bi bi-exclamation-triangle"></i>
            </div>
            <div className="pro-invitation-banner-text">
              <h3>Demande professionnelle rejetée</h3>
              <p>
                Votre demande n'a pas été validée. Vérifiez vos informations et
                réessayez.
              </p>
            </div>
            <button
              className="pro-invitation-banner-button"
              onClick={() => setIsModalOpen(true)}
            >
              RÉESSAYER
            </button>
          </div>
        </div>
        <ProRequestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="pro-invitation-banner">
        <div className="pro-invitation-banner-content">
          <div className="pro-invitation-banner-icon">
            <i className="bi bi-briefcase"></i>
          </div>
          <div className="pro-invitation-banner-text">
            <h3>Bénéficiez de nos tarifs professionnels</h3>
            <p>
              Passez en compte professionnel et accédez à nos prix préférentiels
              réservés aux professionnels du secteur automobile.
            </p>
          </div>
          <button
            className="pro-invitation-banner-button"
            onClick={() => setIsModalOpen(true)}
          >
            DEVENIR PRO
          </button>
        </div>
      </div>
      <ProRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default ProInvitationBanner;
