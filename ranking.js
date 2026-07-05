import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "./firebase.js";

import {
  PUNTOS_GANADOR,
  PUNTOS_RESULTADO
} from "./config.js";

/* =========================
   CARGAR RANKING
========================= */

async function cargarRanking() {

  const contenedor = document.getElementById("ranking");

  if (!contenedor) return;

  contenedor.innerHTML = "<p>Cargando ranking...</p>";

  try {

    // Predicciones de todos los jugadores
    const prediccionesSnap = await getDocs(
      collection(db, "predicciones")
    );

    // Resultados oficiales cargados desde el panel Admin
    const resultadosSnap = await getDocs(
      collection(db, "resultados")
    );

    const resultados = {};

    resultadosSnap.forEach(doc => {

      const r = doc.data();

      resultados[r.partido] = {
        ganador: r.ganador,
        resultado: r.resultado
      };

    });

    const jugadores = {};

    prediccionesSnap.forEach(doc => {

      const data = doc.data();

      // Ignorar documentos viejos o inválidos
      if (!data.nombre || !data.predicciones) return;

      if (!jugadores[data.nombre]) {
        jugadores[data.nombre] = 0;
      }

      data.predicciones.forEach(p => {

        const real = resultados[p.partido];

        // Si todavía no se cargó el resultado de ese partido
        if (!real) return;

        let puntos = 0;

        // Ganador correcto
        if (p.ganador === real.ganador) {

          puntos += PUNTOS_GANADOR;

          // Marcador correcto
          if (p.resultado === real.resultado) {
            puntos += PUNTOS_RESULTADO;
          }

        }

        jugadores[data.nombre] += puntos;

      });

    });

    const ranking = Object.entries(jugadores)
      .sort((a, b) => b[1] - a[1]);

    contenedor.innerHTML = "";

    if (ranking.length === 0) {

      contenedor.innerHTML =
        "<p>No hay participantes todavía.</p>";

      return;

    }

    ranking.forEach((jugador, i) => {

      let medalla = "";

      if (i === 0) medalla = "🥇";
      else if (i === 1) medalla = "🥈";
      else if (i === 2) medalla = "🥉";

      contenedor.innerHTML += `

        <div class="partido">

          <h2>${medalla} #${i + 1} ${jugador[0]}</h2>

          <p>Puntos: <b>${jugador[1]}</b></p>

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
