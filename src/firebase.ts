// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDANHcpy5Ald7cNewlt3kjTpjaBtd3v9wM",
  authDomain: "sample-blog-5e740.firebaseapp.com",
  projectId: "sample-blog-5e740",
  storageBucket: "sample-blog-5e740.firebasestorage.app",
  messagingSenderId: "1057641885641",
  appId: "1:1057641885641:web:d7bb916b48899420c14218",
  measurementId: "G-626JKFBNS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Analytics (ensure this runs in the browser)
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, analytics };