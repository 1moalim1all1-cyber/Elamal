// بيانات تجريبية — تُستخدم فقط لتغذية Firestore أول مرة (عبر scripts/seed.mjs)
// أو كعرض احتياطي قبل ربط قاعدة البيانات. كل هذا المحتوى قابل للتعديل بالكامل
// من لوحة الإدارة بعد رفعه لقاعدة البيانات، وليس نصًا ثابتًا داخل الواجهة.

import type {
  ProductCategory,
  Product,
  Project,
  Testimonial,
  Article,
  Catalog,
  GalleryImage,
  HeroSlide,
  HomeSectionConfig,
} from "@/types";

const IMG = (seed: string, w = 800, h = 600) =>
  `https://images.unsplash.com/${seed}?w=${w}&h=${h}&fit=crop`;

export const demoCategories: ProductCategory[] = [
  { id: "cat-ext", name: "دهانات خارجية", slug: "exterior", description: "حماية طويلة الأمد من العوامل الجوية", imageUrl: IMG("photo-1600566753190-17f0baa2a6c3"), order: 1, isActive: true },
  { id: "cat-int", name: "دهانات داخلية", slug: "interior", description: "ألوان ناعمة وتغطية مثالية للحوائط الداخلية", imageUrl: IMG("photo-1562259949-e8e7689d7828"), order: 2, isActive: true },
  { id: "cat-dec", name: "دهانات ديكورية", slug: "decorative", description: "خامات وتأثيرات فنية للمساحات المميزة", imageUrl: IMG("photo-1618221195710-dd6b41faaea6"), order: 3, isActive: true },
  { id: "cat-putty", name: "معجون ومعالجات", slug: "putty", description: "تجهيز مثالي للأسطح قبل الدهان", imageUrl: IMG("photo-1589939705384-5185137a7f0f"), order: 4, isActive: true },
  { id: "cat-insulation", name: "مواد عزل", slug: "insulation", description: "عزل مائي وحراري عالي الكفاءة", imageUrl: IMG("photo-1581094794329-c8112a89af12"), order: 5, isActive: true },
];

