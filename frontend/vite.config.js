import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API calls to Flask backend
      "/api": {
        target: "http://127.0.0.1:8000", // Flask server URL
        changeOrigin: true,
        secure: false, // Only needed if you're using HTTPS with self-signed certificates
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional, rewrites `/api` prefix
      },
    },
  },
});
