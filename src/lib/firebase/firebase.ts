"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

let app;
let auth;
let db;

export const initFirebase = () => {
  // 🚨 Prevent running during build / server
  if (typeof window === "undefined") {
    return { app: null, auth: null, db: null };
  }

  if (!getApps().length) {
    const firebaseConfig = {
  apiKey: "AIzaSyCKHjENAX2w8JDIWThDiQCaNizJqZvtTe0",
  authDomain: "venueflow-f7093.firebaseapp.com",
  projectId: "venueflow-f7093",
  storageBucket: "venueflow-f7093.appspot.com",
  messagingSenderId: "1035203955615",
  appId: "1:1035203955615:web:74697164ebd0f4e1238baa",
};
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  auth = getAuth(app);
  db = getFirestore(app);

  return { app, auth, db };
};

export { 
  onAuthStateChanged, 
  signOut as firebaseSignOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";

export { doc, setDoc } from "firebase/firestore";