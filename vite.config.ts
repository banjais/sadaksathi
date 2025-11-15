import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: { plugins: [] },
    }),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "icons/*.png"],
      manifest: {
        name: "Sadak-Sathi",
        short_name: "SadakSathi",
        description: "Real-time highway and road status for Nepal",
        theme_color: "#0d9488",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        icons: [
          { src: "icons/pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "icons/pwa-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg}"], // remove old JSON files
        runtimeCaching: [
          // Cache external API calls (like weather or Gemini) but keep them fresh
          {
            urlPattern: /^https:\/\/api\.openweathermap\.org\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "weather-api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60, // cache only 5 minutes
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.gemini\.ai\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "gemini-api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60,
              },
            },
          },
          // Optional: cache map tiles and static images
          {
            urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|svg)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "static-images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    open: true,
    cors: true,
  },
  build: {
    target: "esnext",
    outDir: "dist",
    sourcemap: true,
  },
  optimizeDeps: {
    include: [
      "axios",
      "file-saver",
      "turn.js",
      "jspdf",
      "html2canvas",
      "leaflet",
      "leaflet.markercluster",
      "maplibre-gl",
      "@mapbox/mapbox-gl-draw",
      "framer-motion",
      "lucide-react",
      "@radix-ui/react-slot",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "class-variance-authority",
    ],
  },
  define: {
    "process.env": {},
  },
});
