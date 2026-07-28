import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GripVertical, Eye, EyeOff } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { homeSectionsService } from "@/services";
import { useCollection } from "@/hooks/useCollection";
import { demoHomeSections } from "@/data/demoData";
import type { HomeSectionConfig } from "@/types";

const sectionLabels: Record<string, string> = {
  hero: "السلايدر الرئيسي",
  about: "نبذة عن الشركة",
  paintTypes: "أنواع الدهانات",
  intro: "قسم تعريفي",
  products: "المنتجات",
  projects: "المشاريع",
  testimonials: "آراء العملاء",
  articles: "المقالات",
  cta: "الدعوة للتواصل",
};

function SortableRow({
  section,
  onToggle,
}: {
  section: HomeSectionConfig;
  onToggle: (id: string, value: boolean) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-4 rounded-2xl border border-plaster-300 bg-white p-4 ${
        isDragging ? "shadow-lg" : ""
      }`}
    >
      <button {...attributes} {...listeners} className="cursor-grab text-stone" aria-label="سحب لإعادة الترتيب">
        <GripVertical size={20} />
      </button>
      <div className="flex-1">
        <p className="font-semibold text-ink-700">{sectionLabels[section.type] ?? section.type}</p>
        <p className="text-xs text-stone">الترتيب الحالي: {section.order}</p>
      </div>
      <button
        onClick={() => onToggle(section.id, !section.isVisible)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
          section.isVisible ? "bg-petrol-100 text-petrol-600" : "bg-plaster-300 text-stone"
        }`}
      >
        {section.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
        {section.isVisible ? "ظاهر" : "مخفي"}
      </button>
    </div>
  );
}

export default function AdminSections() {
  const { items: live, loading } = useCollection((cb) => homeSectionsService.subscribe(cb));
  const [sections, setSections] = useState<HomeSectionConfig[]>([]);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const source = live.length ? live : demoHomeSections;
    setSections([...source].sort((a, b) => a.order - b.order));
  }, [live]);

  const persistOrder = async (updated: HomeSectionConfig[]) => {
    setSections(updated);
    try {
      await Promise.all(
        updated.map((s, i) => homeSectionsService.update(s.id, { order: i + 1 }))
      );
      toast.success("تم حفظ الترتيب الجديد");
    } catch {
      toast.error("تعذر حفظ الترتيب — تأكد من ربط Firebase");
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    persistOrder(arrayMove(sections, oldIndex, newIndex));
  };

  const handleToggle = async (id: string, value: boolean) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, isVisible: value } : s)));
    try {
      await homeSectionsService.update(id, { isVisible: value });
    } catch {
      toast.error("تعذر الحفظ — تأكد من ربط Firebase");
    }
  };

  return (
    <div className="p-6 lg:p-10">
      <h1 className="font-display text-2xl font-extrabold text-ink-700">إدارة أقسام الصفحة الرئيسية</h1>
      <p className="mt-1 text-sm text-stone">
        اسحب أي قسم لتغيير ترتيبه، أو أخفِه مؤقتًا من الموقع. أي تغيير هنا يظهر في الصفحة
        الرئيسية فورًا.
      </p>

      {loading ? (
        <p className="mt-8 text-sm text-stone">جارٍ التحميل...</p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="mt-8 space-y-3">
              {sections.map((section) => (
                <SortableRow key={section.id} section={section} onToggle={handleToggle} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
