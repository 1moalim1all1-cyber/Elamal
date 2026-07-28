// سكريبت تعبئة أولية لقاعدة البيانات (Seed).
// شغّله مرة واحدة بعد ربط Firebase عشان تشوف الموقع شغال ببيانات حقيقية.
//
// طريقة التشغيل:
//   1) ثبّت أداة Firebase Admin:  npm install firebase-admin --save-dev
//   2) نزّل ملف مفتاح حساب الخدمة (Service Account) من Firebase Console
//      (Project Settings > Service Accounts > Generate new private key)
//      واحفظه باسم serviceAccountKey.json في جذر المشروع (لا ترفعه على Git).
//   3) شغّل:  node scripts/seed.mjs

import { readFileSync } from "fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(readFileSync("./serviceAccountKey.json", "utf-8"));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// نفس البيانات التجريبية الموجودة في src/data/demoData.ts (بصيغة مبسطة للسكريبت)
const now = Date.now();

const productCategories = [
  { id: "cat-ext", name: "دهانات خارجية", slug: "exterior", order: 1, isActive: true },
  { id: "cat-int", name: "دهانات داخلية", slug: "interior", order: 2, isActive: true },
  { id: "cat-dec", name: "دهانات ديكورية", slug: "decorative", order: 3, isActive: true },
  { id: "cat-putty", name: "معجون ومعالجات", slug: "putty", order: 4, isActive: true },
  { id: "cat-insulation", name: "مواد عزل", slug: "insulation", order: 5, isActive: true },
];

const homeSections = [
  { id: "sec-hero", type: "hero", isVisible: true, order: 1 },
  { id: "sec-about", type: "about", isVisible: true, order: 2 },
  { id: "sec-paintTypes", type: "paintTypes", isVisible: true, order: 3 },
  { id: "sec-products", type: "products", isVisible: true, order: 4 },
  { id: "sec-projects", type: "projects", isVisible: true, order: 5 },
  { id: "sec-testimonials", type: "testimonials", isVisible: true, order: 6 },
  { id: "sec-articles", type: "articles", isVisible: true, order: 7 },
  { id: "sec-cta", type: "cta", isVisible: true, order: 8 },
];

const siteSettings = {
  companyName: "اسم الشركة للدهانات",
  companyDescription: "شريكك الموثوق لدهانات داخلية وخارجية وديكورية بجودة عالمية.",
  logoUrl: "",
  phones: ["01000000000"],
  whatsappNumber: "201000000000",
  email: "info@example.com",
  addresses: [{ label: "المصنع", text: "المنطقة الصناعية، القاهرة، مصر" }],
  workingHours: "من السبت إلى الخميس، 9 صباحًا - 6 مساءً",
  socialLinks: [
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "instagram", url: "https://instagram.com" },
  ],
  copyrightText: "جميع الحقوق محفوظة",
  defaultLanguage: "ar",
  maintenanceMode: false,
  showTopBar: true,
};

async function seedCollection(name, items) {
  const batch = db.batch();
  items.forEach((item) => {
    const { id, ...rest } = item;
    const ref = db.collection(name).doc(id);
    batch.set(ref, { ...rest, createdAt: now, updatedAt: now });
  });
  await batch.commit();
  console.log(`✔ تمت تعبئة Collection: ${name} (${items.length} عنصر)`);
}

async function run() {
  await seedCollection("productCategories", productCategories);
  await seedCollection("homeSections", homeSections);
  await db.doc("settings/site").set(siteSettings);
  console.log("✔ تم حفظ إعدادات الموقع");
  console.log("\nتمت التعبئة الأساسية. أضف باقي المنتجات والمشاريع والصور من لوحة الإدارة مباشرة.");
  process.exit(0);
}

run().catch((err) => {
  console.error("حصل خطأ أثناء التعبئة:", err);
  process.exit(1);
});
