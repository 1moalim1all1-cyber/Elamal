import { Construction } from "lucide-react";

export default function AdminComingSoon() {
  return (
    <div className="flex h-full min-h-[70vh] flex-col items-center justify-center gap-3 p-10 text-center">
      <Construction size={40} className="text-amber-500" />
      <p className="font-display text-lg font-bold text-ink-700">هذا القسم قيد الإنشاء</p>
      <p className="max-w-sm text-sm text-stone">
        هذه الصفحة جزء من المرحلة القادمة من المشروع (إدارة المنتجات، المشاريع، الوسائط، وغيرها)،
        وسيتم بناؤها وربطها بنفس طريقة قسم "إدارة أقسام الرئيسية".
      </p>
    </div>
  );
}
