import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "./firebase.js";

async function cargarRanking() {

  const contenedor = document.getElementById("ranking");

  contenedor.innerHTML = "<p>Cargando ranking...</p>";

  try {

    // Predicciones de los jugadores
    const prediccionesSnap = await getDocs(
      collection(db, "predicciones")
    );

    // Clasificados oficiales
    const clasificadosSnap = await getDocs(
      collection(db, "clasificados")
    );

    // Guardamos los clasificados oficiales
    const clasificados = {};

    clasificadosSnap.forEach(doc => {

      const data = doc.data();

      clasificados[data.grupo] = data.clasificados;

    });

    const jugadores = [];

    prediccionesSnap.forEach(doc => {

      const data = doc.data();

      if (!data.nombre || !data.predicciones) return;

      let puntos = 0;

      for (const grupo in data.predicciones) {

        const prediccion = data.predicciones[grupo];

        const oficial = clasificados[grupo];

        if (!oficial) continue;

        prediccion.forEach(equipo => {

          if (oficial.includes(equipo)) {

            puntos++;

          }

        });

      }

      jugadores.push({

        nombre: data.nombre,

        puntos

      });

    });

    jugadores.sort((a, b) => b.puntos - a.puntos);

    contenedor.innerHTML = "";

    if (jugadores.length === 0) {

      contenedor.innerHTML =
        "<p>No hay participantes todavía.</p>";

      return;

    }

    jugadores.forEach((j, i) => {

      let medalla = "";

      if (i === 0) medalla = "🥇";
      else if (i === 1) medalla = "🥈";
      else if (i === 2) medalla = "🥉";

      contenedor.innerHTML += `

<div class="partido">

<h2>${medalla} #${i + 1} ${j.nombre}</h2>

<p>${j.puntos} puntos</p>

</div>

<br>

`;

    });

  } catch (error) {

    console.error(error);

    contenedor.innerHTML =
      "<p>Error al cargar el ranking.</p>";

  }

}

cargarRanking();
