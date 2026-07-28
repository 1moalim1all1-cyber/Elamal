import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUp, Facebook, Instagram, Youtube } from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

const socialIcons: Record<string, React.ElementType> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
};

const quickLinks = [
  { label: "عن الشركة", to: "/about" },
  { label: "المنتجات", to: "/products" },
  { label: "المشاريع", to: "/projects" },
  { label: "المواضيع", to: "/articles" },
];

export function Footer() {
  const { settings } = useSiteSettings();

  return (
    <footer className="relative bg-ink-500 text-plaster-200">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute -top-6 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-ink-700 shadow-lg transition hover:bg-amber-500"
        aria-label="العودة إلى أعلى الصفحة"
      >
        <ArrowUp size={20} />
      </button>

      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {settings.logoUrl ? (
            <img src={settings.logoUrl} alt={settings.companyName} className="h-12 brightness-0 invert" />
          ) : (
            <span className="font-display text-xl font-extrabold text-amber-400">
              {settings.companyName}
            </span>
          )}
          <p className="mt-4 text-sm leading-7 text-ink-100">{settings.companyDescription}</p>
          <div className="mt-5 flex gap-3">
            {settings.socialLinks.map((social) => {
              const Icon = socialIcons[social.platform.toLowerCase()];
              if (!Icon) return null;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-400/40 transition hover:bg-amber-400 hover:text-ink-700"
                  aria-label={social.platform}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-white">روابط سريعة</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-ink-100 transition hover:text-amber-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-white">بيانات التواصل</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-100">
            {settings.phones.map((phone) => (
              <li key={phone} className="flex items-center gap-2">
                <Phone size={15} className="text-amber-400" />
                <span dir="ltr">{phone}</span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-amber-400" />
              {settings.email}
            </li>
            {settings.addresses.map((addr) => (
              <li key={addr.label} className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-amber-400" />
                <span>{addr.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-white">مواعيد العمل</h3>
          <p className="mt-4 text-sm text-ink-100">{settings.workingHours}</p>
        </div>
      </div>

      <div className="border-t border-ink-400/40">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-xs text-ink-100 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {settings.companyName} — {settings.copyrightText}
          </p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-amber-400">سياسة الخصوصية</Link>
            <Link to="/terms" className="hover:text-amber-400">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
