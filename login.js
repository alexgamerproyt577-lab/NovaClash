import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import { auth } from "./firebase.js";

window.login = async function () {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {

    alert("Completa todos los campos.");
    return;

  }

  try {

    await signInWithEmailAndPassword(auth, email, password);

    window.location.href = "panel.html";

  } catch (error) {

    console.error(error);

    alert("Correo o contraseña incorrectos.");

  }

};
