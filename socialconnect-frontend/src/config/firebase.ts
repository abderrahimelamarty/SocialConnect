// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkxOYdB1wu-5hq1Exw4eZC8bhGoq5z9Fg",
  authDomain: "socialconnect-ef622.firebaseapp.com",
  projectId: "socialconnect-ef622",
  storageBucket: "socialconnect-ef622.appspot.com",
  messagingSenderId: "930783003473",
  appId: "1:930783003473:web:472d6f641479500ca60970",
  measurementId: "G-NJRQ7YRS2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);