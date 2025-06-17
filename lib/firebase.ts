// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzaJ2ARWuKZYLBxN_50eHrWcqHtv3yolc",
  authDomain: "spoddymyapp.firebaseapp.com",
  projectId: "spoddymyapp",
  storageBucket: "spoddymyapp.firebasestorage.app",
  messagingSenderId: "590633078134",
  appId: "1:590633078134:web:55c119ba91935d64253e57",
  measurementId: "G-SPBQE6L7ZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);