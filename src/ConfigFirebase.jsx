import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyC7RJ26cGUPY8rMYS4C9uH3_FaauN1UyD4",
  authDomain: "social-media-app-94952.firebaseapp.com",
  projectId: "social-media-app-94952",
  storageBucket: "social-media-app-94952.appspot.com",
  messagingSenderId: "568907653998",
  appId: "1:568907653998:web:4ec8649eb41409d493177f",
  measurementId: "G-1Q09LWNG6N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app)


export { auth, provider,db};
