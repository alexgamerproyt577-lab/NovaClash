import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import { auth } from "./firebase.js";

signInWithEmailAndPassword(auth,email,password)
.then(()=>{

window.location="panel.html";

})
.catch(()=>{

alert("Correo o contraseña incorrectos.");

});
