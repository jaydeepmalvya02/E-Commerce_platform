// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rabbit-85846.firebaseapp.com",
  projectId: "rabbit-85846",
  storageBucket: "rabbit-85846.firebasestorage.app",
  messagingSenderId: "202674676952",
  appId: "1:202674676952:web:3031730089530ec0ce23ad",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
