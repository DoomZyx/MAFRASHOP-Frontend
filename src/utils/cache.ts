/**
 * Utilitaires de cache pour améliorer les performances
 */

// Cache en mémoire pour les données API
const memoryCache = new Map<string, { data: any; timestamp: number }>();

// Durée de validité du cache (5 minutes par défaut)
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Récupère des données depuis le cache mémoire
 */
export function getCachedData<T>(key: string): T | null {
  const cached = memoryCache.get(key);
  
  if (!cached) {
    return null;
  }
  
  // Vérifier si le cache est encore valide
  const now = Date.now();
  if (now - cached.timestamp > CACHE_DURATION) {
    memoryCache.delete(key);
    return null;
  }
  
  return cached.data as T;
}

/**
 * Stocke des données dans le cache mémoire
 */
export function setCachedData<T>(key: string, data: T): void {
  memoryCache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Supprime une entrée du cache
 */
export function removeCachedData(key: string): void {
  memoryCache.delete(key);
}

/**
 * Vide tout le cache mémoire
 */
export function clearCache(): void {
  memoryCache.clear();
}

/**
 * Wrapper pour les appels API avec cache
 */
export async function fetchWithCache<T>(
  url: string,
  options?: RequestInit,
  cacheDuration: number = CACHE_DURATION
): Promise<T> {
  // Vérifier si les données sont en cache
  const cacheKey = `${url}_${JSON.stringify(options || {})}`;
  const cached = getCachedData<T>(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  // Sinon, faire la requête
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Stocker dans le cache
  setCachedData(cacheKey, data);
  
  return data;
}

/**
 * Précharge des ressources importantes
 */
export function preloadResources(urls: string[]): void {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Précharge des images
 */
export function preloadImages(imageUrls: string[]): void {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

/**
 * Cache localStorage avec expiration
 */
export class LocalStorageCache {
  private prefix: string;
  
  constructor(prefix: string = 'mafrashop_cache_') {
    this.prefix = prefix;
  }
  
  set(key: string, value: any, expirationMinutes: number = 60): void {
    const item = {
      value,
      expiration: Date.now() + expirationMinutes * 60 * 1000,
    };
    
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans le cache:', error);
    }
  }
  
  get<T>(key: string): T | null {
    try {
      const itemStr = localStorage.getItem(this.prefix + key);
      
      if (!itemStr) {
        return null;
      }
      
      const item = JSON.parse(itemStr);
      
      // Vérifier l'expiration
      if (Date.now() > item.expiration) {
        localStorage.removeItem(this.prefix + key);
        return null;
      }
      
      return item.value as T;
    } catch (error) {
      console.error('Erreur lors de la récupération du cache:', error);
      return null;
    }
  }
  
  remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }
  
  clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }
}

// Instance par défaut
export const localCache = new LocalStorageCache();
