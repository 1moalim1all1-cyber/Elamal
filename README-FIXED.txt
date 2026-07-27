نسخة منقحة من موقع الأمل للدهانات

تم إصلاح:
- ملف Firebase وربط firebaseEnabled.
- صفحة الإدارة وتسجيل الدخول بالبريد الإلكتروني.
- تحذير autocomplete في كلمة السر.
- خطأ favicon.ico 404 باستخدام أيقونة مدمجة.
- رفع صورة الواجهة وصورة قسم من نحن وصور المنتجات والمشروعات.
- إضافة وحذف المنتجات والمشروعات وآراء العملاء.
- الحفظ في Firestore وFirebase Storage.
- فحص كل ملفات JavaScript نحويًا.

طريقة الرفع:
1. انسخ كل الملفات والمجلد assets إلى مستودع GitHub مكان النسخة القديمة.
2. لا ترفع مجلد .git الموجود في جهاز آخر.
3. نفذ: git add .
4. نفذ: git commit -m "Fix complete website and admin"
5. نفذ: git pull --rebase origin main
6. في حالة عدم وجود تعارض نفذ: git push origin main
7. انتظر GitHub Pages ثم افتح الصفحة واضغط Ctrl+Shift+R.

مهم لتسجيل الدخول:
يجب إنشاء مستخدم الأدمن في Firebase Console > Authentication > Users بنفس البريد وكلمة السر اللذين ستستخدمهما.
