import { Package, Tags, Briefcase, BookOpen, Newspaper, MessageSquare } from "lucide-react";
import { useCollection } from "@/hooks/useCollection";
import {
  productsService,
  productCategoriesService,
  projectsService,
  catalogsService,
  articlesService,
  messagesService,
} from "@/services";

export default function AdminDashboard() {
  const { items: products } = useCollection((cb) => productsService.subscribe(cb));
  const { items: categories } = useCollection((cb) => productCategoriesService.subscribe(cb));
  const { items: projects } = useCollection((cb) => projectsService.subscribe(cb));
  const { items: catalogs } = useCollection((cb) => catalogsService.subscribe(cb));
  const { items: articles } = useCollection((cb) => articlesService.subscribe(cb));
  const { items: messages } = useCollection((cb) => messagesService.subscribe(cb));

  const unreadCount = messages.filter((m) => !m.isRead).length;

  const stats = [
    { label: "المنتجات", value: products.length, icon: Package, color: "bg-petrol-500" },
    { label: "التصنيفات", value: categories.length, icon: Tags, color: "bg-amber-500" },
    { label: "المشاريع", value: projects.length, icon: Briefcase, color: "bg-coral-400" },
    { label: "الكتالوجات", value: catalogs.length, icon: BookOpen, color: "bg-ink-500" },
    { label: "المقالات", value: articles.length, icon: Newspaper, color: "bg-petrol-400" },
    { label: "رسائل غير مقروءة", value: unreadCount, icon: MessageSquare, color: "bg-coral-500" },
  ];

  return (
    <div className="p-6 lg:p-10">
      <h1 className="font-display text-2xl font-extrabold text-ink-700">نظرة عامة</h1>
      <p className="mt-1 text-sm text-stone">ملخص سريع لحالة الموقع الآن</p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color} text-white`}>
              <stat.icon size={18} />
            </div>
            <p className="mt-4 font-display text-2xl font-extrabold text-ink-700">{stat.value}</p>
            <p className="text-sm text-stone">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="font-display font-bold text-ink-700">آخر الرسائل الواردة</h2>
        <div className="mt-4 divide-y divide-plaster-300">
          {messages.slice(0, 5).map((m) => (
            <div key={m.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <p className="font-semibold text-ink-600">{m.name}</p>
                <p className="text-stone">{m.reason}</p>
              </div>
              {!m.isRead && (
                <span className="rounded-full bg-coral-100 px-2.5 py-1 text-[11px] font-bold text-coral-700">
                  جديدة
                </span>
              )}
            </div>
          ))}
          {messages.length === 0 && (
            <p className="py-6 text-center text-sm text-stone">لا توجد رسائل بعد</p>
          )}
        </div>
      </div>
    </div>
  );
}
