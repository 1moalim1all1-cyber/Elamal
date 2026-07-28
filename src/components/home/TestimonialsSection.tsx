import { useState } from "react";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import type { Testimonial } from "@/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const active = testimonials.filter((t) => t.isActive).sort((a, b) => a.order - b.order);
  const [index, setIndex] = useState(0);
  if (active.length === 0) return null;

  const t = active[index];
  const next = () => setIndex((i) => (i + 1) % active.length);
  const prev = () => setIndex((i) => (i - 1 + active.length) % active.length);

  return (
    <section className="bg-plaster-300 py-20">
      <div className="container-site">
        <div className="mb-10 text-center">
          <span className="text-sm font-bold text-petrol-500">آراء عملائنا</span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-ink-700 sm:text-4xl">
            ثقة نبنيها مع كل جدار
          </h2>
        </div>

        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className={i < t.rating ? "fill-amber-400 text-amber-400" : "text-plaster-200"}
              />
            ))}
          </div>
          <p className="mt-5 text-lg leading-9 text-ink-600">"{t.content}"</p>
          <div className="mt-6 flex items-center gap-3">
            {t.imageUrl && (
              <img src={t.imageUrl} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
            )}
            <div className="text-right">
              <p className="font-display font-bold text-ink-700">{t.name}</p>
              {t.role && <p className="text-xs text-stone">{t.role}</p>}
            </div>
          </div>

          {active.length > 1 && (
            <div className="mt-8 flex gap-3">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-500 shadow hover:text-petrol-500"
                aria-label="الرأي السابق"
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-500 shadow hover:text-petrol-500"
                aria-label="الرأي التالي"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
