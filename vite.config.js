import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/devbel_porfolio/",
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    sourcemap: false,
  },
});
