import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDpNu-IH4nHcuqCY5ejW1570fhrrWdj3Dc",
  authDomain: "monkey-blogging-f88cf.firebaseapp.com",
  projectId: "monkey-blogging-f88cf",
  storageBucket: "monkey-blogging-f88cf.appspot.com",
  messagingSenderId: "716151895036",
  appId: "1:716151895036:web:9fd02f6480b75a2e8db879"
};

const app = initializeApp(firebaseConfig);

// init services
export const db = getFirestore(app);
export const auth = getAuth(app);
