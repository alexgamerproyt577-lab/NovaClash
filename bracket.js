import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import { db } from "./firebase.js";

async function cargarBracket(){

    const ronda16=document.getElementById("ronda16");

    const torneo=await getDoc(doc(db,"configuracion","torneo"));

    if(!torneo.exists()){

        ronda16.innerHTML="No existe el torneo.";

        return;

    }

    ronda16.innerHTML="Bracket cargado correctamente.";

}

cargarBracket();
