import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "riskless.png", "logo.svg"],

      manifest: {
        name: "RiskLess",
        short_name: "RiskLess",
        theme_color: "#ffffff",
        icons: [
          {
            src: "riskless.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "riskless.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "riskless.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "riskless.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://ap-southeast-1.aws.data.mongodb-api.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
