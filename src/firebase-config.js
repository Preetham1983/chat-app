// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9JvLGO0xgrvdjCCy6Y7V0j654Ll6PNxk",
  authDomain: "chatapp-288ac.firebaseapp.com",
  projectId: "chatapp-288ac",
  storageBucket: "chatapp-288ac.appspot.com",
  messagingSenderId: "907389863390",
  appId: "1:907389863390:web:ff29f713daafd26ccf494f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db = getFirestore(app);
export const provider= new GoogleAuthProvider();
