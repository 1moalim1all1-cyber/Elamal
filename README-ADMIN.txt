تشغيل لوحة التحكم
==================
1) افتح admin.html. في وضع التجربة يمكنك كتابة أي بريد وكلمة سر 6 أحرف أو أكثر. التعديلات تُحفظ على نفس الجهاز فقط.

للربط الفعلي بـ Firebase:
1) أنشئ مشروعًا في Firebase Console ثم أضف Web App.
2) انسخ firebaseConfig داخل ملف firebase-config.js.
3) فعّل Authentication > Email/Password وأنشئ مستخدم الأدمن بالبريد وكلمة السر.
4) أنشئ Firestore Database ثم ضع محتوى firestore.rules في Rules وانشره.
5) فعّل Storage ثم ضع محتوى storage.rules في Rules وانشره.
6) ارفع الملفات على GitHub Pages أو الاستضافة. ادخل من /admin.html.

مهم: لا تضع كلمة السر داخل ملفات الموقع. المستخدم يُنشأ من Firebase Authentication فقط.
