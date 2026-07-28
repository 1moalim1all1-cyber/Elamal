import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import type { Article } from "@/types";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export function ArticlesSection({ articles }: { articles: Article[] }) {
  const published = articles
    .filter((a) => a.status === "published" && !a.isDeleted)
    .slice(0, 3);
  if (published.length === 0) return null;

  return (
    <section className="container-site py-20">
      <div className="mb-10 text-center">
        <span className="text-sm font-bold text-petrol-500">مقالات ونصائح</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-ink-700 sm:text-4xl">
          دليلك لاختيار وتطبيق الدهانات
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {published.map((article) => (
          <Link
            key={article.id}
            to={`/articles/${article.slug}`}
            className="group overflow-hidden rounded-2xl border border-plaster-300"
          >
            <div className="aspect-video overflow-hidden bg-plaster-300">
              <img
                src={article.coverImageUrl}
                alt={article.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold text-ink-700 line-clamp-2">
                {article.title}
              </h3>
              <span className="mt-3 inline-block text-sm font-bold text-petrol-500">
                اقرأ المقال ←
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CTASection() {
  const { settings } = useSiteSettings();
  return (
    <section className="relative overflow-hidden bg-ink-500 py-20 text-white">
      <div className="container-site relative flex flex-col items-center gap-6 text-center">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
          محتاج استشارة في اختيار الدهان المناسب؟
        </h2>
        <p className="max-w-xl text-plaster-200">
          فريقنا الفني جاهز يساعدك تختار الألوان والخامات المناسبة لمشروعك من أول استفسار.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/contact"
            className="rounded-full bg-amber-400 px-7 py-3 text-sm font-bold text-ink-700 transition hover:bg-amber-500"
          >
            تواصل معنا
          </Link>
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-ink-700"
          >
            <MessageCircle size={16} /> واتساب مباشر
          </a>
        </div>
      </div>
    </section>
  );
}
