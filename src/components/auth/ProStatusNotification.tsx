import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./ProStatusNotification.scss";

const STORAGE_KEY_PREFIX = "pro_status_seen_";

function ProStatusNotification() {
  const { user, isAuthenticated } = useAuth();
  const [dismissed, setDismissed] = useState(false);
  const previousStatusRef = useRef<string | null>(null);

  const storageKey = user?.id ? `${STORAGE_KEY_PREFIX}${user.id}` : null;
  const lastSeen = storageKey ? localStorage.getItem(storageKey) : null;
  const currentStatus = user?.proStatus;

  // Réinitialiser dismissed uniquement si le statut a changé
  useEffect(() => {
    if (currentStatus && previousStatusRef.current !== currentStatus) {
      previousStatusRef.current = currentStatus;
      setDismissed(false);
    }
  }, [currentStatus]);

  const shouldShow =
    isAuthenticated &&
    user?.id &&
    (currentStatus === "verified" || currentStatus === "rejected") &&
    lastSeen !== currentStatus &&
    !dismissed;

  const handleDismiss = () => {
    if (storageKey && currentStatus) {
      localStorage.setItem(storageKey, currentStatus);
      setDismissed(true);
    }
  };

  if (!shouldShow) return null;

  const isAccepted = currentStatus === "verified";

  return (
    <div
      className={`pro-status-notification ${
        isAccepted ? "pro-status-notification--success" : "pro-status-notification--error"
      }`}
      role="alert"
    >
      <div className="pro-status-notification-content">
        {isAccepted ? (
          <>
            <i className="bi bi-check-circle-fill"></i>
            <span>
              Votre demande de compte professionnel a été acceptée.
            </span>
          </>
        ) : (
          <>
            <i className="bi bi-x-circle-fill"></i>
            <span>
              Votre demande de compte professionnel a été refusée. Vous pouvez
              soumettre une nouvelle demande après avoir vérifié vos informations
              (SIRET, nom de l'entreprise).
            </span>
          </>
        )}
        <button
          type="button"
          className="pro-status-notification-close"
          onClick={handleDismiss}
          aria-label="Fermer la notification"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  );
}

export default ProStatusNotification;
