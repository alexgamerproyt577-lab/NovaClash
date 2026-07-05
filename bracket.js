import { equiposBloque1 } from "./equipos.js";

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
