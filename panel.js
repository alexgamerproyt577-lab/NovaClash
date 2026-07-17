import {
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "./firebase.js";
import { grupos } from "./equipos.js";

let bloqueActivo = 1;

const contenedor = document.getElementById("adminPartidos");

/*==========================
CARGAR BLOQUE
==========================*/

async function cargarBloque(){

const snap=await getDoc(
doc(db,"configuracion","torneo")
);

if(snap.exists()){

bloqueActivo=snap.data().bloqueActivo || 1;

document.getElementById("bloqueActivo").value=bloqueActivo;

}

cargarGrupos();

}

window.guardarBloque=async()=>{

bloqueActivo=Number(
document.getElementById("bloqueActivo").value
);

await setDoc(
doc(db,"configuracion","torneo"),
{
bloqueActivo
}
);

cargarGrupos();

alert("Bloque actualizado");

};

/*==========================
MOSTRAR GRUPOS
==========================*/

function cargarGrupos(){

contenedor.innerHTML="";

const mostrar=

bloqueActivo===1
?["A","B"]
:["C","D"];

mostrar.forEach(grupo=>{

contenedor.innerHTML+=`

<div class="grupo-card">

<div class="grupo-header">

🏆 GRUPO ${grupo}

</div>

<div class="grupo-equipos">

${grupos[grupo].map(e=>`

<label class="equipo-card">

<input
type="checkbox"
name="grupo-${grupo}"
value="${e}"
onchange="controlarSeleccion('${grupo}')">

<div class="equipo-nombre">

${e}

</div>

</label>

`).join("")}

</div>

<div class="grupo-info">

Seleccionados:

<span id="contador-${grupo}">

0 / 3

</span>

</div>

<br>

<button onclick="guardarGrupo('${grupo}')">

Guardar Grupo ${grupo}

</button>

</div>

`;

});

}

/*==========================
CONTADOR
==========================*/

window.controlarSeleccion=(grupo)=>{

const checks=document.querySelectorAll(
`input[name="grupo-${grupo}"]`
);

const seleccionados=[...checks].filter(c=>c.checked);

document.getElementById(
`contador-${grupo}`
).textContent=

`${seleccionados.length} / 3`;

checks.forEach(c=>{

if(seleccionados.length>=3 && !c.checked){

c.disabled=true;

}else{

c.disabled=false;

}

});

};

/*==========================
GUARDAR CLASIFICADOS
==========================*/

window.guardarGrupo=async(grupo)=>{

const clasificados=[

...document.querySelectorAll(
`input[name="grupo-${grupo}"]:checked`
)

].map(c=>c.value);

if(clasificados.length!==3){

alert("Debes elegir exactamente 3 equipos.");

return;

}

await setDoc(

doc(db,"clasificados",grupo),

{

grupo,

clasificados

}

);

alert(`Grupo ${grupo} guardado correctamente.`);

};

/*==========================
PREDICCIONES
==========================*/

async function cargarEstado(){

const snap=await getDoc(

doc(db,"configuracion","predicciones")

);

if(snap.exists()){

document.getElementById(
"estadoPredicciones"
).checked=snap.data().abiertas;

}

}

window.guardarEstado=async()=>{

const abiertas=

document.getElementById(
"estadoPredicciones"
).checked;

await setDoc(

doc(db,"configuracion","predicciones"),

{

abiertas

}

);

alert("Estado actualizado");

};

cargarEstado();
cargarBloque();
