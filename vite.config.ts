import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // base: "/" مناسب لأنك هتربط دومين مخصص بعدين (GitHub Pages بيقرأ الموقع من الجذر
  // مع الدومين المخصص). لو حبيت تجرب الموقع مؤقتًا على رابط
  // username.github.io/paint-company-site قبل ربط الدومين، غيّرها مؤقتًا إلى
  // base: "/paint-company-site/" وارجعها لـ "/" بعد ربط الدومين.
  base: "/",
  server: {
    port: 5173,
  },
});
