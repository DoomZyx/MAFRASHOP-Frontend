/**
 * Normalise l'URL d'une image pour s'assurer qu'elle est valide
 * @param imageUrl - L'URL de l'image (peut être null, undefined, ou une URL)
 * @returns L'URL normalisée ou null si invalide
 */
export const normalizeImageUrl = (imageUrl: string | null | undefined): string | null => {
  if (!imageUrl || typeof imageUrl !== "string" || imageUrl.trim() === "") {
    return null;
  }

  const trimmedUrl = imageUrl.trim();

  // Si c'est déjà une URL valide (http/https), la retourner telle quelle
  if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
    return trimmedUrl;
  }

  // Si c'est un chemin relatif, le retourner tel quel (pour les images locales)
  if (trimmedUrl.startsWith("/")) {
    return trimmedUrl;
  }

  // Sinon, retourner null
  return null;
};

/**
 * Vérifie si une URL d'image pointe vers Supabase Storage
 * @param imageUrl - L'URL de l'image
 * @returns true si l'URL pointe vers Supabase Storage
 */
export const isSupabaseImageUrl = (imageUrl: string | null | undefined): boolean => {
  if (!imageUrl) return false;
  return imageUrl.includes("supabase.co") && imageUrl.includes("product-images");
};

/**
 * Vérifie si une URL d'image pointe vers GitHub
 * @param imageUrl - L'URL de l'image
 * @returns true si l'URL pointe vers GitHub
 */
export const isGitHubImageUrl = (imageUrl: string | null | undefined): boolean => {
  if (!imageUrl) return false;
  return imageUrl.includes("githubusercontent.com") || imageUrl.includes("github.com");
};

/**
 * Obtient l'URL d'image à afficher, avec fallback
 * @param imageUrl - L'URL de l'image du produit
 * @param fallbackUrl - URL de fallback si l'image n'est pas disponible (optionnel)
 * @returns L'URL à utiliser pour afficher l'image
 */
export const getImageUrl = (
  imageUrl: string | null | undefined,
  fallbackUrl?: string
): string | null => {
  const normalized = normalizeImageUrl(imageUrl);
  if (normalized) {
    return normalized;
  }
  return fallbackUrl || null;
};

