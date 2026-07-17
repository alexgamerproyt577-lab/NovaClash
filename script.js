console.log("VERSION GRUPOS V2");

import {
  collection,
  addDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "./firebase.js";
import { grupos, nombresGrupos } from "./equipos.js";

/* =========================
   VARIABLES
========================= */

let bloqueActivo = 1;

/* =========================
   VERIFICAR SI LAS PREDICCIONES ESTÁN ABIERTAS
========================= */

async function verificarEstadoPredicciones() {

  const ref = doc(db, "configuracion", "predicciones");
  const snap = await getDoc(ref);

  if (snap.exists() && snap.data().abiertas === false) {

    document.getElementById("partidos").innerHTML =
      "<h2>🔒 Las predicciones están cerradas.</h2>";

    document.getElementById("nombre").style.display = "none";

    document.querySelector("button").style.display = "none";

    return false;
  }

  return true;
}

/* =========================
   OBTENER GRUPOS DEL BLOQUE ACTIVO
========================= */

function obtenerGruposActivos() {

  if (bloqueActivo === 1) {
    return ["A", "B"];
  }

  return ["C", "D"];
}

/* =========================
   CONTROLAR SELECCIÓN DE 3 EQUIPOS
========================= */

function controlarSeleccion(grupo) {

  const checks = document.querySelectorAll(
    `input[name="grupo-${grupo}"]`
  );

  const seleccionados = [...checks].filter(c => c.checked);

  if (seleccionados.length >= 3) {

    checks.forEach(check => {
      if (!check.checked) {
        check.disabled = true;
      }
    });

  } else {

    checks.forEach(check => {
      check.disabled = false;
    });

  }
}

/* =========================
   CARGAR GRUPOS
========================= */

window.addEventListener("DOMContentLoaded", async () => {

  const abiertas = await verificarEstadoPredicciones();

  if (!abiertas) return;

  // Leer bloque activo desde Firebase
  const torneoSnap = await getDoc(
    doc(db, "configuracion", "torneo")
  );

  if (torneoSnap.exists()) {
    bloqueActivo = torneoSnap.data().bloqueActivo || 1;
  }

  const gruposActivos = obtenerGruposActivos();

  const contenedor = document.getElementById("partidos");

  contenedor.innerHTML = "";

  gruposActivos.forEach(grupo => {

    const equipos = grupos[grupo];

    contenedor.innerHTML += `

<div class="grupo-card">

  <div class="grupo-header">
    GRUPO ${grupo}
  </div>

  <div class="grupo-equipos">

    ${equipos.map((equipo) => `
<label class="equipo-card">

<input
type="checkbox"
name="grupo-${grupo}"
value="${equipo}"
onchange="controlarSeleccion('${grupo}')">

<div class="equipo-nombre">

🏆 ${equipo}

</div>

</label>
`).join("")}

  </div>

<div class="grupo-info">

Clasificados:
<span id="contador-${grupo}">

0 / 3

</span>

</div>

</div>

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

  const gruposActivos = obtenerGruposActivos();

  const datos = {

    nombre,

    fecha: new Date().toLocaleString(),

    bloque: bloqueActivo,

    fase: "grupos",

    predicciones: {}

  };

  for (const grupo of gruposActivos) {

    const seleccionados = [
      ...document.querySelectorAll(
        `input[name="grupo-${grupo}"]:checked`
      )
    ].map(c => c.value);

    if (seleccionados.length !== 3) {

      alert(`Debes seleccionar exactamente 3 equipos en el Grupo ${grupo}`);

      return;
    }

    datos.predicciones[grupo] = seleccionados;
  }

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

document.getElementById("nombre").value = "";

document
.querySelectorAll('input[type="checkbox"]')
.forEach(c => {
    c.checked = false;
    c.disabled = false;
});
/* =========================
   FUNCIONES GLOBALES
========================= */

window.enviarPredicciones = enviarPredicciones;
window.controlarSeleccion = controlarSeleccion;

console.log("SCRIPT GRUPOS LISTO");
