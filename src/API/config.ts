// Configuration de l'API
// Si VITE_API_URL est défini, l'utiliser tel quel (doit contenir /api si nécessaire)
const envApiUrl = import.meta.env.VITE_API_URL;
export const API_BASE_URL = envApiUrl;

