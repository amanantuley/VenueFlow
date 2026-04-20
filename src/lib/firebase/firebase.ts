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
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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