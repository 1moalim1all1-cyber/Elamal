import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { settingsService } from "@/services";
import type { SiteSettings } from "@/types";

export default function AdminSettings() {
  const { settings } = useSiteSettings();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);

  useEffect(() => setForm(settings), [settings]);

  const save = async () => {
    setSaving(true);
    try {
      await settingsService.update(form);
      toast.success("تم حفظ الإعدادات");
    } catch {
      toast.error("تعذر الحفظ — تأكد من ربط Firebase وصلاحياتك");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-10">
      <h1 className="font-display text-2xl font-extrabold text-ink-700">الإعدادات العامة</h1>
      <p className="mt-1 text-sm text-stone">
        هذه البيانات تظهر مباشرة في الهيدر والفوتر وصفحة التواصل بمجرد الحفظ.
      </p>

      <div className="mt-8 max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-sm">
        <Field label="اسم الشركة">
          <input
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            className="input"
          />
        </Field>

        <Field label="وصف الشركة">
          <textarea
            value={form.companyDescription}
            onChange={(e) => setForm({ ...form, companyDescription: e.target.value })}
            rows={3}
            className="input"
          />
        </Field>

        <Field label="رقم الهاتف الأساسي">
          <input
            dir="ltr"
            value={form.phones[0] ?? ""}
            onChange={(e) => setForm({ ...form, phones: [e.target.value, ...form.phones.slice(1)] })}
            className="input"
          />
        </Field>

        <Field label="رقم واتساب (بالصيغة الدولية بدون +)">
          <input
            dir="ltr"
            value={form.whatsappNumber}
            onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
            className="input"
          />
        </Field>

        <Field label="البريد الإلكتروني">
          <input
            dir="ltr"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input"
          />
        </Field>

        <Field label="مواعيد العمل">
          <input
            value={form.workingHours ?? ""}
            onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
            className="input"
          />
        </Field>

        <Field label="إظهار الشريط العلوي (TopBar)">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.showTopBar}
              onChange={(e) => setForm({ ...form, showTopBar: e.target.checked })}
            />
            مفعّل
          </label>
        </Field>

        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-petrol-500 px-8 py-3 text-sm font-bold text-white hover:bg-petrol-600 disabled:opacity-60"
        >
          {saving ? "جارٍ الحفظ..." : "حفظ التعديلات"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-ink-500">{label}</label>
      {children}
    </div>
  );
}
