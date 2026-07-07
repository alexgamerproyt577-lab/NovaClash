import { equiposBloque1 } from "./equipos.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "./firebase.js";

const r16 = document.getElementById("r16");
const r8 = document.getElementById("r8");
const r4 = document.getElementById("r4");
const r2 = document.getElementById("r2");
const r1 = document.getElementById("r1");

/* =========================
   16avos
========================= */

equiposBloque1.forEach((partido) => {

    r16.innerHTML += `

    <div class="match">

        <div class="equipo">${partido[0]}</div>

        <div class="equipo">${partido[1]}</div>

    </div>

    `;

});

/* =========================
   Octavos
========================= */

for(let i=0;i<4;i++){

   const casillasOctavos = r8.querySelectorAll(".equipo");
   
    r8.innerHTML += `

    <div class="match">

        <div class="equipo">------</div>

        <div class="equipo">------</div>

    </div>

    `;

}

/* =========================
   Cuartos
========================= */

for(let i=0;i<2;i++){

    r4.innerHTML += `

    <div class="match">

        <div class="equipo">------</div>

        <div class="equipo">------</div>

    </div>

    `;

}

/* =========================
   Semifinal
========================= */

r2.innerHTML = `

<div class="match">

<div class="equipo">------</div>

<div class="equipo">------</div>

</div>

`;

/* =========================
   Final
========================= */

r1.innerHTML = `

<div class="match">

<div class="equipo">🏆</div>

<div class="equipo">🏆</div>

</div>

`;

/* =========================
   CARGAR GANADORES A OCTAVOS
========================= */

async function cargarGanadores() {

    const snap = await getDocs(collection(db, "resultados"));

    console.log("Cantidad de resultados:", snap.size);

    snap.forEach((documento) => {

        console.log(documento.id, documento.data());

    });

}

cargarGanadores();
