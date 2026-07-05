import {
  collection,
  addDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { BLOQUE_ACTIVO } from "./config.js";

import { db } from "./firebase.js";
import { equiposBloque1, equiposBloque2 } from "./equipos.js";

console.log("SCRIPT CARGADO");

/* =========================
   CONFIGURACIÓN
========================= */

const bloqueActivo = BLOQUE_ACTIVO;

const equipos = bloqueActivo === 1
  ? equiposBloque1
  : equiposBloque2;

/* =========================
   VERIFICAR SI LAS PREDICCIONES ESTÁN ABIERTAS
========================= */

async function verificarEstadoPredicciones() {

  const ref = doc(db, "configuracion", "predicciones");
  const snap = await getDoc(ref);

  if (snap.exists() && snap.data().abiertas === false) {

    document.getElementById("partidos").innerHTML = `
      <h2>🔒 Las predicciones están cerradas.</h2>
    `;

    document.getElementById("nombre").style.display = "none";

    document.querySelector("button").style.display = "none";

    return false;
  }

  return true;
}

/* =========================
   CARGAR PARTIDOS
========================= */

window.addEventListener("DOMContentLoaded", async () => {

  const abiertas = await verificarEstadoPredicciones();

  if (!abiertas) return;

  const contenedor = document.getElementById("partidos");

  if (!contenedor) return;

  equipos.forEach((partido, i) => {

    contenedor.innerHTML += `

      <div class="partido">

        <h2>Partido ${i + 1}</h2>

        <p><b>${partido[0]}</b> VS <b>${partido[1]}</b></p>

        <label>
          <input type="radio" name="g${i}" value="${partido[0]}">
          ${partido[0]}
        </label>

        <label>
          <input type="radio" name="g${i}" value="${partido[1]}">
          ${partido[1]}
        </label>

        <br>

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

});

/* =========================
   ENVIAR PREDICCIONES
========================= */

async function enviarPredicciones() {

  const nombre = document.getElementById("nombre").value.trim();

  if (nombre === "") {

    alert("Escribe tu nombre o Nick");

    return;

  }

  const datos = {

    nombre,

    fecha: new Date().toLocaleString(),

    bloque: bloqueActivo,

    predicciones: []

  };

  equipos.forEach((partido, i) => {

    const ganador = document.querySelector(`input[name="g${i}"]:checked`);

    const resultado = document.querySelector(`input[name="r${i}"]:checked`);

    datos.predicciones.push({

      partido: i + 1,

      equipo1: partido[0],

      equipo2: partido[1],

      ganador: ganador ? ganador.value : "",

      resultado: resultado ? resultado.value : ""

    });

  });

  try {

    await addDoc(

      collection(db, "predicciones"),

      datos

    );

    alert("✅ Predicciones enviadas correctamente.");

  } catch (error) {

    console.error(error);

    alert("❌ Error al enviar las predicciones.");

  }

}

window.enviarPredicciones = enviarPredicciones;

console.log("SCRIPT LISTO");
