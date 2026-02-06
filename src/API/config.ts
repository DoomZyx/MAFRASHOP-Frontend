// Configuration de l'API
// VITE_API_URL doit être l'URL de base (ex: https://preprod.mymafrashop.com)
// Le préfixe /api sera ajouté directement dans les routes
export const API_BASE_URL = import.meta.env.VITE_API_URL || window.location.origin;