export const demoProducts: Product[] = Array.from({ length: 8 }).map((_, i) => {
  const cat = demoCategories[i % demoCategories.length];
  return {
    id: `prod-${i + 1}`,
    name: `${cat.name} - موديل ${i + 1}`,
    slug: `product-${i + 1}`,
    categoryId: cat.id,
    shortDescription: "دهان عالي الجودة بتغطية ممتازة ومقاومة للعوامل الجوية والرطوبة.",
    fullDescription:
      "دهان مطور بتقنية حديثة يضمن ثبات اللون وسهولة التطبيق، مناسب لجميع أنواع الأسطح الأسمنتية والجبسية.",
    images: [IMG(`photo-158993970538${i}-5185137a7f0f`, 700, 700)],
    mainImageIndex: 0,
    usage: "الحوائط الداخلية والخارجية",
    features: ["مقاوم للرطوبة", "سهل التنظيف", "ثبات لوني عالي"],
    applicationMethod: "رول أو رش أو فرشاة، بعد تجهيز السطح جيدًا",
    coverageRate: "10-12 م²/لتر للطبقة الواحدة",
    dryingTime: "من 2 إلى 4 ساعات بين الطبقات",
    availableColors: ["أبيض", "بيج", "رمادي فاتح"],
    availablePackages: ["ربع جالون", "جالون", "18 لتر"],
    isFeatured: i < 3,
    isNew: i >= 6,
    isPublished: true,
    order: i + 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
});

export const demoProjects: Project[] = [
  { id: "proj-1", title: "فيلا سكنية - التجمع الخامس", slug: "villa-tagamoa", location: "القاهرة الجديدة", projectType: "سكني", executionDate: "2025", shortDescription: "دهانات خارجية وداخلية كاملة لفيلا دوبلكس", images: [IMG("photo-1600585154340-be6161a56a0c")], isPublished: true, order: 1, createdAt: Date.now(), updatedAt: Date.now() },
  { id: "proj-2", title: "مقر إداري - مدينة نصر", slug: "office-nasr-city", location: "القاهرة", projectType: "إداري", executionDate: "2024", shortDescription: "تشطيب دهانات ديكورية لمبنى إداري بالكامل", images: [IMG("photo-1497366754035-f200968a6e72")], isPublished: true, order: 2, createdAt: Date.now(), updatedAt: Date.now() },
  { id: "proj-3", title: "كمباوند سكني - الساحل الشمالي", slug: "north-coast-compound", location: "الساحل الشمالي", projectType: "سكني", executionDate: "2025", shortDescription: "دهانات خارجية مقاومة للرطوبة لـ 40 وحدة", images: [IMG("photo-1560184611-ff3e53f00e8f")], isPublished: true, order: 3, createdAt: Date.now(), updatedAt: Date.now() },
];

export const demoTestimonials: Testimonial[] = [
  { id: "t1", name: "أحمد الشربيني", role: "مقاول تشطيبات", rating: 5, content: "جودة الدهان فرق معايا كتير مع العملاء، والتغطية ممتازة من أول طبقة.", isActive: true, order: 1 },
  { id: "t2", name: "منى عبد الرازق", role: "مهندسة ديكور", rating: 5, content: "تعاملت مع الشركة في أكتر من مشروع، الالتزام بالمواعيد والجودة حاجة نادرة.", isActive: true, order: 2 },
  { id: "t3", name: "كريم فتحي", role: "صاحب فيلا", rating: 4, content: "الفريق ساعدني أختار الألوان المناسبة والنتيجة كانت فوق توقعاتي.", isActive: true, order: 3 },
  { id: "t4", name: "سارة يوسف", role: "مديرة مشتريات", rating: 5, content: "أسعار تنافسية وخدمة توصيل سريعة لكل مواقع المشروع.", isActive: true, order: 4 },
];

export const demoArticles: Article[] = [
  { id: "a1", title: "كيف تختار لون الدهان المناسب لغرفة المعيشة", slug: "choosing-living-room-color", coverImageUrl: IMG("photo-1560185127-6a8c9848e6c3"), content: "<p>محتوى المقال...</p>", author: "فريق التحرير", status: "published", createdAt: Date.now(), updatedAt: Date.now() },
  { id: "a2", title: "الفرق بين الدهان المائي والزيتي", slug: "water-vs-oil-paint", coverImageUrl: IMG("photo-1562259949-e8e7689d7828"), content: "<p>محتوى المقال...</p>", author: "فريق التحرير", status: "published", createdAt: Date.now(), updatedAt: Date.now() },
  { id: "a3", title: "خطوات تجهيز الحائط قبل الدهان", slug: "wall-preparation-steps", coverImageUrl: IMG("photo-1589939705384-5185137a7f0f"), content: "<p>محتوى المقال...</p>", author: "فريق التحرير", status: "published", createdAt: Date.now(), updatedAt: Date.now() },
];

export const demoCatalogs: Catalog[] = [
  { id: "c1", name: "كتالوج الدهانات الخارجية 2026", coverImageUrl: IMG("photo-1600566753190-17f0baa2a6c3"), fileUrl: "#", category: "خارجية", releaseDate: "2026", allowDownload: true, order: 1, isActive: true, createdAt: Date.now(), updatedAt: Date.now() },
  { id: "c2", name: "كتالوج الألوان الديكورية", coverImageUrl: IMG("photo-1618221195710-dd6b41faaea6"), fileUrl: "#", category: "ديكورية", releaseDate: "2026", allowDownload: true, order: 2, isActive: true, createdAt: Date.now(), updatedAt: Date.now() },
];

export const demoGallery: GalleryImage[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `g${i + 1}`,
  imageUrl: IMG(`photo-160058515434${i}-be6161a56a0c`, 600, 800),
  title: `صورة تنفيذ ${i + 1}`,
  category: i % 2 === 0 ? "خارجية" : "داخلية",
  order: i + 1,
  createdAt: Date.now(),
  updatedAt: Date.now(),
}));

export const demoHeroSlides: HeroSlide[] = [
  { id: "s1", title: "دهانات تحمي جدارك وتعكس ذوقك", subtitle: "جودة مصرية بمعايير عالمية", description: "تشكيلة متكاملة من الدهانات الداخلية والخارجية والديكورية.", imageUrl: IMG("photo-1600566753190-17f0baa2a6c3", 1600, 900), primaryButtonText: "تصفح المنتجات", primaryButtonLink: "/products", secondaryButtonText: "تواصل معنا", secondaryButtonLink: "/contact", order: 1, isActive: true, createdAt: Date.now(), updatedAt: Date.now() },
  { id: "s2", title: "من المصنع إلى الجدار بجودة مضمونة", imageUrl: IMG("photo-1562259949-e8e7689d7828", 1600, 900), primaryButtonText: "شاهد مشاريعنا", primaryButtonLink: "/projects", order: 2, isActive: true, createdAt: Date.now(), updatedAt: Date.now() },
];

export const demoHomeSections: HomeSectionConfig[] = [
  { id: "sec-hero", type: "hero", isVisible: true, order: 1 },
  { id: "sec-about", type: "about", isVisible: true, order: 2 },
  { id: "sec-paintTypes", type: "paintTypes", isVisible: true, order: 3 },
  { id: "sec-products", type: "products", isVisible: true, order: 4 },
  { id: "sec-projects", type: "projects", isVisible: true, order: 5 },
  { id: "sec-testimonials", type: "testimonials", isVisible: true, order: 6 },
  { id: "sec-articles", type: "articles", isVisible: true, order: 7 },
  { id: "sec-cta", type: "cta", isVisible: true, order: 8 },
];
