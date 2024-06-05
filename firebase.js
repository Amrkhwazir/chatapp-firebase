import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, onSnapshot, getDoc, query, where, getDocs, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCFpbWwmh09YMwo8EE7MGeg9KAVN5naHcs",
  authDomain: "signup-form-cadc3.firebaseapp.com",
  projectId: "signup-form-cadc3",
  storageBucket: "signup-form-cadc3.appspot.com",
  messagingSenderId: "219653567561",
  appId: "1:219653567561:web:a6c333de827309adcc3b98",
  databaseURL: "https://signup-form-cadc3-default-rtdb.asia-southeast1.firebasedatabase.app",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export {db, auth, setDoc, doc, onSnapshot, createUserWithEmailAndPassword, onAuthStateChanged, getDoc, signOut, query, where, getDocs, collection }