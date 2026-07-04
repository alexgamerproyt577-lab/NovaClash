import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import resultados from "./resultados.js";

/* =========================
   FIREBASE CONFIG
========================= */

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

/* =========================
   CALCULAR RANKING
========================= */

async function cargarRanking() {

  const contenedor = document.getElementById("ranking");
  if (!contenedor) return;

  contenedor.innerHTML = "<p>Cargando ranking...</p>";

  const snap = await getDocs(collection(db, "predicciones"));

  const jugadores = {};

  snap.forEach(doc => {

    const data = doc.data();
    const nombre = data.nombre;

    if (!jugadores[nombre]) {
      jugadores[nombre] = 0;
    }

console.log(JSON.stringify(data, null, 2));

if (!data.predicciones) {
  console.log("Documento sin predicciones:", data);
  return;
}
    
   data.predicciones.forEach(p => {

  const real = resultados[p.partido];

  if (!real) return;

  let puntos = 0;

  // +2 si acertó el ganador
  if (p.ganador === real.ganador) {
    puntos += 2;

    // +1 SOLO si además acertó el marcador
    if (p.resultado === real.resultado) {
      puntos += 1;
    }
  }

  jugadores[nombre] += puntos;

});

  });

  const ordenados = Object.entries(jugadores)
    .sort((a, b) => b[1] - a[1]);

  contenedor.innerHTML = "";

  ordenados.forEach((j, i) => {

    contenedor.innerHTML += `
      <div class="partido">
        <h2>#${i + 1} ${j[0]}</h2>
        <p>Puntos: <b>${j[1]}</b></p>
      </div>
      <br>
    `;

  });

  if (ordenados.length === 0) {
    contenedor.innerHTML = "<p>No hay predicciones aún.</p>";
  }

}

/* =========================
   INICIAR
========================= */

cargarRanking();
