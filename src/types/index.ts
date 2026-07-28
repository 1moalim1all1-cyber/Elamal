// ===== أنواع البيانات الأساسية للمشروع =====
// كل نوع هنا يمثل مستند (Document) داخل Firestore.
// أي حقل يحمل "?" يعتبر اختياريًا ويمكن التحكم فيه من لوحة الإدارة.

export interface Timestamps {
  createdAt: number;
  updatedAt: number;
}

export interface SoftDelete {
  isDeleted?: boolean;
  deletedAt?: number | null;
}

// ----- شرائح السلايدر الرئيسي -----
export interface HeroSlide extends Timestamps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  order: number;
  isActive: boolean;
}

// ----- تصنيفات المنتجات -----
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
}

// ----- المنتجات -----
export interface Product extends Timestamps, SoftDelete {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  shortDescription: string;
  fullDescription?: string;
  images: string[];
  mainImageIndex: number;
  usage?: string;
  features?: string[];
  applicationMethod?: string;
  coverageRate?: string;
  dryingTime?: string;
  availableColors?: string[];
  availablePackages?: string[];
  storageInstructions?: string;
  safetyPrecautions?: string;
  technicalDataSheetUrl?: string;
  safetyDataSheetUrl?: string;
  catalogUrl?: string;
  videoUrl?: string;
  relatedProductIds?: string[];
  isFeatured: boolean;
  isNew: boolean;
  isPublished: boolean;
  order: number;
}

// ----- المشاريع -----
export interface Project extends Timestamps, SoftDelete {
  id: string;
  title: string;
  slug: string;
  client?: string;
  location?: string;
  projectType?: string;
  executionDate?: string;
  shortDescription: string;
  fullDescription?: string;
  images: string[];
  beforeAfterImages?: { before: string; after: string }[];
  usedProductIds?: string[];
  videoUrl?: string;
  isPublished: boolean;
  order: number;
}

// ----- الكتالوجات -----
export interface Catalog extends Timestamps {
  id: string;
  name: string;
  description?: string;
  coverImageUrl: string;
  fileUrl: string;
  category?: string;
  releaseDate?: string;
  allowDownload: boolean;
  order: number;
  isActive: boolean;
}

// ----- معرض الصور -----
export interface GalleryImage extends Timestamps {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  category?: string;
  order: number;
}

// ----- المقالات -----
export interface Article extends Timestamps, SoftDelete {
  id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  content: string; // HTML من محرر Rich Text
  categoryId?: string;
  author?: string;
  status: "draft" | "published";
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  relatedArticleIds?: string[];
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
}

// ----- آراء العملاء -----
export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  imageUrl?: string;
  rating: number; // 1-5
  content: string;
  isActive: boolean;
  order: number;
}

// ----- رسائل التواصل -----
export interface ContactMessage extends Timestamps {
  id: string;
  name: string;
  phone: string;
  email?: string;
  reason?: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  internalNote?: string;
}

// ----- إعدادات الموقع العامة -----
export interface SiteSettings {
  companyName: string;
  companyDescription: string;
  logoUrl: string;
  faviconUrl?: string;
  phones: string[];
  whatsappNumber: string;
  email: string;
  addresses: { label: string; text: string }[];
  workingHours?: string;
  mapEmbedUrl?: string;
  socialLinks: { platform: string; url: string }[];
  copyrightText: string;
  defaultLanguage: "ar" | "en";
  maintenanceMode: boolean;
  maintenanceMessage?: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  showTopBar: boolean;
  primaryColor?: string;
  secondaryColor?: string;
}

// ----- إدارة أقسام الصفحة الرئيسية -----
export type HomeSectionType =
  | "hero"
  | "about"
  | "paintTypes"
  | "intro"
  | "products"
  | "projects"
  | "testimonials"
  | "articles"
  | "cta";

export interface HomeSectionConfig {
  id: string;
  type: HomeSectionType;
  title?: string;
  subtitle?: string;
  isVisible: boolean;
  order: number;
  displayMode?: "grid" | "slider";
  itemsCount?: number;
  backgroundColor?: string;
}

// ----- المستخدمون الإداريون -----
export type AdminRole =
  | "super_admin"
  | "admin"
  | "content_editor"
  | "products_manager"
  | "messages_viewer";

export interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: number;
}

// ----- سجل العمليات -----
export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: "create" | "update" | "delete" | "restore" | "login";
  entityType: string;
  entityId?: string;
  details?: string;
  timestamp: number;
}
