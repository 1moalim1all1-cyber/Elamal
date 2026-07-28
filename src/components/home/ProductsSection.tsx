import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product, ProductCategory } from "@/types";

export function ProductsSection({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
  const [activeCat, setActiveCat] = useState<string>("all");

  const published = products.filter((p) => p.isPublished && !p.isDeleted);
  const filtered =
    activeCat === "all" ? published : published.filter((p) => p.categoryId === activeCat);

  return (
    <section className="container-site py-20">
      <div className="mb-10 flex flex-col items-center gap-6 text-center">
        <div>
          <span className="text-sm font-bold text-petrol-500">منتجاتنا</span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-ink-700 sm:text-4xl">
            تشكيلة دهانات متكاملة
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCat("all")}
            className={`rounded-full px-5 py-2 text-sm font-bold transition ${
              activeCat === "all"
                ? "bg-ink-500 text-white"
                : "bg-plaster-300 text-ink-500 hover:bg-plaster-100"
            }`}
          >
            الكل
          </button>
          {categories
            .filter((c) => c.isActive)
            .map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                  activeCat === cat.id
                    ? "bg-ink-500 text-white"
                    : "bg-plaster-300 text-ink-500 hover:bg-plaster-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-stone">لا توجد منتجات في هذا التصنيف حاليًا</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/products"
          className="inline-flex rounded-full border-2 border-petrol-500 px-7 py-3 text-sm font-bold text-petrol-500 transition hover:bg-petrol-500 hover:text-white"
        >
          عرض كل المنتجات
        </Link>
      </div>
    </section>
  );
}
