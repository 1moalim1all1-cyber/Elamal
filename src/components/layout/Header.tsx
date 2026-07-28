import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { TopBar } from "./TopBar";
import { MobileMenu } from "./MobileMenu";
import { useSiteSettings } from "@/context/SiteSettingsContext";

const navItems = [
  { label: "الرئيسية", to: "/" },
  { label: "عن الشركة", to: "/about" },
  { label: "المنتجات", to: "/products" },
  { label: "الكتالوجات", to: "/catalogs" },
  { label: "المشاريع", to: "/projects" },
  { label: "معرض الصور", to: "/gallery" },
  { label: "المواضيع", to: "/articles" },
  { label: "تواصل معنا", to: "/contact" },
];

// شريط ألوان يمثل "عينات الدهانات" — العنصر البصري المميز للهوية، يظهر أسفل الهيدر
const swatchColors = [
  "bg-petrol-500",
  "bg-amber-400",
  "bg-coral-400",
  "bg-petrol-300",
  "bg-amber-600",
  "bg-ink-400",
];

export function Header() {
  const { settings } = useSiteSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-plaster-100/95 backdrop-blur transition-shadow ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <TopBar />
        <div className="container-site flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt={settings.companyName} className="h-12" />
            ) : (
              <span className="font-display text-2xl font-extrabold text-petrol-500">
                {settings.companyName}
              </span>
            )}
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-petrol-500 text-white"
                      : "text-ink-500 hover:bg-plaster-300"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-ink-700 shadow-sm transition hover:bg-amber-500 sm:block"
            >
              اطلب استشارة
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-ink-500 hover:bg-plaster-300 lg:hidden"
              aria-label="فتح القائمة"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>

        <div className="swatch-strip">
          {swatchColors.map((c, i) => (
            <span key={i} className={c} />
          ))}
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
