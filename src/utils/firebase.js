// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXhBgIOS5CDwecp2oV5nXUy8MTnsxaung",
  authDomain: "netflixgpp-aa315.firebaseapp.com",
  projectId: "netflixgpp-aa315",
  storageBucket: "netflixgpp-aa315.firebasestorage.app",
  messagingSenderId: "39711068469",
  appId: "1:39711068469:web:a475532044bcdd00b0fc7c",
  measurementId: "G-F1YSS4N916"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
