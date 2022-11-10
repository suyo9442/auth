import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, onSnapshot, query } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUR_ID
  };

const app = initializeApp(firebaseConfig);

const authService = getAuth();
const dbService = getFirestore(app);

export {
  authService, 
  dbService,
  collection,
  addDoc,
  getDocs,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  doc,
  onSnapshot,
  query,
};
