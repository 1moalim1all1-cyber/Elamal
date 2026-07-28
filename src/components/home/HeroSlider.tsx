import { useEffect, useState, useCallback } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { HeroSlide } from "@/types";

const AUTOPLAY_MS = 6000;

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const active = slides.filter((s) => s.isActive).sort((a, b) => a.order - b.order);
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % active.length), [active.length]);
  const prev = () => setIndex((i) => (i - 1 + active.length) % active.length);

  useEffect(() => {
    if (active.length <= 1) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next, active.length]);

  if (active.length === 0) return null;
  const slide = active[index];

  return (
    <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden bg-ink-500">
      {active.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={s.imageUrl}
            alt={s.title}
            loading={i === 0 ? "eager" : "lazy"}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-700/85 via-ink-700/40 to-ink-700/10" />
        </div>
      ))}

      <div className="container-site relative flex h-full flex-col items-start justify-end pb-24 text-white">
        <div key={slide.id} className="max-w-2xl animate-[fadeIn_0.6s_ease]">
          {slide.subtitle && (
            <span className="mb-3 inline-block rounded-full bg-amber-400 px-4 py-1 text-xs font-bold text-ink-700">
              {slide.subtitle}
            </span>
          )}
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            {slide.title}
          </h1>
          {slide.description && (
            <p className="mt-4 max-w-xl text-base leading-8 text-plaster-200">
              {slide.description}
            </p>
          )}
          <div className="mt-7 flex flex-wrap gap-3">
            {slide.primaryButtonText && (
              <Link
                to={slide.primaryButtonLink ?? "#"}
                className="rounded-full bg-amber-400 px-7 py-3 text-sm font-bold text-ink-700 shadow-lg transition hover:bg-amber-500"
              >
                {slide.primaryButtonText}
              </Link>
            )}
            {slide.secondaryButtonText && (
              <Link
                to={slide.secondaryButtonLink ?? "#"}
                className="rounded-full border-2 border-white/70 px-7 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-ink-700"
              >
                {slide.secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
      </div>

      {active.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 right-4 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
            aria-label="الشريحة السابقة"
          >
            <ChevronRight size={22} />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 left-4 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
            aria-label="الشريحة التالية"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {active.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-amber-400" : "w-2 bg-white/50"
                }`}
                aria-label={`الانتقال للشريحة ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
