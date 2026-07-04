import {
  getFirestore,
  doc,
  setDoc
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

const partidos = [
["Los Squidibi Sigma","Gigachad"],
["CPH Brazinos","The gods of war"],
["Equipo 5","Equipo 6"],
["Equipo 7","Equipo 8"],
["Equipo 9","Equipo 10"],
["Equipo 11","Equipo 12"],
["Equipo 13","Equipo 14"],
["Equipo 15","Equipo 16"]
];

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
