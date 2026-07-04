const boton = document.querySelector("button");

boton.addEventListener("mousemove", (e)=>{

const x = e.offsetX;
const y = e.offsetY;

boton.style.background =
`radial-gradient(circle at ${x}px ${y}px,#b54cff,#5b2cff)`;

});

boton.addEventListener("mouseleave",()=>{

boton.style.background =
"linear-gradient(90deg,#5b2cff,#aa3fff)";

});
