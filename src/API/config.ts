// Configuration de l'API
const baseUrl = import.meta.env.VITE_API_URL || window.location.origin;
// S'assurer que l'URL se termine par /api (gérer les cas avec ou sans slash final)
const normalizedBaseUrl = baseUrl.replace(/\/+$/, ''); // Supprimer tous les slashes à la fin
export const API_BASE_URL = normalizedBaseUrl.endsWith('/api') 
  ? normalizedBaseUrl 
  : `${normalizedBaseUrl}/api`;
