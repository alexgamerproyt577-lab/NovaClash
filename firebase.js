import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCULLdWfSlZL2vNetwknkaEOj5fAsIIr6o",
  authDomain: "nova-clash-8c78b.firebaseapp.com",
  projectId: "nova-clash-8c78b",
  storageBucket: "nova-clash-8c78b.firebasestorage.app",
  messagingSenderId: "202679377197",
  appId: "1:202679377197:web:b5ed1526028cac92aa07a4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
window.collection = collection;
window.addDoc = addDoc;
