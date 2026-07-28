import { NavLink } from "react-router-dom";
import { X, Phone, MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: { label: string; to: string }[];
}

export function MobileMenu({ open, onClose, navItems }: MobileMenuProps) {
  const { settings } = useSiteSettings();

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink-700/60 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-plaster-100 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-plaster-300 p-5">
          <span className="font-display text-lg font-bold text-petrol-500">
            {settings.companyName}
          </span>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-plaster-300" aria-label="إغلاق">
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              end={item.to === "/"}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-base font-semibold ${
                  isActive ? "bg-petrol-500 text-white" : "text-ink-500 hover:bg-plaster-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex gap-2 border-t border-plaster-300 p-4">
          <a
            href={`tel:${settings.phones[0]}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-ink-500 py-3 text-sm font-bold text-white"
          >
            <Phone size={16} /> اتصل بنا
          </a>
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 text-sm font-bold text-ink-700"
          >
            <MessageCircle size={16} /> واتساب
          </a>
        </div>
      </div>
    </div>
  );
}
