import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "./firebase.js";
import { partidosGrupos } from "./equipos.js";

let bloqueActivo = 1;

const contenedor = document.getElementById("adminPartidos");

/*=========================================
    CARGAR ESTADO DEL PANEL
=========================================*/

async function cargarEstado() {

    const pred = await getDoc(
        doc(db,"configuracion","predicciones")
    );

    if(pred.exists()){

        document.getElementById("estadoPredicciones").checked =
        pred.data().abiertas;

    }

    const torneo = await getDoc(
        doc(db,"configuracion","torneo")
    );

    if(torneo.exists()){

        bloqueActivo = torneo.data().bloqueActivo || 1;

        document.getElementById("bloqueActivo").value =
        bloqueActivo;

    }

    cargarPartidos();

}

/*=========================================
    GUARDAR ESTADO PREDICCIONES
=========================================*/

async function guardarEstado(){

    const abiertas =
    document.getElementById("estadoPredicciones").checked;

    await setDoc(
        doc(db,"configuracion","predicciones"),
        {
            abiertas
        }
    );

    alert("Estado actualizado.");

}

window.guardarEstado = guardarEstado;

/*=========================================
    CAMBIAR BLOQUE
=========================================*/

async function guardarBloque(){

    bloqueActivo = Number(
        document.getElementById("bloqueActivo").value
    );

    await setDoc(
        doc(db,"configuracion","torneo"),
        {
            bloqueActivo
        }
    );

    cargarPartidos();

    alert("Bloque actualizado.");

}

window.guardarBloque = guardarBloque;

/*=========================================
    OBTENER GRUPOS VISIBLES
=========================================*/

function gruposActivos(){

    if(bloqueActivo===1){

        return ["A","B"];

    }

    return ["C","D"];

}

/*=========================================
    CARGAR PARTIDOS
=========================================*/

function cargarPartidos(){

    contenedor.innerHTML="";

    const grupos = gruposActivos();

    grupos.forEach(grupo=>{

        contenedor.innerHTML += `
        <h2 style="margin-top:40px">
        🏆 Grupo ${grupo}
        </h2>
        `;

        partidosGrupos[grupo].forEach((partido,index)=>{

            const id=`${grupo}-${index}`;

            contenedor.innerHTML += `

<div class="partido">

<h3>${partido[0]} 🆚 ${partido[1]}</h3>

<label>

<input
type="radio"
name="g-${id}"
value="${partido[0]}">

${partido[0]}

</label>

<br>

<label>

<input
type="radio"
name="g-${id}"
value="${partido[1]}">

${partido[1]}

</label>

<br><br>

<label>

<input
type="radio"
name="r-${id}"
value="2-0">

2-0

</label>

<label>

<input
type="radio"
name="r-${id}"
value="2-1">

2-1

</label>

</div>

<br>

`;

        });

    });

    contenedor.innerHTML += `

<button onclick="guardarResultados()">

Guardar Resultados

</button>

`;

}

/*=========================================
    GUARDAR RESULTADOS
=========================================*/

async function guardarResultados(){

    const grupos = gruposActivos();

    for(const grupo of grupos){

        const partidos = partidosGrupos[grupo];

        for(let i=0;i<partidos.length;i++){

            const id=`${grupo}-${i}`;

            const ganador=document.querySelector(
                `input[name="g-${id}"]:checked`
            );

            const resultado=document.querySelector(
                `input[name="r-${id}"]:checked`
            );

            if(!ganador || !resultado){
                continue;
            }

            await setDoc(

                doc(
                    db,
                    "resultados",
                    id
                ),

                {

                    grupo,

                    partido:i+1,

                    equipo1:partidos[i][0],

                    equipo2:partidos[i][1],

                    ganador:ganador.value,

                    resultado:resultado.value,

                    bloque:bloqueActivo

                }

            );

        }

    }

    alert("✅ Resultados guardados correctamente.");

}

window.guardarResultados = guardarResultados;


/*=========================================
    CARGAR RESULTADOS YA GUARDADOS
=========================================*/

async function cargarResultadosGuardados(){

    const grupos = gruposActivos();

    for(const grupo of grupos){

        const partidos = partidosGrupos[grupo];

        for(let i=0;i<partidos.length;i++){

            const id=`${grupo}-${i}`;

            const snap=await getDoc(
                doc(db,"resultados",id)
            );

            if(!snap.exists()) continue;

            const data=snap.data();

            const g=document.querySelector(
                `input[name="g-${id}"][value="${data.ganador}"]`
            );

            if(g) g.checked=true;

            const r=document.querySelector(
                `input[name="r-${id}"][value="${data.resultado}"]`
            );

            if(r) r.checked=true;

        }

    }

}


/*=========================================
    INICIO
=========================================*/

window.addEventListener("DOMContentLoaded",async()=>{

    await cargarEstado();

    await cargarResultadosGuardados();

});

console.log("PANEL ADMIN CARGADO");
