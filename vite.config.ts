import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['images/**/*', 'fonts/**/*'],
      manifest: {
        name: 'MAFRA SHOP',
        short_name: 'MAFRA SHOP',
        description: 'Boutique en ligne de produits d\'entretien automobile MA-FRA',
        theme_color: '#e74c3c',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/images/logoMAFRA.webp',
            sizes: '192x192',
            type: 'image/webp'
          },
          {
            src: '/images/logoMAFRA.webp',
            sizes: '512x512',
            type: 'image/webp'
          }
        ]
      },
      workbox: {
        // Cache des ressources essentielles
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,webp,svg,woff,woff2}'],
        
        // Stratégies de cache
        runtimeCaching: [
          // Cache des images avec stratégie Cache First
          {
            urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|webp|svg|gif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Cache des polices avec stratégie Cache First
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 an
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 an
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Cache des fichiers CSS et JS avec stratégie Stale While Revalidate
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 jours
              },
            },
          },
          // Cache des API calls avec stratégie Network First
          {
            urlPattern: /^https?:\/\/.*\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60, // 5 minutes
              },
              networkTimeoutSeconds: 10,
            },
          },
          // Cache des pages HTML avec stratégie Network First
          {
            urlPattern: /\.html$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 24 * 60 * 60, // 24 heures
              },
            },
          },
        ],
        
        // Taille maximale du cache
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
        
        // Nettoyage automatique
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        enabled: false, // Désactivé en dev pour éviter les conflits
      },
    }),
  ],
  server: {
    host: '0.0.0.0', 
    port: 5173,
  },
  build: {
    // Optimisations de build
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Code splitting
    chunkSizeWarningLimit: 1000,
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Supprime les console.log en production
      },
    },
  },
});
