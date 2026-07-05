import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "./firebase.js";
import { equiposBloque1, equiposBloque2 } from "./equipos.js";

import { BLOQUE_ACTIVO } from "./config.js";

const bloqueActivo = BLOQUE_ACTIVO;

const partidos =
    bloqueActivo === 1
        ? equiposBloque1
        : equiposBloque2;

const contenedor = document.getElementById("adminPartidos");

partidos.forEach((p,i)=>{

contenedor.innerHTML += `
<div class="partido">

<h2>Partido ${i+1}</h2>

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

</div><br>
`;

});

contenedor.innerHTML += `
<button onclick="guardarResultados()">
Guardar Resultados
</button>
`;

async function guardarResultados(){

for(let i=0;i<partidos.length;i++){

const ganador=document.querySelector(`input[name="g${i}"]:checked`);
const resultado=document.querySelector(`input[name="r${i}"]:checked`);

if(!ganador || !resultado) continue;

await setDoc(doc(db, "resultados", `partido${i+1}`), {

  partido: i + 1,
  ganador: ganador.value,
  resultado: resultado.value

});

}

alert("Resultados guardados correctamente");

}

window.guardarResultados=guardarResultados;

async function guardarEstado() {

    const abierto = document.getElementById("estadoPredicciones").checked;

    await setDoc(doc(db, "configuracion", "predicciones"), {
        abiertas: abierto
    });

    alert("Estado de las predicciones actualizado.");
}

async function cargarEstado() {

    const ref = doc(db, "configuracion", "predicciones");
    const snap = await getDoc(ref);

    if (snap.exists()) {
        document.getElementById("estadoPredicciones").checked =
            snap.data().abiertas;
    }

}

window.guardarEstado = guardarEstado;

cargarEstado();
