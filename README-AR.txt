انسخ الملفات إلى المجلد الرئيسي للموقع واستبدل القديمة.

الدخول:
/alamal-control-7460077.html

البريد الافتراضي:
admin@alamal.com

كلمة السر:
كلمة السر التي أنشأتها داخل Firebase Authentication، مثال: 7460077

ضروري:
1) Authentication > Sign-in method > Email/Password = Enabled
2) Authentication > Users > أضف admin@alamal.com
3) Firestore Database > Rules > الصق محتوى firestore.rules ثم Publish
4) بعد رفع الملفات اضغط Ctrl + Shift + R

لو بريد الأدمن مختلف، غيّر ADMIN_EMAIL داخل admin.js وغيّره داخل firestore.rules.
