تشغيل رفع الصور بدون Firebase Storage
=====================================

المشروع يستخدم:
- Firebase Authentication: دخول الأدمن
- Firestore: حفظ النصوص وروابط الصور
- Cloudinary: رفع وحفظ الصور

الخطوات:
1) أنشئ حسابًا على Cloudinary.
2) انسخ Cloud Name من لوحة Cloudinary.
3) افتح Settings ثم Upload ثم Upload Presets.
4) أنشئ Upload Preset جديدًا واجعل Signing Mode = Unsigned.
5) يفضل وضع Asset folder باسم elamal-site.
6) افتح ملف cloudinary-config.js واكتب:

cloudName: 'اسم Cloud Name'
uploadPreset: 'اسم الـ Upload Preset'

7) لا تضع API Secret أو API Key داخل ملفات الموقع.
8) ارفع ملفات المشروع على GitHub/الاستضافة.
9) افتح alamal-control-7460077.html وسجل دخول الأدمن.
10) اضغط "اختيار صورة ورفعها" ثم احفظ كل التعديلات.

ملاحظات:
- الحد الحالي للصورة الواحدة 8MB.
- الصيغ المقبولة: JPG, PNG, WEBP, GIF.
- Firestore يحفظ رابط الصورة فقط، وليس ملف الصورة.
- حذف عنصر من لوحة الإدارة لا يحذف الصورة تلقائيًا من Cloudinary.
