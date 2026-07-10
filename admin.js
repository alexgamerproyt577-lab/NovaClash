import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "./firebase.js";
import { equiposBloque1, equiposBloque2 } from "./equipos.js";

let bloqueActivo = 1;

const contenedor = document.getElementById("adminPartidos");

/* =========================
   CARGAR BLOQUE
========================= */

async function cargarBloque() {

    const snap = await getDoc(
        doc(db, "configuracion", "torneo")
    );

    if (snap.exists()) {

        bloqueActivo = snap.data().bloqueActivo;

        document.getElementById("bloqueActivo").value =
            bloqueActivo;

    }

    cargarPartidos();

}

async function guardarBloque() {

    bloqueActivo = Number(
        document.getElementById("bloqueActivo").value
    );

    await setDoc(
        doc(db, "configuracion", "torneo"),
        {
            bloqueActivo
        }
    );

    cargarPartidos();

    alert("Bloque actualizado.");

}

window.guardarBloque = guardarBloque;

/* =========================
   CARGAR PARTIDOS
========================= */

function cargarPartidos() {

    const partidos =
        bloqueActivo === 1
            ? equiposBloque1
            : equiposBloque2;

    contenedor.innerHTML = "";

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

}

/* =========================
   GUARDAR RESULTADOS
========================= */

async function guardarResultados() {

    const partidos =
        bloqueActivo === 1
            ? equiposBloque1
            : equiposBloque2;

    for (let i = 0; i < partidos.length; i++) {

        const ganador =
            document.querySelector(`input[name="g${i}"]:checked`);

        const resultado =
            document.querySelector(`input[name="r${i}"]:checked`);

        if (!ganador || !resultado) continue;

        await setDoc(
            doc(db, "resultados", `partido${i + 1}`),
            {
                partido: i + 1,
                ganador: ganador.value,
                resultado: resultado.value,
                bloque: bloqueActivo
            }
        );

    }

    alert("Resultados guardados correctamente.");

}

window.guardarResultados = guardarResultados;

/* =========================
   ESTADO PREDICCIONES
========================= */

async function cargarEstado() {

    const snap = await getDoc(
        doc(db, "configuracion", "predicciones")
    );

    if (snap.exists()) {

        document.getElementById("estadoPredicciones").checked =
            snap.data().abiertas;

    }

}

async function guardarEstado() {

    const abiertas =
        document.getElementById("estadoPredicciones").checked;

    await setDoc(
        doc(db, "configuracion", "predicciones"),
        {
            abiertas
        }
    );

    alert("Estado actualizado.");

}

window.guardarEstado = guardarEstado;

/* =========================
   INICIO
========================= */

cargarEstado();
cargarBloque();
