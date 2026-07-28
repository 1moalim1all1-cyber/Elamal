import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { AdminUser } from "@/types";
import { logActivity } from "@/services/activityLogService";

interface AdminAuthState {
  firebaseUser: User | null;
  adminProfile: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (roles: AdminUser["role"][]) => boolean;
}

const AdminAuthContext = createContext<AdminAuthState | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        // بيانات الدور والصلاحيات مخزنة في مستند منفصل adminUsers/{uid}
        // وليس فقط في Firebase Auth، عشان نقدر نتحكم في الصلاحيات بمرونة
        const profileSnap = await getDoc(doc(db, "adminUsers", user.uid));
        setAdminProfile(
          profileSnap.exists()
            ? ({ id: profileSnap.id, ...profileSnap.data() } as AdminUser)
            : null
        );
      } else {
        setAdminProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await logActivity(email, "login", "auth", cred.user.uid);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const hasPermission = (roles: AdminUser["role"][]) => {
    if (!adminProfile || !adminProfile.isActive) return false;
    if (adminProfile.role === "super_admin") return true;
    return roles.includes(adminProfile.role);
  };

  return (
    <AdminAuthContext.Provider
      value={{ firebaseUser, adminProfile, loading, login, logout, hasPermission }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
