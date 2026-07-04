const boton = document.getElementById("comenzar");

if (boton) {
    boton.addEventListener("click", () => {
        window.location.href = "predicciones.html";
    });
}