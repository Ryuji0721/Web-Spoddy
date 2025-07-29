import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzaJ2ARWuKZYLBxN_50eHrWcqHtv3yolc",
  authDomain: "spoddymyapp.firebaseapp.com",
  projectId: "spoddymyapp",
  storageBucket: "spoddymyapp.firebasestorage.app",
  messagingSenderId: "590633078134",
  appId: "1:590633078134:web:55c119ba91935d64253e57",
  measurementId: "G-SPBQE6L7ZK"
};
// Firebaseの初期化
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firestoreの初期化
export const db = getFirestore(app);
export const auth = getAuth(app);

