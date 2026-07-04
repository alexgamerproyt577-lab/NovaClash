import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCULLdWfSlZL2vNetwknkaEOj5fAsIIr6o",
  authDomain: "nova-clash-8c78b.firebaseapp.com",
  projectId: "nova-clash-8c78b",
  storageBucket: "nova-clash-8c78b.firebasestorage.app",
  messagingSenderId: "202679377197",
  appId: "1:202679377197:web:b5ed1526028cac92aa07a4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const equipos = [

["Los Squidibi Sigma","Gigachad"],
["CPH Brazinos","The gods of war"],
["Equipo 5","Equipo 6"],
["Equipo 7","Equipo 8"],
["Equipo 9","Equipo 10"],
["Equipo 11","Equipo 12"],
["Equipo 13","Equipo 14"],
["Equipo 15","Equipo 16"],
["Equipo 17","Equipo 18"],
["Equipo 19","Equipo 20"],
["Equipo 21","Equipo 22"],
["Equipo 23","Equipo 24"],
["Equipo 25","Equipo 26"],
["Equipo 27","Equipo 28"],
["Equipo 29","Equipo 30"],
["Equipo 31","Equipo 32"]

];

const contenedor=document.getElementById("partidos");

if(contenedor){

equipos.forEach((partido,i)=>{

contenedor.innerHTML+=`

<div class="partido">

<h2>Partido ${i+1}</h2>

<p><b>${partido[0]}</b> VS <b>${partido[1]}</b></p>

<label>

<input type="radio" name="g${i}" value="${partido[0]}">

${partido[0]}

</label>

<label>

<input type="radio" name="g${i}" value="${partido[1]}">

${partido[1]}

</label>

<br>

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

}

async function enviarPredicciones() {

    const nombre = document.getElementById("nombre").value;

    if (nombre == "") {
        alert("Escribe tu nombre o Nick");
        return;
    }

    const datos = {
        nombre: nombre,
        fecha: new Date().toLocaleString(),
        predicciones: []
    };

    equipos.forEach((partido, i) => {

        const ganador = document.querySelector('input[name="g' + i + '"]:checked');
        const resultado = document.querySelector('input[name="r' + i + '"]:checked');

        datos.predicciones.push({
            partido: i + 1,
            equipo1: partido[0],
            equipo2: partido[1],
            ganador: ganador ? ganador.value : "",
            resultado: resultado ? resultado.value : ""
        });

    });

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

window.enviarPredicciones = enviarPredicciones;
