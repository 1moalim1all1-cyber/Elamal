import { Download, Eye } from "lucide-react";
import { useCollection } from "@/hooks/useCollection";
import { catalogsService } from "@/services";
import { demoCatalogs } from "@/data/demoData";
import { PageHeader } from "@/components/ui/PageHeader";

export default function Catalogs() {
  const { items: live } = useCollection((cb) => catalogsService.subscribe(cb));
  const catalogs = (live.length ? live : demoCatalogs).filter((c) => c.isActive);

  return (
    <div>
      <PageHeader title="الكتالوجات" />
      <div className="container-site grid gap-6 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {catalogs.map((cat) => (
          <div key={cat.id} className="overflow-hidden rounded-2xl border border-plaster-300 bg-white">
            <div className="aspect-[4/3] overflow-hidden bg-plaster-300">
              <img src={cat.coverImageUrl} alt={cat.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <h3 className="font-display font-bold text-ink-700">{cat.name}</h3>
              {cat.description && <p className="mt-1.5 text-sm text-stone">{cat.description}</p>}
              <div className="mt-4 flex gap-2">
                <a
                  href={cat.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-petrol-500 py-2.5 text-sm font-bold text-white"
                >
                  <Eye size={15} /> عرض
                </a>
                {cat.allowDownload && (
                  <a
                    href={cat.fileUrl}
                    download
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-petrol-500 py-2.5 text-sm font-bold text-petrol-500"
                  >
                    <Download size={15} /> تحميل
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
