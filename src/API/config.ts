// Configuration de l'API
// Variables lues depuis le .env à la racine du frontend (dossier contenant vite.config.ts).
// Vite n'expose que les variables préfixées par VITE_. Redémarrer le serveur dev après modification du .env.

// URL de base du backend (ex: https://preprod.mymafrashop.com ou http://localhost:8080)
export const API_BASE_URL = import.meta.env.VITE_API_URL || (typeof window !== "undefined" ? window.location.origin : "");

/** Options par défaut pour les requêtes API (envoi des cookies httpOnly) */
export const API_CREDENTIALS: RequestInit = { credentials: "include" };

// Google OAuth (noms exacts dans .env : VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI)
const rawGoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const rawGoogleRedirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
export const GOOGLE_CLIENT_ID = typeof rawGoogleClientId === "string" ? rawGoogleClientId.trim() : "";
export const GOOGLE_REDIRECT_URI =
  (typeof rawGoogleRedirectUri === "string" ? rawGoogleRedirectUri.trim() : "") ||
  (typeof window !== "undefined" ? window.location.origin : "");
