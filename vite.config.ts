import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // الموقع شغال دلوقتي على https://username.github.io/Elamal/ (بدون دومين مخصص بعد)،
  // فلازم base يطابق اسم الريبو بالظبط. لو ربطت دومين مخصص بعدين، غيّرها لـ "/".
  base: "/Elamal/",
  server: {
    port: 5173,
  },
});
