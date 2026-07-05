import { db } from "./firebase.js";
import { equiposBloque1, equiposBloque2 } from "./equipos.js";

const ronda16 = document.getElementById("ronda16");

// Por ahora mostramos el bloque 1
const partidos = equiposBloque1;

partidos.forEach((partido, i) => {

    ronda16.innerHTML += `

    <div class="partido">

        <h3>Partido ${i + 1}</h3>

        <p>${partido[0]}</p>

        <p>VS</p>

        <p>${partido[1]}</p>

    </div>

    <br>

    `;

});
