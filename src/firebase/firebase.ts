// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFV8VkHJpJeFGmbDSoTxP_EknnJuKxziQ",
  authDomain: "hemmelignisse-b53fb.firebaseapp.com",
  projectId: "hemmelignisse-b53fb",
  storageBucket: "hemmelignisse-b53fb.firebasestorage.app",
  messagingSenderId: "157830378632",
  appId: "1:157830378632:web:8aebf46023685b3bf85b3d",
  measurementId: "G-4GE6HMG2N8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const firebaseConfigForScript = firebaseConfig;
