import { Link } from "react-router-dom";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-plaster-300 bg-white transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-plaster-300">
        {product.images[product.mainImageIndex] && (
          <img
            src={product.images[product.mainImageIndex]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute right-3 top-3 flex gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-coral-400 px-2.5 py-1 text-[11px] font-bold text-white">
              جديد
            </span>
          )}
          {product.isFeatured && (
            <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-ink-700">
              مميز
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-bold text-ink-700">{product.name}</h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-6 text-stone">
          {product.shortDescription}
        </p>
        <span className="mt-3 text-sm font-bold text-petrol-500 group-hover:underline">
          اقرأ المزيد ←
        </span>
      </div>
    </Link>
  );
}
