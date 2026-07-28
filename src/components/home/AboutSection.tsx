import { Link } from "react-router-dom";

interface AboutSectionProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  stats?: { label: string; value: string }[];
}

const defaultStats = [
  { label: "سنوات خبرة", value: "+18" },
  { label: "منتج متنوع", value: "+120" },
  { label: "مشروع منفذ", value: "+900" },
  { label: "عميل راضٍ", value: "+5000" },
];

export function AboutSection({
  title = "خبرة أصيلة في صناعة الدهانات المصرية",
  description = "نصنّع دهانات داخلية وخارجية وديكورية بمعايير جودة عالمية، ونرافق عملاءنا من اختيار اللون وحتى تسليم الجدار النهائي.",
  imageUrl,
  stats = defaultStats,
}: AboutSectionProps) {
  return (
    <section className="container-site grid items-center gap-12 py-20 lg:grid-cols-2">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-petrol-100">
          {imageUrl && (
            <img src={imageUrl} alt={title} loading="lazy" className="h-full w-full object-cover" />
          )}
        </div>
        <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-amber-400 p-5 shadow-xl sm:block">
          <p className="font-display text-3xl font-extrabold text-ink-700">18+</p>
          <p className="text-xs font-semibold text-ink-700">سنة في السوق المصري</p>
        </div>
      </div>

      <div>
        <span className="text-sm font-bold text-petrol-500">نبذة عن الشركة</span>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-ink-700 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 leading-8 text-stone">{description}</p>
        <Link
          to="/about"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-ink-600"
        >
          اعرف المزيد عنا
        </Link>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-plaster-300 p-4 text-center">
              <p className="font-display text-2xl font-extrabold text-petrol-500">{stat.value}</p>
              <p className="mt-1 text-xs font-medium text-stone">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
