import { useState } from "react";
import { Archive, Check, MessageCircle } from "lucide-react";
import { useCollection } from "@/hooks/useCollection";
import { messagesService } from "@/services";

export default function AdminMessages() {
  const { items: messages, loading } = useCollection((cb) => messagesService.subscribe(cb));
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const visible = messages
    .filter((m) => !m.isArchived)
    .filter((m) => (filter === "unread" ? !m.isRead : true));

  return (
    <div className="p-6 lg:p-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold text-ink-700">رسائل التواصل</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              filter === "all" ? "bg-petrol-500 text-white" : "bg-white text-ink-500"
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              filter === "unread" ? "bg-petrol-500 text-white" : "bg-white text-ink-500"
            }`}
          >
            غير مقروءة
          </button>
        </div>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-stone">جارٍ التحميل...</p>
      ) : visible.length === 0 ? (
        <p className="mt-8 text-sm text-stone">لا توجد رسائل حاليًا</p>
      ) : (
        <div className="mt-8 space-y-3">
          {visible.map((m) => (
            <div key={m.id} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink-700">
                    {m.name}{" "}
                    {!m.isRead && (
                      <span className="mr-2 rounded-full bg-coral-100 px-2 py-0.5 text-[10px] font-bold text-coral-700">
                        جديدة
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-stone" dir="ltr">{m.phone}</p>
                  {m.reason && <p className="mt-1 text-xs text-petrol-600">{m.reason}</p>}
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${m.phone.replace(/^0/, "20")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-petrol-100 text-petrol-600"
                    aria-label="الرد عبر واتساب"
                  >
                    <MessageCircle size={15} />
                  </a>
                  {!m.isRead && (
                    <button
                      onClick={() => messagesService.update(m.id, { isRead: true })}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-plaster-300 text-ink-500"
                      aria-label="تعليم كمقروءة"
                    >
                      <Check size={15} />
                    </button>
                  )}
                  <button
                    onClick={() => messagesService.update(m.id, { isArchived: true })}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-plaster-300 text-ink-500"
                    aria-label="أرشفة"
                  >
                    <Archive size={15} />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-stone">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
