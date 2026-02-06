// Configuration de l'API
const baseUrl = import.meta.env.VITE_API_URL || window.location.origin;
// S'assurer que l'URL se termine par /api
export const API_BASE_URL = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
