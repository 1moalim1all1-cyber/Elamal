import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const ADMIN_EMAIL = "admin@alamal.com";
const loginView = document.getElementById("loginView");
const dashboardView = document.getElementById("dashboardView");
const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");
const logoutButton = document.getElementById("logoutButton");
const adminEmailLabel = document.getElementById("adminEmailLabel");
const settingsForm = document.getElementById("settingsForm");
const saveMessage = document.getElementById("saveMessage");

function showLogin() {
  loginView.hidden = false;
  dashboardView.hidden = true;
}

function showDashboard(user) {
  loginView.hidden = true;
  dashboardView.hidden = false;
  adminEmailLabel.textContent = user.email || "";
  loadSettings();
}

function readableAuthError(error) {
  const messages = {
    "auth/invalid-credential": "البريد الإلكتروني أو كلمة السر غير صحيحة.",
    "auth/user-not-found": "المستخدم غير موجود في Firebase Authentication.",
    "auth/wrong-password": "كلمة السر غير صحيحة.",
    "auth/invalid-email": "صيغة البريد الإلكتروني غير صحيحة.",
    "auth/operation-not-allowed": "فعّل Email/Password من Authentication ثم Sign-in method.",
    "auth/too-many-requests": "تمت محاولات كثيرة. انتظر قليلًا ثم أعد المحاولة.",
    "auth/network-request-failed": "مشكلة في الاتصال بالإنترنت."
  };
  return messages[error?.code] || `حدث خطأ: ${error?.code || error?.message}`;
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginMessage.textContent = "";
  loginButton.disabled = true;
  loginButton.textContent = "جارٍ الدخول...";

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    if ((credential.user.email || "").toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      await signOut(auth);
      throw new Error("هذا الحساب غير مصرح له بالدخول إلى الإدارة.");
    }
  } catch (error) {
    console.error("Login error:", error);
    loginMessage.textContent = error.message === "هذا الحساب غير مصرح له بالدخول إلى الإدارة."
      ? error.message
      : readableAuthError(error);
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "تسجيل الدخول";
  }
});

logoutButton.addEventListener("click", () => signOut(auth));

onAuthStateChanged(auth, async (user) => {
  if (!user) return showLogin();
  if ((user.email || "").toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    await signOut(auth);
    return showLogin();
  }
  showDashboard(user);
});

async function loadSettings() {
  saveMessage.textContent = "جارٍ تحميل البيانات...";
  try {
    const snapshot = await getDoc(doc(db, "site", "settings"));
    if (snapshot.exists()) {
      const data = snapshot.data();
      ["siteName", "phone", "whatsapp", "factoryAddress", "facebook", "instagram", "tiktok", "youtube"].forEach((id) => {
        document.getElementById(id).value = data[id] || "";
      });
    }
    saveMessage.textContent = "";
  } catch (error) {
    console.error("Load settings error:", error);
    saveMessage.textContent = "تعذر تحميل البيانات. راجع Firestore Rules.";
  }
}

settingsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  saveMessage.textContent = "جارٍ الحفظ...";

  const data = {};
  ["siteName", "phone", "whatsapp", "factoryAddress", "facebook", "instagram", "tiktok", "youtube"].forEach((id) => {
    data[id] = document.getElementById(id).value.trim();
  });
  data.updatedAt = serverTimestamp();

  try {
    await setDoc(doc(db, "site", "settings"), data, { merge: true });
    saveMessage.textContent = "تم حفظ البيانات بنجاح.";
  } catch (error) {
    console.error("Save settings error:", error);
    saveMessage.textContent = "فشل الحفظ. راجع Firestore Rules.";
  }
});
