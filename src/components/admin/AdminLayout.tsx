import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  LayoutTemplate,
  Package,
  Tags,
  Briefcase,
  BookOpen,
  Images,
  Newspaper,
  Star,
  MessageSquare,
  FileStack,
  Menu as MenuIcon,
  PanelTop,
  PanelBottom,
  Phone,
  Share2,
  FolderOpen,
  Search,
  Palette,
  Settings,
  Users,
  Database,
  History,
  LogOut,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

// كل عنصر هنا يمثل بند في القائمة الجانبية المطلوبة (27 بندًا).
// implemented: true تعني الصفحة مبنية وشغالة فعليًا في هذه المرحلة.
const menu = [
  { label: "الرئيسية والإحصائيات", to: "/admin", icon: LayoutDashboard, implemented: true },
  { label: "إدارة السلايدر", to: "/admin/hero-slides", icon: Image, implemented: false },
  { label: "إدارة أقسام الرئيسية", to: "/admin/sections", icon: LayoutTemplate, implemented: true },
  { label: "إدارة المنتجات", to: "/admin/products", icon: Package, implemented: false },
  { label: "تصنيفات المنتجات", to: "/admin/product-categories", icon: Tags, implemented: false },
  { label: "إدارة المشاريع", to: "/admin/projects", icon: Briefcase, implemented: false },
  { label: "إدارة الكتالوجات", to: "/admin/catalogs", icon: BookOpen, implemented: false },
  { label: "معرض الصور", to: "/admin/gallery", icon: Images, implemented: false },
  { label: "إدارة المقالات", to: "/admin/articles", icon: Newspaper, implemented: false },
  { label: "آراء العملاء", to: "/admin/testimonials", icon: Star, implemented: false },
  { label: "رسائل التواصل", to: "/admin/messages", icon: MessageSquare, implemented: true },
  { label: "الصفحات الثابتة", to: "/admin/pages", icon: FileStack, implemented: false },
  { label: "إدارة القوائم", to: "/admin/menus", icon: MenuIcon, implemented: false },
  { label: "إدارة الهيدر", to: "/admin/header", icon: PanelTop, implemented: false },
  { label: "إدارة الفوتر", to: "/admin/footer", icon: PanelBottom, implemented: false },
  { label: "بيانات التواصل", to: "/admin/contact-info", icon: Phone, implemented: false },
  { label: "وسائل التواصل", to: "/admin/social", icon: Share2, implemented: false },
  { label: "ملفات الوسائط", to: "/admin/media", icon: FolderOpen, implemented: false },
  { label: "إعدادات SEO", to: "/admin/seo", icon: Search, implemented: false },
  { label: "التصميم والألوان", to: "/admin/design", icon: Palette, implemented: false },
  { label: "الإعدادات العامة", to: "/admin/settings", icon: Settings, implemented: true },
  { label: "المستخدمون والصلاحيات", to: "/admin/users", icon: Users, implemented: false },
  { label: "النسخ الاحتياطي", to: "/admin/backup", icon: Database, implemented: false },
  { label: "سجل العمليات", to: "/admin/activity-log", icon: History, implemented: false },
];

export function AdminLayout() {
  const { adminProfile, logout } = useAdminAuth();

  return (
    <div className="flex min-h-screen bg-plaster-300" dir="rtl">
      <aside className="hidden w-72 shrink-0 flex-col bg-ink-500 text-white lg:flex">
        <div className="border-b border-ink-400/40 p-6">
          <p className="font-display text-lg font-extrabold text-amber-400">لوحة الإدارة</p>
          <p className="mt-1 text-xs text-ink-100">{adminProfile?.displayName ?? "مدير"}</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-petrol-500 text-white"
                    : item.implemented
                    ? "text-ink-100 hover:bg-ink-400/30"
                    : "text-ink-200/50"
                }`
              }
              onClick={(e) => {
                if (!item.implemented) e.preventDefault();
              }}
              title={item.implemented ? undefined : "قادم في مرحلة تالية"}
            >
              <item.icon size={17} />
              {item.label}
              {!item.implemented && (
                <span className="mr-auto rounded-full bg-ink-400/40 px-2 py-0.5 text-[10px]">
                  قريبًا
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-ink-400/40 p-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-coral-300 hover:bg-ink-400/30"
          >
            <LogOut size={17} /> تسجيل الخروج
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
