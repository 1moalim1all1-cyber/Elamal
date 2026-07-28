import { Phone, Mail, MessageCircle, Facebook, Instagram, Youtube } from "lucide-react";
import { useSiteSettings } from "@/context/SiteSettingsContext";

const socialIcons: Record<string, React.ElementType> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
};

export function TopBar() {
  const { settings } = useSiteSettings();

  // يمكن إخفاء الشريط بالكامل من لوحة الإدارة عبر settings.showTopBar
  if (!settings.showTopBar) return null;

  return (
    <div className="hidden bg-ink-500 text-plaster-200 md:block">
      <div className="container-site flex h-9 items-center justify-between text-xs">
        <div className="flex items-center gap-5">
          {settings.phones[0] && (
            <a
              href={`tel:${settings.phones[0]}`}
              className="flex items-center gap-1.5 transition hover:text-amber-400"
            >
              <Phone size={13} />
              <span dir="ltr">{settings.phones[0]}</span>
            </a>
          )}
          <a
            href={`mailto:${settings.email}`}
            className="flex items-center gap-1.5 transition hover:text-amber-400"
          >
            <Mail size={13} />
            <span>{settings.email}</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-petrol-200 transition hover:text-amber-400"
          >
            <MessageCircle size={13} />
            <span>واتساب</span>
          </a>
          <div className="flex items-center gap-3">
            {settings.socialLinks.map((social) => {
              const Icon = socialIcons[social.platform.toLowerCase()];
              if (!Icon) return null;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-amber-400"
                  aria-label={social.platform}
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
