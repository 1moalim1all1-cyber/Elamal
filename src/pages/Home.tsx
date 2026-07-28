import { useCollection } from "@/hooks/useCollection";
import {
  heroSlidesService,
  productsService,
  productCategoriesService,
  projectsService,
  testimonialsService,
  articlesService,
  homeSectionsService,
} from "@/services";
import { HeroSlider } from "@/components/home/HeroSlider";
import { AboutSection } from "@/components/home/AboutSection";
import { PaintTypesSection } from "@/components/home/PaintTypesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ArticlesSection, CTASection } from "@/components/home/ArticlesAndCTA";
import { BrushDivider } from "@/components/ui/BrushDivider";
import {
  demoHeroSlides,
  demoCategories,
  demoProducts,
  demoTestimonials,
  demoArticles,
  demoHomeSections,
} from "@/data/demoData";
import type { HomeSectionType } from "@/types";

export default function Home() {
  const { items: slides } = useCollection((cb) => heroSlidesService.subscribe(cb));
  const { items: categories } = useCollection((cb) => productCategoriesService.subscribe(cb));
  const { items: products } = useCollection((cb) => productsService.subscribe(cb));
  const { items: testimonials } = useCollection((cb) => testimonialsService.subscribe(cb));
  const { items: articles } = useCollection((cb) => articlesService.subscribe(cb));
  const { items: sections } = useCollection((cb) => homeSectionsService.subscribe(cb));

  // عند عدم وجود بيانات في Firestore بعد (أول تشغيل قبل عمل seed)، تُستخدم بيانات تجريبية
  // فقط كعرض احتياطي — بمجرد ربط قاعدة البيانات تظهر البيانات الحقيقية تلقائيًا.
  const effectiveSlides = slides.length ? slides : demoHeroSlides;
  const effectiveCategories = categories.length ? categories : demoCategories;
  const effectiveProducts = products.length ? products : demoProducts;
  const effectiveTestimonials = testimonials.length ? testimonials : demoTestimonials;
  const effectiveArticles = articles.length ? articles : demoArticles;
  const effectiveSections = sections.length ? sections : demoHomeSections;

  const visibleSections = [...effectiveSections]
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  const sectionRenderers: Record<HomeSectionType, React.ReactNode> = {
    hero: <HeroSlider slides={effectiveSlides} />,
    about: <AboutSection />,
    paintTypes: <PaintTypesSection categories={effectiveCategories} />,
    intro: null,
    products: (
      <ProductsSection products={effectiveProducts} categories={effectiveCategories} />
    ),
    projects: null, // تُضاف في مرحلة قادمة (قسم استعراض المشاريع بنفس نمط قسم المنتجات)
    testimonials: <TestimonialsSection testimonials={effectiveTestimonials} />,
    articles: <ArticlesSection articles={effectiveArticles} />,
    cta: <CTASection />,
  };

  return (
    <div>
      {visibleSections.map((section, i) => (
        <div key={section.id}>
          {sectionRenderers[section.type]}
          {i < visibleSections.length - 1 && section.type !== "hero" && (
            <BrushDivider flip={i % 2 === 0} />
          )}
        </div>
      ))}
    </div>
  );
}
