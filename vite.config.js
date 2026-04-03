import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ command }) => ({
  // Use repo subpath only for production build; keep local dev at root.
  base: command === "serve" ? "/" : "/portfolio/",
  plugins: [vue()],
}));
