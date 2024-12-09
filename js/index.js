const productosContainer = document.querySelector(".productos-container");
const botonesCategoria = document.querySelectorAll(".boton-categoria");
const cantidadChop = document.querySelector(".chop-cantidad");
const menu = document.querySelector(".menu");
const navbar = document.querySelector(".navbar");
const navbarItems = document.querySelectorAll(".navbar-item");
const modalProducto = document.querySelector(".modal-producto");
const btnModalProducto = document.querySelector(".btn-modal");


let carro = JSON.parse(localStorage.getItem("carritoProductos")) || [];

function guardarLocalStorage() {
  localStorage.setItem("carritoProductos", JSON.stringify(carro));
}

function mostrarProducto(productos) {
  productosContainer.innerHTML = "";

  

  productos.forEach((producto) => {
    const nuevoProducto = document.createElement("div");
    nuevoProducto.classList = "tarjeta-producto";
    nuevoProducto.innerHTML = `
            <img src=${producto.imagen}>
            <div>
            <h2 class = 'nombre-producto'>${producto.nombre}</h2>
            <span class='precio-producto'>$${producto.precio}</span>
            </div>
            <button class='btn-producto-info' id=${producto.id}>Ver producto</button>            
            <button class= 'btn-producto' id=${producto.id}>Agregar al carrito</button>

         `;

    productosContainer.appendChild(nuevoProducto);
  });

  

  actualizarBotonesProductos();
}



function filtrarPorductosPorCategoria() {
  botonesCategoria.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      botonesCategoria.forEach((boton) => boton.classList.remove("activo"));

      e.target.classList.add("activo");

      if (e.target.id !== "todos") {
        const productosFiltrados = productosBeer.filter(
          (producto) => producto.categoria === e.target.id
        );
        mostrarProducto(productosFiltrados);
      } else {
        mostrarProducto(productosBeer);
      }
    });
  });
}

//Funcion para actualizar los botones que sea crean dinamicamente
//y poder usarlos para agregar los productos al carro y ver mas info
function actualizarBotonesProductos() {
  let botonAgregarProducto = document.querySelectorAll(".btn-producto");
  let botonVerProducto = document.querySelectorAll(".btn-producto-info");

  botonAgregarProducto.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });

  botonVerProducto.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const productoId = Number(e.target.id);

      abrirModalProducto(productoId);
    });
  });
}

function agregarAlCarrito(e) {
  const productoAgregado = productosBeer.find(
    (producto) => producto.id === Number(e.target.id)
  );

  if (carro.some((producto) => producto.id === Number(e.target.id))) {
    const indice = carro.findIndex(
      (producto) => producto.id === Number(e.target.id)
    );
    carro[indice].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    carro.push(productoAgregado);
  }

  actualizarCantidadCarrito();
  guardarLocalStorage();
  mostrarProductosCarrito();
  actualizarTotalCarrito();
  modalProductoAgregadoAlCarrito();
}

function abrirModalProducto(productoid) {
  const productoModal = productosBeer.find(
    (producto) => producto.id === productoid
  );

  if (productoModal) {
    const imagenModal = document.querySelector(".img-modal");
    imagenModal.src = productoModal.imagen;
    document.querySelector(".titulo-modal").innerHTML = productoModal.nombre;
    document.querySelector(".descripcion-modal").innerHTML =
      productoModal.descripcion;
  }

  modalProducto.style.display = "block";
}

function cerrarModalProducto() {
  btnModalProducto.addEventListener("click", (e) => {
    modalProducto.style.display = "none";
  });
}

function actualizarCantidadCarrito() {
  let totalCarrito = carro.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  cantidadChop.innerHTML = totalCarrito;
}

function abrirYCerrarMenu() {
  menu.addEventListener("click", () => {
    navbar.classList.toggle("abrir-menu");
  });

  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && e.target !== menu) {
      navbar.classList.remove("abrir-menu");
      return;
    }
  });

  cerrarMenuClickLink();
}

function cerrarMenuClickLink() {
  navbarItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("navbar-item")) {
        navbar.classList.remove("abrir-menu");
      }
    });
  });
}

function modalProductoAgregadoAlCarrito() {
  productosContainer.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("btn-producto")) {
      const boton = e.target;
      boton.classList.add("btn-producto-agregado");
      boton.innerHTML = "Producto agregado";
      setTimeout(() => {
        boton.classList.remove("btn-producto-agregado");
        boton.innerHTML = "Agregar al carrito";
      }, 1000);
    }
  });
}

function init() {
  mostrarProducto(productosBeer);  
  actualizarCantidadCarrito();
  filtrarPorductosPorCategoria();
  abrirYCerrarMenu();
  cerrarModalProducto();
}

init();
