import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { ProductCategory } from "@/types";

export function PaintTypesSection({ categories }: { categories: ProductCategory[] }) {
  const active = categories.filter((c) => c.isActive).sort((a, b) => a.order - b.order);
  if (active.length === 0) return null;

  return (
    <section className="bg-petrol-500 py-20 text-white">
      <div className="container-site">
        <div className="mb-10 text-center">
          <span className="text-sm font-bold text-amber-400">تصنيفات المنتجات</span>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            دهان مناسب لكل مساحة
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="aspect-[4/3] w-full">
                {cat.imageUrl && (
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink-700/90 via-ink-700/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-xl font-bold">{cat.name}</h3>
                {cat.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-plaster-200">{cat.description}</p>
                )}
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-amber-400">
                  عرض المنتجات <ArrowLeft size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
