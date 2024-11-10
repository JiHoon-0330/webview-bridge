import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/themealdb": {
        target: "https://www.themealdb.com/api/json/v1/1/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/themealdb/, ""),
      },
    },
  },
});
