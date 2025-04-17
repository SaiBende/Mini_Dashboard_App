// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCADOcCM86Ssov7Yj3Cm-4kagv_pS1jFog",
  authDomain: "mini-saas-dashboard.firebaseapp.com",
  projectId: "mini-saas-dashboard",
  storageBucket: "mini-saas-dashboard.firebasestorage.app",
  messagingSenderId: "775598559813",
  appId: "1:775598559813:web:c985a05a891c5e4812892c",
  measurementId: "G-CJE8B8LCCS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//Initialize FireStore
export const db = getFirestore(app);
//const analytics = getAnalytics(app);