import { equiposBloque1 } from "./equipos.js";

const r16 = document.getElementById("r16");

equiposBloque1.forEach((partido)=>{

    r16.innerHTML += `

    <div class="match">

        <div class="equipo">${partido[0]}</div>

        <div class="equipo">${partido[1]}</div>

    </div>

    `;

});
