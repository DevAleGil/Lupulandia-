const chop = document.querySelector(".chop");
const carrito = document.querySelector(".carrito");
const carritoContainer = document.querySelector(".container-carrito");
const tituloCarrito = document.querySelector(".carrito-titulo");
const botonVaciarCarrito = document.querySelector(".carrito-btn-vaciar");
const botonComprar = document.querySelector(".carrito-btn-comprar");
const totalCarrito = document.querySelector(".total");
const btnCerrarCarrito = document.querySelector(".btn-cerrar-carrito");

function mostrarProductosCarrito() {
  carritoContainer.innerHTML = "";

  carro.forEach((producto) => {
    const nuevoProductoCarrito = document.createElement("div");
    nuevoProductoCarrito.classList = "carrito-producto";
    nuevoProductoCarrito.innerHTML = `
          
              <img
                src="${producto.imagen}"
                alt="imagen producto"
                class = 'carrito-imagen'
              />
              <div class="carrito-unidades">
                <button class="incrementar" id=${producto.id} >+</button>
                <span>${producto.cantidad}</span>
                <button class="disminuir" id=${producto.id}>-</button>
              </div>
              <div class="carrito-info">
                <h4>${producto.nombre}</h4>
                <p>$ ${producto.precio}</p>
              </div>
              <img src='./assets/iconos/icono-basura.png' id=${producto.id} class="carrito-basura">
          
          `;
    carritoContainer.append(nuevoProductoCarrito);
  });

  actualizarTachitoProductosCarrito();
  actulizarBotonesCantidadCarrito();
  productosExistentesEnCarrito();
}

function productosExistentesEnCarrito() {
  if (!carro.length) {
    tituloCarrito.innerHTML = "No hay productos en el carro.";
  } else if (carro.length >= 1) {
    tituloCarrito.innerHTML = "Tus productos son:";
  }
}

function abrirYCerrarCarrito() {
  chop.addEventListener("click", () => {
    carrito.classList.toggle("carrito-abierto");
  });
}

function actualizarTachitoProductosCarrito() {
  let botonEliminarProductoCarrito =
    document.querySelectorAll(".carrito-basura");

  botonEliminarProductoCarrito.forEach((boton) => {
    boton.addEventListener("click", eliminarProductoCarrito);
  });
}

function eliminarProductoCarrito(e) {
  carro = carro.filter(
    (productoencarro) => productoencarro.id !== Number(e.target.id)
  );

  mostrarProductosCarrito();
  actualizarCantidadCarrito();
  actualizarTotalCarrito();
  guardarLocalStorage();
}

function actulizarBotonesCantidadCarrito() {
  let botonIncremetar = document.querySelectorAll(".incrementar");
  botonIncremetar.forEach((boton) => {
    boton.addEventListener("click", incrementarCantidadCarrito);
  });

  let botonDisminuir = document.querySelectorAll(".disminuir");
  botonDisminuir.forEach((boton) => {
    boton.addEventListener("click", disminuirCantidadCarrito);
  });
}

function disminuirCantidadCarrito(e) {
  let producto = carro.find((item) => item.id === Number(e.target.id));
  if (producto && producto.cantidad > 1) {
    producto.cantidad--;
    mostrarProductosCarrito();
    actualizarCantidadCarrito();
    actualizarTotalCarrito();
    guardarLocalStorage();
  } else if (producto && producto.cantidad === 1) {
    carro = carro.filter((item) => item.id !== Number(e.target.id));
    mostrarProductosCarrito();
    actualizarCantidadCarrito();
    actualizarTotalCarrito();
    guardarLocalStorage();
  }
}

function incrementarCantidadCarrito(e) {
  let producto = carro.find((item) => item.id === Number(e.target.id));
  if (producto) {
    producto.cantidad++;
    mostrarProductosCarrito();
    actualizarCantidadCarrito();
    actualizarTotalCarrito();
    guardarLocalStorage();
  }
}

function actualizarTotalCarrito() {
  let compraTotalcarrito = carro.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  totalCarrito.innerHTML = `$ ${compraTotalcarrito}`;
}

function comprarOVaciarCarrito(btn, mensaje) {
  btn.addEventListener("click", () => {
    if (!carro.length) {
      return;
    } else if (carro.length) {
      if (window.confirm(mensaje)) {
        carro = [];
        mostrarProductosCarrito();
        actualizarCantidadCarrito();
        actualizarTotalCarrito();
        guardarLocalStorage();
      }
    }
  });
}

function cerrarCarrito(btn) {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("btn-cerrar-carrito")) {
      carrito.classList.remove("carrito-abierto");
    }
  });
}

function initCarrito() {
  document.addEventListener("DOMContentLoaded", () => {
    mostrarProductosCarrito();
  });

  productosExistentesEnCarrito();
  abrirYCerrarCarrito();
  cerrarCarrito(btnCerrarCarrito);
  comprarOVaciarCarrito(botonComprar, "Deseas finalizar tu compra?");
  comprarOVaciarCarrito(botonVaciarCarrito, "Deseas vaciar el carrito?");
}

initCarrito();
