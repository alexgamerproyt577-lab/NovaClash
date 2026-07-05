import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "./firebase.js";
import { equiposBloque1, equiposBloque2 } from "./equipos.js";

/* =========================
   CONFIG
========================= */

let bloqueActivo = 1;

const partidos =
  bloqueActivo === 1
    ? equiposBloque1
    : equiposBloque2;

const contenedor = document.getElementById("adminPartidos");

/* =========================
   RENDER PARTIDOS
========================= */

partidos.forEach((p, i) => {

  contenedor.innerHTML += `
    <div class="partido">

      <h2>Partido ${i + 1}</h2>

      <label>
        <input type="radio" name="g${i}" value="${p[0]}">
        ${p[0]}
      </label>

      <label>
        <input type="radio" name="g${i}" value="${p[1]}">
        ${p[1]}
      </label>

      <br><br>

      <label>
        <input type="radio" name="r${i}" value="2-0">
        2-0
      </label>

      <label>
        <input type="radio" name="r${i}" value="2-1">
        2-1
      </label>

    </div>
    <br>
  `;
});

contenedor.innerHTML += `
  <button onclick="guardarResultados()">
    Guardar Resultados
  </button>
`;

/* =========================
   GUARDAR RESULTADOS
========================= */

async function guardarResultados() {

  for (let i = 0; i < partidos.length; i++) {

    const ganador = document.querySelector(`input[name="g${i}"]:checked`);
    const resultado = document.querySelector(`input[name="r${i}"]:checked`);

    if (!ganador || !resultado) continue;

    await setDoc(doc(db, "resultados", `partido${i + 1}`), {
      partido: i + 1,
      ganador: ganador.value,
      resultado: resultado.value
    });
  }

  // 🔥 AVANZAR RONDA AUTOMÁTICAMENTE
  await generarSiguienteRonda();

  alert("✔ Resultados guardados y ronda actualizada");
}

window.guardarResultados = guardarResultados;

/* =========================
   GENERAR SIGUIENTE RONDA
========================= */

async function generarSiguienteRonda() {

  const ref = doc(db, "configuracion", "llave");
  const snap = await getDoc(ref);

  let ronda = snap.exists() ? snap.data().ronda : 1;

  const resultadosSnap = await getDocs(collection(db, "resultados"));

  let partidosOrdenados = [];

  resultadosSnap.forEach(d => {
    partidosOrdenados.push(d.data());
  });

  partidosOrdenados.sort((a, b) => a.partido - b.partido);

  let nuevaRonda = [];

  for (let i = 0; i < partidosOrdenados.length; i += 2) {

    const p1 = partidosOrdenados[i];
    const p2 = partidosOrdenados[i + 1];

    if (!p1 || !p2) continue;

    nuevaRonda.push([
      p1.ganador,
      p2.ganador
    ]);
  }

  await setDoc(ref, {
    ronda: ronda + 1,
    partidos: nuevaRonda
  });
}

/* =========================
   ESTADO PREDICCIONES
========================= */

async function guardarEstado() {

  const abierto = document.getElementById("estadoPredicciones").checked;

  await setDoc(doc(db, "configuracion", "predicciones"), {
    abiertas: abierto
  });

  alert("Estado actualizado.");
}

async function cargarEstado() {

  const snap = await getDoc(doc(db, "configuracion", "predicciones"));

  if (snap.exists()) {
    document.getElementById("estadoPredicciones").checked =
      snap.data().abiertas;
  }
}

window.guardarEstado = guardarEstado;

/* =========================
   BLOQUE ACTIVO
========================= */

async function guardarBloque() {

  const bloque = Number(
    document.getElementById("bloqueActivo").value
  );

  await setDoc(doc(db, "configuracion", "torneo"), {
    bloqueActivo: bloque
  });

  alert("Bloque actualizado.");
}

async function cargarBloque() {

  const snap = await getDoc(doc(db, "configuracion", "torneo"));

  if (!snap.exists()) return;

  document.getElementById("bloqueActivo").value =
    snap.data().bloqueActivo;
}

window.guardarBloque = guardarBloque;

/* =========================
   INICIO
========================= */

cargarEstado();
cargarBloque();
