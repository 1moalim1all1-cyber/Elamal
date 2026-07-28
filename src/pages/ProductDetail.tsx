import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FileText, MessageCircle, Download } from "lucide-react";
import { useCollection } from "@/hooks/useCollection";
import { productsService } from "@/services";
import { demoProducts } from "@/data/demoData";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCard } from "@/components/ui/ProductCard";

export default function ProductDetail() {
  const { slug } = useParams();
  const { settings } = useSiteSettings();
  const { items: liveProducts } = useCollection((cb) => productsService.subscribe(cb));
  const products = liveProducts.length ? liveProducts : demoProducts;
  const product = products.find((p) => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="container-site py-24 text-center">
        <p className="text-lg text-stone">المنتج غير موجود</p>
        <Link to="/products" className="mt-4 inline-block text-petrol-500 underline">
          الرجوع لكل المنتجات
        </Link>
      </div>
    );
  }

  const related = products.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 4);

  return (
    <div>
      <PageHeader title={product.name} parent="المنتجات" />
      <div className="container-site grid gap-12 py-14 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-2xl bg-plaster-300">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${
                    i === activeImage ? "border-petrol-500" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink-700">{product.name}</h1>
          <p className="mt-3 leading-8 text-stone">{product.fullDescription ?? product.shortDescription}</p>

          <dl className="mt-6 divide-y divide-plaster-300 rounded-2xl border border-plaster-300">
            {product.coverageRate && (
              <Row label="معدل التغطية" value={product.coverageRate} />
            )}
            {product.dryingTime && <Row label="زمن الجفاف" value={product.dryingTime} />}
            {product.applicationMethod && (
              <Row label="طريقة التطبيق" value={product.applicationMethod} />
            )}
            {product.availableColors && (
              <Row label="الألوان المتاحة" value={product.availableColors.join("، ")} />
            )}
            {product.availablePackages && (
              <Row label="العبوات المتاحة" value={product.availablePackages.join("، ")} />
            )}
          </dl>

          {product.features && product.features.length > 0 && (
            <div className="mt-6">
              <h3 className="font-display font-bold text-ink-700">المميزات</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-stone">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-petrol-500" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=استفسار عن منتج: ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-ink-700 hover:bg-amber-500"
            >
              <MessageCircle size={16} /> استفسر عبر واتساب
            </a>
            {product.technicalDataSheetUrl && (
              <a
                href={product.technicalDataSheetUrl}
                className="flex items-center gap-2 rounded-full border-2 border-ink-500 px-6 py-3 text-sm font-bold text-ink-500 hover:bg-ink-500 hover:text-white"
              >
                <FileText size={16} /> النشرة الفنية
              </a>
            )}
            {product.catalogUrl && (
              <a
                href={product.catalogUrl}
                className="flex items-center gap-2 rounded-full border-2 border-ink-500 px-6 py-3 text-sm font-bold text-ink-500 hover:bg-ink-500 hover:text-white"
              >
                <Download size={16} /> تحميل الكتالوج
              </a>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container-site pb-16">
          <h2 className="mb-6 font-display text-xl font-bold text-ink-700">منتجات مرتبطة</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between px-4 py-3 text-sm">
      <dt className="font-semibold text-ink-500">{label}</dt>
      <dd className="text-stone">{value}</dd>
    </div>
  );
}
