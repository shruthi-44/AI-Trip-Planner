// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmTPEfEznqvO7meMfP8kSCgMU6-DzzrZo",
  authDomain: "trip-planner-c8398.firebaseapp.com",
  projectId: "trip-planner-c8398",
  storageBucket: "trip-planner-c8398.firebasestorage.app",
  messagingSenderId: "567813117382",
  appId: "1:567813117382:web:9bec536e8c18de4a934ec7",
  measurementId: "G-B1HSDY0ZHC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
