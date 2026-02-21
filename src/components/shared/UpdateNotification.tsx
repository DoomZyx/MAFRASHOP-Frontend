import { useState, useEffect } from 'react';
import './UpdateNotification.scss';

function UpdateNotification() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    // Listener controllerchange enregistré au montage : quand le nouveau SW prend le contrôle, on recharge
    const onControllerChange = () => {
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    navigator.serviceWorker.ready.then((reg) => {
      setRegistration(reg);

      if (reg.waiting) {
        setShowUpdate(true);
      }

      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setShowUpdate(true);
            }
          });
        }
      });
    });

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
    };
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  if (!showUpdate) {
    return null;
  }

  return (
    <div className="update-notification">
      <div className="update-notification-content">
        <div className="update-notification-icon">
          <i className="bi bi-arrow-clockwise"></i>
        </div>
        <div className="update-notification-text">
          <h4>Mise à jour disponible</h4>
          <p>Une nouvelle version de MAFRA est disponible.</p>
        </div>
        <div className="update-notification-actions">
          <button onClick={handleUpdate} className="update-btn">
            Mettre à jour
          </button>
          <button onClick={handleDismiss} className="dismiss-btn">
            Plus tard
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateNotification;
