const equipos = [

["Equipo 1","Equipo 2"],
["Equipo 3","Equipo 4"],
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

function enviarPredicciones(){

    const nombre = document.getElementById("nombre").value;

    if(nombre==""){

        alert("Escribe tu nombre o Nick");

        return;

    }

    const datos={

        nombre:nombre,

        predicciones:[]

    };

    equipos.forEach((partido,i)=>{

        const ganador=document.querySelector('input[name="g'+i+'"]:checked');

        const resultado=document.querySelector('input[name="r'+i+'"]:checked');

        datos.predicciones.push({

            partido:i+1,

            ganador:ganador?ganador.value:"",

            resultado:resultado?resultado.value:""

        });

    });

    localStorage.setItem("pickem",JSON.stringify(datos));

    alert("✅ Predicciones guardadas correctamente.");

}
