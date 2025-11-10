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
        globPatterns: ["**/*.{js,css,html,png,json,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "network-cache",
              expiration: { maxEntries: 200, maxAgeSeconds: 24 * 60 * 60 },
            },
          },
          {
            urlPattern: /^\/data\/.*\.json$/,
            handler: "CacheFirst",
            options: {
              cacheName: "json-cache",
              expiration: { maxEntries: 100, maxAgeSeconds: 7 * 24 * 60 * 60 },
            },
          },
          {
            urlPattern: /^\/data\/flipbook\/.*\.(png|jpg|jpeg)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "flipbook-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
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
