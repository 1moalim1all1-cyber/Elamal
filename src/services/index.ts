import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createCollectionService } from "./firestoreService";
import type {
  HeroSlide,
  Product,
  ProductCategory,
  Project,
  Catalog,
  GalleryImage,
  Article,
  ArticleCategory,
  Testimonial,
  ContactMessage,
  SiteSettings,
  HomeSectionConfig,
} from "@/types";

// كل خدمة هنا مبنية فوق createCollectionService، وتوفر
// subscribe / getAll / getById / create / update / softDelete / restore
export const heroSlidesService = createCollectionService<HeroSlide>("heroSlides");
export const productsService = createCollectionService<Product>("products");
export const productCategoriesService =
  createCollectionService<ProductCategory>("productCategories");
export const projectsService = createCollectionService<Project>("projects");
export const catalogsService = createCollectionService<Catalog>("catalogs");
export const galleryService = createCollectionService<GalleryImage>("gallery");
export const articlesService = createCollectionService<Article>("articles");
export const articleCategoriesService =
  createCollectionService<ArticleCategory>("articleCategories");
export const testimonialsService = createCollectionService<Testimonial>(
  "testimonials"
);
export const messagesService = createCollectionService<ContactMessage>(
  "messages"
);
export const homeSectionsService = createCollectionService<HomeSectionConfig>(
  "homeSections"
);

// ===== إعدادات الموقع (مستند واحد ثابت بدل Collection) =====
const SETTINGS_DOC_PATH = "settings/site";

export const settingsService = {
  async get(): Promise<SiteSettings | null> {
    const snap = await getDoc(doc(db, SETTINGS_DOC_PATH));
    return snap.exists() ? (snap.data() as SiteSettings) : null;
  },
  subscribe(onChange: (settings: SiteSettings | null) => void) {
    // Firestore onSnapshot لمستند واحد
    const ref = doc(db, SETTINGS_DOC_PATH);
    return import("firebase/firestore").then(({ onSnapshot }) =>
      onSnapshot(
        ref,
        (snap) => onChange(snap.exists() ? (snap.data() as SiteSettings) : null),
        () => onChange(null)
      )
    );
  },
  async update(data: Partial<SiteSettings>) {
    await setDoc(doc(db, SETTINGS_DOC_PATH), data, { merge: true });
  },
};
