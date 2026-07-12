const usuarioCorrecto = "Leonardo";
const contraseñaCorrecta = "Nova2026";

function login(){

const usuario =
document.getElementById("usuario").value;

const contraseña =
document.getElementById("password").value;

if(
usuario === usuarioCorrecto &&
contraseña === contraseñaCorrecta
){

window.location.href = "panel.html";

}else{

document.getElementById("mensaje").innerHTML =
"❌ Usuario o contraseña incorrectos.";

}

}
