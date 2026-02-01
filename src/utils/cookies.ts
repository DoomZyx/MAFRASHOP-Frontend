/**
 * Utilitaires pour la gestion des cookies (RGPD)
 */

export interface CookieConsent {
  necessary: boolean; // Toujours true (cookies essentiels)
  analytics: boolean; // Google Analytics, etc.
  marketing: boolean; // Publicités, tracking
  preferences: boolean; // Préférences utilisateur
  timestamp: number;
}

const CONSENT_KEY = "cookie_consent";
const CONSENT_VERSION = "1.0";

/**
 * Récupère le consentement cookies depuis localStorage
 */
export function getCookieConsent(): CookieConsent | null {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;

    const consent = JSON.parse(stored);
    
    // Vérifier la version (si on change la politique, on redemande)
    if (consent.version !== CONSENT_VERSION) {
      return null;
    }

    return consent.data;
  } catch (error) {
    console.error("Erreur lecture consentement cookies:", error);
    return null;
  }
}

/**
 * Sauvegarde le consentement cookies
 */
export function saveCookieConsent(consent: CookieConsent): void {
  try {
    const data = {
      version: CONSENT_VERSION,
      data: {
        ...consent,
        timestamp: Date.now(),
      },
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Erreur sauvegarde consentement cookies:", error);
  }
}

/**
 * Vérifie si un type de cookie est autorisé
 */
export function isCookieAllowed(type: keyof Omit<CookieConsent, "timestamp">): boolean {
  const consent = getCookieConsent();
  if (!consent) return false;
  return consent[type] === true;
}

/**
 * Supprime tous les cookies non essentiels
 */
export function clearNonEssentialCookies(): void {
  const cookies = document.cookie.split(";");

  // Liste des cookies essentiels à conserver
  const essentialCookies = ["authToken", "adminToken"];

  for (const cookie of cookies) {
    const cookieName = cookie.split("=")[0].trim();
    
    // Ne pas supprimer les cookies essentiels
    if (essentialCookies.includes(cookieName)) {
      continue;
    }

    // Supprimer le cookie
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

/**
 * Initialise Google Analytics si autorisé
 */
export function initAnalytics(): void {
  if (!isCookieAllowed("analytics")) return;

  // TODO: Ajouter votre code Google Analytics ici
  console.log("Analytics initialisé");
}

/**
 * Initialise le tracking marketing si autorisé
 */
export function initMarketing(): void {
  if (!isCookieAllowed("marketing")) return;

  // TODO: Ajouter votre code de tracking marketing ici
  console.log("Marketing initialisé");
}
