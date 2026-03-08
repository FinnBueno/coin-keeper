// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "coin-keeper-6b5b0.firebaseapp.com",
  databaseURL:
    "https://coin-keeper-6b5b0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "coin-keeper-6b5b0",
  storageBucket: "coin-keeper-6b5b0.firebasestorage.app",
  messagingSenderId: "403994790419",
  appId: "1:403994790419:web:ae97cef58bf967ff5e8de6",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
