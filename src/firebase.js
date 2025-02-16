// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get, push, update, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCz5QwKrabwUI7VM5ZpuxxKzxaydjqryKQ",
  authDomain: "qrmerit.firebaseapp.com",
  projectId: "qrmerit",
  databaseURL: "https://qrmerit-default-rtdb.asia-southeast1.firebasedatabase.app/",
  messagingSenderId: "563399174707",
  appId: "1:563399174707:web:e9b5756a1a51c8981a1146",
  measurementId: "G-MNWHLLJBBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
export { db, ref, get, push, update, onValue };