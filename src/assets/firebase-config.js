import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArUSdjZOqgrTh7W6Yn2mi17H6HdxW_M50",
  authDomain: "ddf-website-project.firebaseapp.com",
  projectId: "ddf-website-project",
  storageBucket: "ddf-website-project.appspot.com",
  messagingSenderId: "347273855961",
  appId: "1:347273855961:web:3969f8213b57366545cfc8",
  measurementId: "G-SVW4RCZLG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

