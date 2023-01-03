import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC8U6El-RUIOxfEbFmH-09DQVxFpN4Lts4",
  authDomain: "learn-firebase-4910d.firebaseapp.com",
  projectId: "learn-firebase-4910d",
  storageBucket: "learn-firebase-4910d.appspot.com",
  messagingSenderId: "234827646446",
  appId: "1:234827646446:web:a4e10867b7fb535822baff",
  measurementId: "G-B56HKVZ03T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// init services
export const db = getFirestore(app);
export const auth = getAuth(app);