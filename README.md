# موقع شركة الدهانات — المرحلة الأولى

موقع عربي (RTL) لشركة دهانات، مبني بـ React + Vite + TypeScript + Tailwind CSS + Firebase،
بلوحة إدارة تتحكم في محتوى الصفحة الرئيسية والرسائل والإعدادات العامة فعليًا.

## 🎨 الهوية البصرية

| العنصر | القيمة |
|---|---|
| اللون الأساسي (Petrol) | `#0F5C5A` |
| اللون الداكن (Ink) | `#10242B` |
| لون التمييز (Amber) | `#E8A33D` |
| لون ثانوي (Coral) | `#D9573F` |
| الخلفية (Plaster) | `#F6F1E7` |
| خط العناوين | Almarai |
| خط النصوص | Cairo |
| العنصر البصري المميز | شريط "عينات الألوان" أسفل الهيدر + فواصل على شكل ضربة فرشاة بين الأقسام |

## 🚀 التشغيل محليًا

```bash
npm install
cp .env.example .env   # ثم املأ بيانات Firebase بتاعتك
npm run dev
```

الموقع هيشتغل على: http://localhost:5173

## 🔧 إعداد Firebase (خطوة بخطوة)

1. افتح [Firebase Console](https://console.firebase.google.com) واعمل مشروع جديد.
2. من **Build > Firestore Database**: أنشئ قاعدة بيانات (ابدأ بوضع Test mode مؤقتًا، وحدّث الـ Security Rules قبل الإطلاق الفعلي).
3. من **Build > Authentication**: فعّل طريقة الدخول Email/Password، وأنشئ أول مستخدم إداري يدويًا.
4. أضف مستند لنفس الـ UID بتاع المستخدم ده في Collection اسمها `adminUsers` بالشكل:
   ```json
   { "email": "you@example.com", "displayName": "المدير العام", "role": "super_admin", "isActive": true }
   ```
5. من **Project Settings > General**: انسخ بيانات الاتصال (apiKey, authDomain...) وحطها في ملف `.env`.
6. (اختياري) شغّل `node scripts/seed.mjs` لتعبئة تصنيفات وأقسام الصفحة الرئيسية تلقائيًا — راجع التعليمات داخل الملف.

## 📁 هيكل المشروع

```
src/
  types/           تعريفات كل أنواع البيانات (Product, Project, Article...)
  lib/firebase.ts  إعداد الاتصال بـ Firebase
  services/        طبقة التعامل مع Firestore (CRUD عام + خدمات مخصصة لكل نوع بيانات)
  hooks/           useCollection — Hook عام للاشتراك اللحظي بأي Collection
  context/         SiteSettingsContext (إعدادات الموقع) + AdminAuthContext (تسجيل الدخول والصلاحيات)
  components/
    layout/        الهيدر، الفوتر، قائمة الموبايل
    home/           أقسام الصفحة الرئيسية
    ui/             مكونات قابلة لإعادة الاستخدام (كارت منتج، فاصل بصري، رأس صفحة)
    admin/          حماية المسارات وهيكل لوحة الإدارة
  pages/            كل صفحات الموقع العام
  pages/admin/      كل صفحات لوحة الإدارة
  data/demoData.ts  بيانات تجريبية (Fallback فقط قبل ربط Firebase، ومصدر لسكريبت الـ Seed)
scripts/seed.mjs   سكريبت تعبئة أولية لقاعدة البيانات
```

## ✅ الحالة الحالية (المرحلة الأولى)

**شغّال ومربوط فعليًا بقاعدة البيانات:**
- الصفحة الرئيسية بكل أقسامها، وترتيب/إظهار الأقسام يتحكم فيه من `/admin/sections`
- تسجيل دخول الإدارة + حماية المسارات + نظام صلاحيات (super_admin / admin / content_editor / products_manager / messages_viewer)
- نموذج تواصل معنا يحفظ الرسائل في Firestore، وتظهر فورًا في `/admin/messages`
- الإعدادات العامة (اسم الشركة، الهاتف، واتساب، مواعيد العمل...) من `/admin/settings` وتنعكس في الهيدر والفوتر وصفحة التواصل فورًا
- كل صفحات العرض العام: المنتجات (بحث+فلترة)، تفاصيل المنتج، الكتالوجات، المشاريع، معرض الصور، المقالات، الصفحات الثابتة

**بيانات تجريبية:** موجودة كـ Fallback في `src/data/demoData.ts` — تظهر تلقائيًا لو الـ Collections لسه فاضية في Firestore، وتختفي بمجرد إضافة بيانات حقيقية.

## 🔜 المرحلة القادمة (لسه محتاجة تُبنى)

- شاشات إدارة CRUD كاملة لكل من: المنتجات، تصنيفات المنتجات، المشاريع، الكتالوجات، معرض الصور، المقالات، آراء العملاء، السلايدر
- Media Library مع رفع صور حقيقي (Firebase Storage) وضغط تلقائي وتحويل WebP
- محرر Rich Text للمقالات
- إدارة الهيدر/الفوتر/القوائم/بيانات التواصل بشكل كامل من الإدارة
- صفحة إعدادات التصميم والألوان مع معاينة حية
- إدارة المستخدمين والصلاحيات (إضافة/حذف مدير)
- النسخ الاحتياطي وسجل العمليات (البنية الأساسية لسجل العمليات جاهزة في `activityLogService.ts`)
- دعم اللغة الإنجليزية (i18n)
- تحسينات SEO لكل صفحة (meta tags ديناميكية)، وربط Google Analytics / Facebook Pixel

## 🌐 النشر على GitHub Pages

المشروع مجهّز بالفعل لده (`base: "/"` في vite.config.ts + حيلة 404.html للراوتنج). الخطوات:

```bash
# 1) أول مرة بس: اعمل مستودع فاضي على GitHub باسم paint-company-site
git init
git add .
git commit -m "أول نسخة من الموقع"
git branch -M main
git remote add origin https://github.com/USERNAME/paint-company-site.git
git push -u origin main

# 2) تأكد إن .env فيه بيانات Firebase الحقيقية بتاعتك محليًا (مش هترفعه على Git)

# 3) انشر
npm install
npm run deploy
```

`npm run deploy` بيعمل build ثم يرفع محتوى `dist` تلقائيًا على فرع `gh-pages` (عن طريق حزمة `gh-pages`).

بعد كده من إعدادات المستودع على GitHub:
**Settings > Pages > Source** اختار فرع `gh-pages` والمجلد `/ (root)`.

بما إنك هتربط دومين مخصص بعدين (زي مشروعك "الدليل الشامل")، لما يجيلك الوقت:
1. من نفس صفحة **Settings > Pages** حط الدومين تحت "Custom domain" — ده هيولّد ملف `CNAME` تلقائيًا جوه فرع `gh-pages`.
2. من Cloudflare (أو أي مزود DNS): أضف CNAME record بيشاور على `USERNAME.github.io`.
3. لو الدومين تحت Cloudflare، خلي وضع الـ Proxy "DNS only" مؤقتًا لحد ما GitHub يفعّل HTTPS بنجاح، وبعدين رجّعه Proxied لو حابب.

⚠️ إلى أن تربط الدومين، لو حبيت تجرب الرابط الافتراضي `USERNAME.github.io/paint-company-site` غيّر مؤقتًا `base` في `vite.config.ts` إلى `"/paint-company-site/"` قبل عمل `npm run deploy`، وارجعها `"/"` تاني بعد ربط الدومين.

## ⚠️ ملاحظات مهمة قبل الإطلاق الفعلي

- حدّث **Firestore Security Rules** بحيث القراءة عامة للمحتوى المنشور فقط، والكتابة مقصورة على المستخدمين الإداريين المصرح لهم — الإعداد الحالي افتراضي لأغراض التطوير.
- لا ترفع ملف `.env` أو `serviceAccountKey.json` على أي مستودع عام (موجودين في `.gitignore`).
- راجع صلاحيات كل دور إداري (`AdminRole`) وفعّلها فعليًا في الواجهات قبل تسليم المشروع لعملاء حقيقيين.
