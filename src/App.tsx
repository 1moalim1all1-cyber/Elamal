import { Routes, Route } from "react-router-dom";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdminLayout } from "@/components/admin/AdminLayout";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Catalogs from "@/pages/Catalogs";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Gallery from "@/pages/Gallery";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import Contact from "@/pages/Contact";
import { PrivacyPolicy, Terms, NotFound } from "@/pages/StaticPages";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminSections from "@/pages/admin/AdminSections";
import AdminMessages from "@/pages/admin/AdminMessages";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminComingSoon from "@/pages/admin/AdminComingSoon";

// الواجهة العامة للموقع: تحتوي دائمًا على الهيدر والفوتر
function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <SiteSettingsProvider>
      <AdminAuthProvider>
        <Routes>
          {/* ===== الموقع العام ===== */}
          <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
          <Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
          <Route path="/products" element={<SiteLayout><Products /></SiteLayout>} />
          <Route path="/products/:slug" element={<SiteLayout><ProductDetail /></SiteLayout>} />
          <Route path="/catalogs" element={<SiteLayout><Catalogs /></SiteLayout>} />
          <Route path="/projects" element={<SiteLayout><Projects /></SiteLayout>} />
          <Route path="/projects/:slug" element={<SiteLayout><ProjectDetail /></SiteLayout>} />
          <Route path="/gallery" element={<SiteLayout><Gallery /></SiteLayout>} />
          <Route path="/articles" element={<SiteLayout><Articles /></SiteLayout>} />
          <Route path="/articles/:slug" element={<SiteLayout><ArticleDetail /></SiteLayout>} />
          <Route path="/contact" element={<SiteLayout><Contact /></SiteLayout>} />
          <Route path="/privacy-policy" element={<SiteLayout><PrivacyPolicy /></SiteLayout>} />
          <Route path="/terms" element={<SiteLayout><Terms /></SiteLayout>} />

          {/* ===== الإدارة ===== */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="sections" element={<AdminSections />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route
              path="settings"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />
            {/* صفحات الإدارة الباقية (منتجات، مشاريع، وسائط...) قادمة في المرحلة التالية،
                ومؤقتًا بتودي لصفحة "قريبًا" بدل ما تكسر الراوتنج */}
            <Route path="*" element={<AdminComingSoon />} />
          </Route>

          {/* ===== صفحة 404 ===== */}
          <Route path="*" element={<SiteLayout><NotFound /></SiteLayout>} />
        </Routes>
      </AdminAuthProvider>
    </SiteSettingsProvider>
  );
}
