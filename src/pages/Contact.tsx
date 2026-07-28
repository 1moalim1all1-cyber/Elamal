import { useState } from "react";
import toast from "react-hot-toast";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { messagesService } from "@/services";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { PageHeader } from "@/components/ui/PageHeader";

const reasons = ["استفسار عن منتج", "طلب عرض سعر", "شكوى", "شراكة تجارية", "أخرى"];

export default function Contact() {
  const { settings } = useSiteSettings();
  const [form, setForm] = useState({ name: "", phone: "", email: "", reason: reasons[0], message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error("من فضلك املأ الاسم والهاتف والرسالة");
      return;
    }
    setSubmitting(true);
    try {
      await messagesService.create({
        ...form,
        isRead: false,
        isArchived: false,
      } as any);
      toast.success("تم إرسال رسالتك بنجاح، هنتواصل معاك قريبًا");
      setForm({ name: "", phone: "", email: "", reason: reasons[0], message: "" });
    } catch (err) {
      toast.error("حصل خطأ أثناء الإرسال، حاول تاني");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader title="تواصل معنا" />
      <div className="container-site grid gap-10 py-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-bold text-ink-700">بيانات التواصل</h2>
          <ul className="mt-5 space-y-4 text-sm text-stone">
            {settings.phones.map((phone) => (
              <li key={phone} className="flex items-center gap-3">
                <Phone size={18} className="text-petrol-500" /> <span dir="ltr">{phone}</span>
              </li>
            ))}
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-petrol-500" /> {settings.email}
            </li>
            {settings.addresses.map((addr) => (
              <li key={addr.label} className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-petrol-500" /> {addr.text}
              </li>
            ))}
            <li className="flex items-center gap-3">
              <Clock size={18} className="text-petrol-500" /> {settings.workingHours}
            </li>
          </ul>
          <a
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-ink-700 hover:bg-amber-500"
          >
            <MessageCircle size={16} /> تواصل عبر واتساب
          </a>

          {settings.mapEmbedUrl && (
            <iframe
              src={settings.mapEmbedUrl}
              className="mt-6 h-64 w-full rounded-2xl border-0"
              loading="lazy"
              title="الموقع على الخريطة"
            />
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-plaster-300 p-6">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink-500">الاسم</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-plaster-300 px-4 py-2.5 text-sm outline-none focus:border-petrol-500"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink-500">رقم الهاتف</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border border-plaster-300 px-4 py-2.5 text-sm outline-none focus:border-petrol-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-ink-500">البريد الإلكتروني</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-plaster-300 px-4 py-2.5 text-sm outline-none focus:border-petrol-500"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink-500">سبب التواصل</label>
            <select
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="w-full rounded-xl border border-plaster-300 px-4 py-2.5 text-sm outline-none focus:border-petrol-500"
            >
              {reasons.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink-500">الرسالة</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full rounded-xl border border-plaster-300 px-4 py-2.5 text-sm outline-none focus:border-petrol-500"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-petrol-500 py-3 text-sm font-bold text-white hover:bg-petrol-600 disabled:opacity-60"
          >
            {submitting ? "جارٍ الإرسال..." : "إرسال الرسالة"}
          </button>
        </form>
      </div>
    </div>
  );
}
