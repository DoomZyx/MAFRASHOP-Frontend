import { useState, useEffect } from "react";
import { getCookieConsent, saveCookieConsent, clearNonEssentialCookies, CookieConsent } from "../../utils/cookies";
import "./CookieBanner.scss";

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookieConsent>({
    necessary: true, // Toujours activé
    analytics: false,
    marketing: false,
    preferences: true,
    timestamp: Date.now(),
  });

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = getCookieConsent();
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: Date.now(),
    };
    saveCookieConsent(consent);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const consent: CookieConsent = {
      necessary: true, // Cookies essentiels toujours activés
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: Date.now(),
    };
    saveCookieConsent(consent);
    clearNonEssentialCookies();
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    saveCookieConsent({
      ...preferences,
      necessary: true, // Toujours true
      timestamp: Date.now(),
    });
    
    // Supprimer les cookies non autorisés
    if (!preferences.analytics || !preferences.marketing) {
      clearNonEssentialCookies();
    }
    
    setIsVisible(false);
  };

  const handleTogglePreference = (key: keyof Omit<CookieConsent, "timestamp">) => {
    if (key === "necessary") return; // Ne pas permettre de désactiver les cookies nécessaires
    
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner-overlay">
      <div className="cookie-banner">
        <div className="cookie-banner-header">
          <h2>
            <i className="bi bi-cookie"></i> Gestion des cookies
          </h2>
        </div>

        <div className="cookie-banner-content">
          {!showDetails ? (
            <>
              <p className="cookie-banner-description">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site, 
                analyser le trafic et personnaliser le contenu. Vous pouvez choisir d'accepter 
                tous les cookies ou personnaliser vos préférences.
              </p>

              <div className="cookie-banner-actions">
                <button
                  className="cookie-btn cookie-btn-accept"
                  onClick={handleAcceptAll}
                >
                  Tout accepter
                </button>
                <button
                  className="cookie-btn cookie-btn-reject"
                  onClick={handleRejectAll}
                >
                  Tout refuser
                </button>
                <button
                  className="cookie-btn cookie-btn-customize"
                  onClick={() => setShowDetails(true)}
                >
                  Personnaliser
                </button>
              </div>

              <p className="cookie-banner-info">
                <i className="bi bi-info-circle"></i>
                En continuant à naviguer, vous acceptez l'utilisation des cookies essentiels.
              </p>
            </>
          ) : (
            <>
              <div className="cookie-preferences">
                <div className="cookie-preference-item">
                  <div className="cookie-preference-header">
                    <label className="cookie-preference-label">
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                      />
                      <span className="cookie-preference-title">
                        Cookies nécessaires
                        <span className="cookie-badge required">Obligatoire</span>
                      </span>
                    </label>
                  </div>
                  <p className="cookie-preference-description">
                    Ces cookies sont essentiels au fonctionnement du site (authentification, panier, etc.). 
                    Ils ne peuvent pas être désactivés.
                  </p>
                </div>

                <div className="cookie-preference-item">
                  <div className="cookie-preference-header">
                    <label className="cookie-preference-label">
                      <input
                        type="checkbox"
                        checked={preferences.preferences}
                        onChange={() => handleTogglePreference("preferences")}
                      />
                      <span className="cookie-preference-title">
                        Cookies de préférences
                      </span>
                    </label>
                  </div>
                  <p className="cookie-preference-description">
                    Ces cookies permettent de mémoriser vos préférences (langue, affichage, etc.).
                  </p>
                </div>

                <div className="cookie-preference-item">
                  <div className="cookie-preference-header">
                    <label className="cookie-preference-label">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => handleTogglePreference("analytics")}
                      />
                      <span className="cookie-preference-title">
                        Cookies analytiques
                      </span>
                    </label>
                  </div>
                  <p className="cookie-preference-description">
                    Ces cookies nous aident à comprendre comment vous utilisez le site pour l'améliorer 
                    (Google Analytics, statistiques).
                  </p>
                </div>

                <div className="cookie-preference-item">
                  <div className="cookie-preference-header">
                    <label className="cookie-preference-label">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => handleTogglePreference("marketing")}
                      />
                      <span className="cookie-preference-title">
                        Cookies marketing
                      </span>
                    </label>
                  </div>
                  <p className="cookie-preference-description">
                    Ces cookies sont utilisés pour afficher des publicités pertinentes et mesurer 
                    l'efficacité de nos campagnes.
                  </p>
                </div>
              </div>

              <div className="cookie-banner-actions">
                <button
                  className="cookie-btn cookie-btn-back"
                  onClick={() => setShowDetails(false)}
                >
                  <i className="bi bi-arrow-left"></i> Retour
                </button>
                <button
                  className="cookie-btn cookie-btn-save"
                  onClick={handleSavePreferences}
                >
                  Enregistrer mes préférences
                </button>
              </div>
            </>
          )}
        </div>

        <div className="cookie-banner-footer">
          <a href="/legal/politique-cookies" className="cookie-link">
            En savoir plus sur notre politique de cookies
          </a>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
