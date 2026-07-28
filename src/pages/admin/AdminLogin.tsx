import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminLogin() {
  const { login, firebaseUser, loading } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && firebaseUser) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      toast.error("بيانات الدخول غير صحيحة");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-500 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl"
      >
        <h1 className="text-center font-display text-2xl font-extrabold text-ink-700">
          لوحة الإدارة
        </h1>
        <p className="mt-1.5 text-center text-sm text-stone">سجّل دخولك للمتابعة</p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink-500">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-plaster-300 px-4 py-2.5 text-sm outline-none focus:border-petrol-500"
              dir="ltr"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink-500">
              كلمة المرور
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-plaster-300 px-4 py-2.5 text-sm outline-none focus:border-petrol-500"
              dir="ltr"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-8 w-full rounded-full bg-petrol-500 py-3 text-sm font-bold text-white hover:bg-petrol-600 disabled:opacity-60"
        >
          {submitting ? "جارٍ التحقق..." : "تسجيل الدخول"}
        </button>
      </form>
    </div>
  );
}
