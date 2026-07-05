alert("ADMIN.JS CARGADO");

import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "./firebase.js";
import { equiposBloque1, equiposBloque2 } from "./equipos.js";

console.log("1 - Admin.js cargado");

const bloqueActivo = 1;

const partidos =
    bloqueActivo === 1
        ? equiposBloque1
        : equiposBloque2;

console.log("2 - Partidos cargados");

const contenedor = document.getElementById("adminPartidos");

/* ===========================
   CARGAR PARTIDOS
=========================== */

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

console.log("3 - Partidos renderizados");

contenedor.innerHTML += `
<button onclick="guardarResultados()">
Guardar Resultados
</button>
`;

/* ===========================
   GUARDAR RESULTADOS
=========================== */

async function guardarResultados() {

    for (let i = 0; i < partidos.length; i++) {

        const ganador = document.querySelector(`input[name="g${i}"]:checked`);
        const resultado = document.querySelector(`input[name="r${i}"]:checked`);

        if (!ganador || !resultado) continue;

        await setDoc(
            doc(db, "resultados", `partido${i + 1}`),
            {
                partido: i + 1,
                ganador: ganador.value,
                resultado: resultado.value
            }
        );

    }

    alert("Resultados guardados correctamente.");

}

window.guardarResultados = guardarResultados;

/* ===========================
   PREDICCIONES ABIERTAS
=========================== */

async function guardarEstado() {

    const abierto =
        document.getElementById("estadoPredicciones").checked;

    await setDoc(
        doc(db, "configuracion", "predicciones"),
        {
            abiertas: abierto
        }
    );

    alert("Estado actualizado.");

}

async function cargarEstado() {

    const snap = await getDoc(
        doc(db, "configuracion", "predicciones")
    );

    if (snap.exists()) {

        document.getElementById("estadoPredicciones").checked =
            snap.data().abiertas;

    }

}

window.guardarEstado = guardarEstado;

/* ===========================
   BLOQUE ACTIVO
=========================== */

async function guardarBloque() {

    const bloque = Number(
        document.getElementById("bloqueActivo").value
    );

    await setDoc(
        doc(db, "configuracion", "torneo"),
        {
            bloqueActivo: bloque
        }
    );

    alert("Bloque actualizado.");

}

async function cargarBloque() {

    const snap = await getDoc(
        doc(db, "configuracion", "torneo")
    );

    if (!snap.exists()) return;

    document.getElementById("bloqueActivo").value =
        snap.data().bloqueActivo;

}

window.guardarBloque = guardarBloque;

/* ===========================
   ESTADÍSTICAS
=========================== */

async function cargarEstadisticas() {

    console.log("5 - Entró a cargarEstadisticas");

    const contenedor = document.getElementById("estadisticas");

    if (!contenedor) {
        console.log("No existe el div #estadisticas");
        return;
    }

    const snap = await getDocs(collection(db, "predicciones"));

    console.log("Cantidad de documentos:", snap.size);

    let html = "";

    for (let i = 0; i < partidos.length; i++) {

        const votos = {};

        votos[partidos[i][0]] = 0;
        votos[partidos[i][1]] = 0;

        let total = 0;

        snap.forEach(documento => {

            const data = documento.data();

            if (!data.predicciones) return;

            const p = data.predicciones[i];

            if (!p) return;

            if (p.ganador && votos[p.ganador] !== undefined) {

                votos[p.ganador]++;
                total++;

            }

        });

        const e1 = partidos[i][0];
        const e2 = partidos[i][1];

        const p1 = total ? Math.round(votos[e1] * 100 / total) : 0;
        const p2 = total ? Math.round(votos[e2] * 100 / total) : 0;

        html += `
<div class="partido">

<h2>Partido ${i + 1}</h2>

<p>${e1}: ${votos[e1]} votos (${p1}%)</p>

<p>${e2}: ${votos[e2]} votos (${p2}%)</p>

</div>

<br>
`;

    }

    console.log("HTML generado:", html);

    contenedor.innerHTML = html;

}

console.log("4 - Antes de cargarEstadisticas");

cargarEstadisticas();

console.log("6 - Después de cargarEstadisticas");

/* ===========================
   INICIO
=========================== */

cargarEstado();
cargarBloque();
