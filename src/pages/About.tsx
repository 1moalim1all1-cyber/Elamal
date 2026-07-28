import { PageHeader } from "@/components/ui/PageHeader";
import { AboutSection } from "@/components/home/AboutSection";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function About() {
  const { settings } = useSiteSettings();
  return (
    <div>
      <PageHeader title="عن الشركة" />
      <div className="container-site py-4">
        <p className="mx-auto max-w-3xl text-center leading-8 text-stone">
          {settings.companyDescription}
        </p>
      </div>
      <AboutSection />
    </div>
  );
}
