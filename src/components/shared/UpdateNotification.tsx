import { useState, useEffect } from 'react';
import './UpdateNotification.scss';

function UpdateNotification() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Écouter les événements de mise à jour du Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);
        
        // Vérifier s'il y a une mise à jour en attente
        if (reg.waiting) {
          setShowUpdate(true);
        }
        
        // Écouter les nouvelles mises à jour
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
    }
  }, []);

  const handleUpdate = () => {
    if (registration?.waiting) {
      // Envoyer un message au Service Worker pour qu'il s'active
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Recharger la page après activation
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
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
          <p>Une nouvelle version de MAFRA SHOP est disponible.</p>
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
