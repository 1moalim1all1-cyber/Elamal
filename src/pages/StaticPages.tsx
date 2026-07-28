import { Link } from "react-router-dom";
import { PageHeader } from "@/components/ui/PageHeader";

export function PrivacyPolicy() {
  return (
    <div>
      <PageHeader title="سياسة الخصوصية" />
      <div className="container-site max-w-3xl py-14 leading-8 text-stone">
        <p>
          نحرص في اسم الشركة على حماية بيانات زوارنا وعملائنا، ولا نشارك بياناتك مع أي جهة خارجية
          إلا بموافقتك الصريحة. هذا النص افتراضي ويمكن تعديله بالكامل من لوحة الإدارة، صفحة
          "الصفحات الثابتة".
        </p>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div>
      <PageHeader title="الشروط والأحكام" />
      <div className="container-site max-w-3xl py-14 leading-8 text-stone">
        <p>
          يُعتبر استخدامك لهذا الموقع موافقة على الشروط والأحكام الموضحة هنا. هذا النص افتراضي
          ويمكن تعديله بالكامل من لوحة الإدارة، صفحة "الصفحات الثابتة".
        </p>
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-display text-7xl font-extrabold text-petrol-500">404</p>
      <p className="text-lg text-stone">الصفحة اللي بتدور عليها مش موجودة</p>
      <Link to="/" className="rounded-full bg-ink-500 px-6 py-3 text-sm font-bold text-white">
        الرجوع للصفحة الرئيسية
      </Link>
    </div>
  );
}
