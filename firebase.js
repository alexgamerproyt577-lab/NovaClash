import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCULLdWfSlZL2vNetwknkaEOj5fAsIIr6o",
    authDomain: "nova-clash-8c78b.firebaseapp.com",
    projectId: "nova-clash-8c78b",
    storageBucket: "nova-clash-8c78b.firebasestorage.app",
    messagingSenderId: "202679377197",
    appId: "1:202679377197:web:b5ed1526028cac92aa07a4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Authentication
export const auth = getAuth(app);
