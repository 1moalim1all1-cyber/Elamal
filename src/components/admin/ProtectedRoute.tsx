import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import type { AdminUser } from "@/types";

/**
 * يمنع الوصول لأي صفحة إدارية بدون تسجيل دخول صحيح،
 * ويمكن تحديد أدوار معينة مسموح لها فقط بالدخول لصفحة معينة.
 */
export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: AdminUser["role"][];
}) {
  const { firebaseUser, adminProfile, loading, hasPermission } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-ink-500">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
      </div>
    );
  }

  if (!firebaseUser || !adminProfile || !adminProfile.isActive) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles && !hasPermission(allowedRoles)) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-ink-500 text-plaster-100">
        <p className="text-lg font-display">لا تملك صلاحية الوصول لهذه الصفحة</p>
        <p className="text-sm text-ink-100">تواصل مع المدير العام لطلب الصلاحية المناسبة</p>
      </div>
    );
  }

  return <>{children}</>;
}
