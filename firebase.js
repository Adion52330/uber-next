// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcPZTG20lueLTW_4ZPddaVcSITOqtBEj0",
  authDomain: "uber-next-clone-73a0b.firebaseapp.com",
  projectId: "uber-next-clone-73a0b",
  storageBucket: "uber-next-clone-73a0b.appspot.com",
  messagingSenderId: "473790665356",
  appId: "1:473790665356:web:5c91dd6f7b51c2cda7e1a9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth, onAuthStateChanged };
