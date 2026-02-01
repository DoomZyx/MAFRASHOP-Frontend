# Guide du Système de Cache - MAFRA SHOP

## Vue d'ensemble

Le système de cache mis en place améliore considérablement les performances de l'application en réduisant les temps de chargement et en permettant un fonctionnement hors ligne partiel.

## 1. Service Worker (PWA)

### Configuration
Le Service Worker est configuré via `vite-plugin-pwa` dans `vite.config.ts`.

### Stratégies de Cache

#### Cache First (Images et Polices)
- **Images** : Cache pendant 30 jours, max 100 entrées
- **Google Fonts** : Cache pendant 1 an, max 10 entrées
- Utilisé pour les ressources qui changent rarement

#### Stale While Revalidate (CSS/JS)
- **Fichiers statiques** : Cache pendant 7 jours, max 60 entrées
- Sert le cache immédiatement et met à jour en arrière-plan

#### Network First (API et HTML)
- **Appels API** : Cache pendant 5 minutes, max 50 entrées
- **Pages HTML** : Cache pendant 24 heures, max 20 entrées
- Essaie le réseau d'abord, utilise le cache en cas d'échec

### Mise à jour automatique
- Vérification des mises à jour toutes les heures
- Notification à l'utilisateur quand une nouvelle version est disponible

## 2. Cache Mémoire (Runtime)

### Utilisation

```typescript
import { getCachedData, setCachedData, fetchWithCache } from './utils/cache';

// Récupérer depuis le cache
const data = getCachedData<Product[]>('products');

// Stocker dans le cache
setCachedData('products', productsArray);

// Fetch avec cache automatique
const products = await fetchWithCache<Product[]>('/api/products');
```

### Durée de validité
- Par défaut : 5 minutes
- Personnalisable par appel

## 3. LocalStorage Cache

### Utilisation

```typescript
import { localCache } from './utils/cache';

// Stocker avec expiration (60 minutes par défaut)
localCache.set('user_preferences', preferences, 120);

// Récupérer
const preferences = localCache.get<UserPreferences>('user_preferences');

// Supprimer
localCache.remove('user_preferences');

// Vider tout le cache
localCache.clear();
```

### Cas d'usage
- Préférences utilisateur
- Données de configuration
- Résultats de recherche récents

## 4. Optimisations de Build

### Code Splitting
- Vendor chunks séparés (React, React Router)
- Chargement lazy des composants
- Limite de taille de chunk : 1000 KB

### Minification
- Terser pour la minification
- Suppression automatique des `console.log` en production

## 5. Préchargement

### Images
```typescript
import { preloadImages } from './utils/cache';

preloadImages([
  '/images/product1.webp',
  '/images/product2.webp',
]);
```

### Ressources
```typescript
import { preloadResources } from './utils/cache';

preloadResources([
  '/api/products',
  '/api/categories',
]);
```

## 6. Bonnes Pratiques

### À faire
- ✅ Utiliser le cache pour les données qui changent peu
- ✅ Définir des durées d'expiration appropriées
- ✅ Précharger les ressources critiques
- ✅ Tester le fonctionnement hors ligne

### À éviter
- ❌ Cacher des données sensibles (tokens, mots de passe)
- ❌ Cacher des données qui changent fréquemment sans expiration courte
- ❌ Stocker de très grandes quantités de données
- ❌ Oublier de gérer les erreurs de cache

## 7. Commandes

### Développement
```bash
pnpm dev
```
Le Service Worker est désactivé en développement pour éviter les conflits.

### Build Production
```bash
pnpm build
```
Le Service Worker et tous les caches sont activés.

### Preview
```bash
pnpm preview
```
Teste la version de production avec le Service Worker actif.

## 8. Débogage

### Chrome DevTools
1. Ouvrir DevTools (F12)
2. Onglet "Application"
3. Section "Service Workers" pour voir l'état du SW
4. Section "Cache Storage" pour inspecter les caches

### Vider le cache
```typescript
// Dans la console du navigateur
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});
```

## 9. Performances Attendues

### Première visite
- Chargement normal depuis le réseau
- Mise en cache des ressources

### Visites suivantes
- Réduction de 60-80% du temps de chargement
- Images et polices instantanées
- CSS/JS servis depuis le cache

### Hors ligne
- Navigation possible sur les pages visitées
- Affichage des images en cache
- Tentative de reconnexion automatique

## 10. Maintenance

### Nettoyage automatique
- Les caches obsolètes sont supprimés automatiquement
- Limite de taille : 5 MB par fichier
- Expiration automatique selon les durées définies

### Mise à jour manuelle
```typescript
// Forcer la mise à jour du Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.update());
  });
}
```

## Support

Pour toute question ou problème, consulter la documentation de :
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [Workbox](https://developers.google.com/web/tools/workbox)
