لوحة إدارة الأمل للدهانات – النسخة الكاملة
=========================================

المحتويات:
- تسجيل دخول Firebase Email/Password.
- إدارة الصفحة الرئيسية.
- إدارة المنتجات: إضافة، تعديل، حذف، صورة، تصنيف، لون، حجم، وصف، مميزات، استخدام، مواصفات وحالة الظهور.
- إدارة المشروعات.
- إدارة آراء العملاء.
- إدارة بيانات التواصل والسوشيال وSEO.
- رفع الصور إلى Firebase Storage.
- حفظ البيانات داخل Cloud Firestore.
- ملف site-content.js لقراءة البيانات في صفحات الموقع العامة.

طريقة التركيب:
1) انسخ الملفات التالية إلى المجلد الرئيسي للموقع:
   alamal-control-7460077.html
   admin.css
   admin.js
   firebase-config.js
   site-content.js

2) افتح Firebase Console:
   Authentication > Sign-in method > فعّل Email/Password.
   Authentication > Users > أنشئ:
   admin@alamal.com
   وكلمة السر التي تريدها، مثل: 7460077

3) افتح Firestore Database > Rules:
   انسخ محتوى firestore.rules واضغط Publish.

4) افتح Storage > Rules:
   انسخ محتوى storage.rules واضغط Publish.

5) ادخل إلى لوحة الإدارة من:
   /alamal-control-7460077.html

6) لربط صفحات الموقع العامة:
   أضف قبل إغلاق body في كل صفحة:
   <script type="module" src="./site-content.js"></script>

   وللنصوص الأساسية استخدم مثلًا:
   <h1 data-content="heroTitle">العنوان الافتراضي</h1>
   <p data-content="heroDescription">الوصف الافتراضي</p>
   <img data-image="heroImage" src="...">
   <a data-link="whatsapp">واتساب</a>

مهم:
- لوحة الإدارة نفسها كاملة وجاهزة.
- ظهور المنتجات والمشروعات وآراء العملاء داخل تصميم الموقع الحالي يحتاج وضع حاويات العرض المناسبة في صفحات الموقع، لأن شكل ملفات الموقع العامة غير موجود داخل هذه الحزمة.
- لا تفتح ملف HTML مباشرة من الكمبيوتر. افتحه من GitHub Pages أو استضافة تدعم HTTPS.
- بعد رفع أي تعديل استخدم Ctrl + Shift + R.
