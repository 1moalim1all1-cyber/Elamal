لوحة الإدارة: alamal-control-7460077.html

هذه النسخة تعمل بدون Firebase Storage نهائيًا.

المطلوب فقط:
1- تفعيل Email/Password من Firebase Authentication.
2- إنشاء مستخدم أدمن بالبريد وكلمة المرور.
3- نشر firestore.rules من Firebase Console.

طريقة إضافة الصور:
- ارفع الصورة داخل مجلد assets في المشروع، ثم اكتب مسارها مثل: assets/product-1.jpg
- أو ضع رابط صورة مباشر يبدأ بـ https://

مهم:
- لا تستخدم صور Base64 داخل Firestore حتى لا تتجاوز حد حجم المستند.
- بعد إضافة صورة جديدة إلى مجلد assets يجب رفع ملفات المشروع إلى الاستضافة مرة أخرى.
- افتح المشروع من HTTP/HTTPS وليس file:// لأن JavaScript Modules تحتاج سيرفر.
