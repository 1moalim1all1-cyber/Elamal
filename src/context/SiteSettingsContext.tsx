import React, { createContext, useContext, useEffect, useState } from "react";
import { settingsService } from "@/services";
import type { SiteSettings } from "@/types";

const defaultSettings: SiteSettings = {
  companyName: "اسم الشركة للدهانات",
  companyDescription: "شريكك الموثوق لدهانات داخلية وخارجية وديكورية بجودة عالمية.",
  logoUrl: "",
  phones: ["01000000000"],
  whatsappNumber: "201000000000",
  email: "info@example.com",
  addresses: [{ label: "المصنع", text: "المنطقة الصناعية، القاهرة، مصر" }],
  workingHours: "من السبت إلى الخميس، 9 صباحًا - 6 مساءً",
  socialLinks: [],
  copyrightText: "جميع الحقوق محفوظة",
  defaultLanguage: "ar",
  maintenanceMode: false,
  showTopBar: true,
};

const SiteSettingsContext = createContext<{
  settings: SiteSettings;
  loading: boolean;
}>({ settings: defaultSettings, loading: true });

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    settingsService
      .subscribe((data) => {
        if (data) setSettings(data);
        setLoading(false);
      })
      .then((fn) => (unsub = fn))
      .catch(() => setLoading(false));
    return () => unsub?.();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export const useSiteSettings = () => useContext(SiteSettingsContext);
