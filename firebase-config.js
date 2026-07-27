const firebaseConfig = {
  apiKey: "AIzaSyAJTOIvwirrWrli24x07PCyGKqG5LJAPJE",
  authDomain: "alamal-86bd1.firebaseapp.com",
  projectId: "alamal-86bd1",
  storageBucket: "alamal-86bd1.firebasestorage.app",
  messagingSenderId: "487151122464",
  appId: "1:487151122464:web:b3c8e416a9072bdf6e2445",
  measurementId: "G-9YW4WXEJFJ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();