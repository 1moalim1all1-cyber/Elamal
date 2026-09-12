import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // الموقع يعمل على دومين مخصص، لذلك تُحمّل الملفات من جذر الدومين.
  base: "/",
  server: {
    port: 5173,
  },
});
