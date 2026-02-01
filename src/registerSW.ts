import { registerSW } from 'virtual:pwa-register';

// Enregistrement du Service Worker avec gestion des mises à jour
const updateSW = registerSW({
  onNeedRefresh() {
    // Quand une nouvelle version est disponible
    if (confirm('Une nouvelle version est disponible. Voulez-vous mettre à jour ?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    // Quand l'application est prête à fonctionner hors ligne
    console.log('Application prête à fonctionner hors ligne');
  },
  onRegistered(registration) {
    // Vérifier les mises à jour toutes les heures
    if (registration) {
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000); // 1 heure
    }
  },
  onRegisterError(error) {
    console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
  },
});

export { updateSW };
