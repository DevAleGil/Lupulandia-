const carrusel = document.querySelector(".carrusel");
const slider = document.querySelectorAll(".slider");

let indice = 0;
let operacion = 0;
let anchoImg = 100 / slider.length;

function moverCarrusel() {
  if (indice >= slider.length - 1) {
    indice = 0;
    operacion = 0;
    carrusel.style.transform = `translateX(-${operacion}%)`;
    carrusel.style.transition = "none";
    return;
  }
  indice++;
  operacion = operacion + anchoImg;
  carrusel.style.transform = `translateX(-${operacion}%)`;
}

setInterval(() => {
  moverCarrusel();
}, 5000);
