// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_YQf3OeIGegF6UtPOYj4cdRhL-fQb4w4",
  authDomain: "movie-gpt-ebe12.firebaseapp.com",
  projectId: "movie-gpt-ebe12",
  storageBucket: "movie-gpt-ebe12.firebasestorage.app",
  messagingSenderId: "457297918463",
  appId: "1:457297918463:web:8b951d4790be90eb058fca",
  measurementId: "G-P3RH038JNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);