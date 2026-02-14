// FIX: Changed to a namespace import to handle potential module resolution issues.
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration for the life planner application
const firebaseConfig = {
  apiKey: "AIzaSyBXEZV0IEvptAPK4gB-FAZpImlkPv7jhLI",
  authDomain: "lhsnapp-921d5.firebaseapp.com",
  projectId: "lhsnapp-921d5",
  storageBucket: "lhsnapp-921d5.firebasestorage.app",
  messagingSenderId: "257181826809",
  appId: "1:257181826809:web:0ff31e6a82126f79736c28",
  measurementId: "G-1NPP69DTLP"
};

// FIX: Use initializeApp from the namespace import.
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
