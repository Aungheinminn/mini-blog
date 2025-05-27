// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDANHcpy5Ald7cNewlt3kjTpjaBtd3v9wM",
  authDomain: "sample-blog-5e740.firebaseapp.com",
  projectId: "sample-blog-5e740",
  storageBucket: "sample-blog-5e740.firebasestorage.app",
  messagingSenderId: "1057641885641",
  appId: "1:1057641885641:web:d7bb916b48899420c14218",
  measurementId: "G-626JKFBNS9",
};

// Initialize Firebase
// Initialize Firebase App
export const app = initializeApp(firebaseConfig);
// Initialize Analytics (ensure this runs in the browser)
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
// Initialize Auth
export const auth = getAuth(app);
// Initialize Firestore
export const db = getFirestore(app);

