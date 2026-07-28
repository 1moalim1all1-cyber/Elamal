import { useState } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { useCollection } from "@/hooks/useCollection";
import { galleryService } from "@/services";
import { demoGallery } from "@/data/demoData";
import { PageHeader } from "@/components/ui/PageHeader";

export default function Gallery() {
  const { items: live } = useCollection((cb) => galleryService.subscribe(cb));
  const images = live.length ? live : demoGallery;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <PageHeader title="معرض الصور" />
      <div className="container-site columns-2 gap-4 py-14 sm:columns-3 lg:columns-4">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setOpenIndex(i)}
            className="mb-4 block w-full overflow-hidden rounded-xl"
          >
            <img src={img.imageUrl} alt={img.title ?? ""} loading="lazy" className="w-full" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-700/95 p-4">
          <button
            onClick={() => setOpenIndex(null)}
            className="absolute top-5 left-5 text-white"
            aria-label="إغلاق"
          >
            <X size={28} />
          </button>
          <button
            onClick={() => setOpenIndex((i) => (i! - 1 + images.length) % images.length)}
            className="absolute right-5 text-white"
            aria-label="السابق"
          >
            <ChevronRight size={32} />
          </button>
          <img
            src={images[openIndex].imageUrl}
            alt=""
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
          />
          <button
            onClick={() => setOpenIndex((i) => (i! + 1) % images.length)}
            className="absolute left-5 text-white"
            aria-label="التالي"
          >
            <ChevronLeft size={32} />
          </button>
        </div>
      )}
    </div>
  );
}
