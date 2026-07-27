import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJTOIvwirrWrli24x07PCyGKqG5LJAPJE",
  authDomain: "alamal-86bd1.firebaseapp.com",
  projectId: "alamal-86bd1",
  storageBucket: "alamal-86bd1.firebasestorage.app",
  messagingSenderId: "487151122464",
  appId: "1:487151122464:web:b3c8e416a9072bdf6e2445",
  measurementId: "G-9YW4WXEJFJ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
