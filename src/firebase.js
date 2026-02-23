import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAlKxQh59Yi3Mfh-TlfK1ditlZLrCt2_Y",
  authDomain: "mark-web-da527.firebaseapp.com",
  projectId: "mark-web-da527",
  storageBucket: "mark-web-da527.firebasestorage.app",
  messagingSenderId: "575726500437",
  appId: "1:575726500437:web:24354841e4ff065f05f2dc",
  measurementId: "G-2PLS144MGD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

export default app;
