const inputNombre = document.querySelector("#nombre");
const inputApellido = document.querySelector("#apellido");
const inputEdad = document.querySelector("#edad");
const inputEmail = document.querySelector("#email");
const formulario = document.querySelector(".formulario");
const mensajeNombre = document.querySelector(".mensaje-nombre");
const mensajeApellido = document.querySelector(".mensaje-apellido");
const mensajeEdad = document.querySelector(".mensaje-edad");
const mensajeEmail = document.querySelector(".mensaje-email");

function validarInputNombre(input) {
  let valido = false;

  if (!input.value.trim().length) {
    mensajeNombre.innerHTML = "Campo obligatorio.";
    return;
  }

  if (!(input.value.trim().length >= 3 && input.value.trim().length <= 15)) {
    mensajeNombre.innerHTML = "El campo debe tener entre 3 y 15 caracteres";
    return;
  }

  mensajeNombre.innerHTML = "Campo completado existosamente";

  valido = true;
  return valido;
}

function validarInputApellido(input) {
  let valido = false;

  if (!input.value.trim().length) {
    mensajeApellido.innerHTML = "Campo obligatorio.";
    return;
  }

  if (!(input.value.trim().length >= 3 && input.value.trim().length <= 15)) {
    mensajeApellido.innerHTML = "El campo debe tener entre 3 y 15 caracteres";
    return;
  }

  mensajeApellido.innerHTML = "Campo completado existosamente";

  valido = true;
  return valido;
}

function validadInputEdad(input) {
  let valido = false;

  if (!input.value.trim().length) {
    mensajeEdad.innerHTML = "Campo obligatorio.";
    return;
  }

  if (input.value.trim() <= 17) {
    mensajeEdad.innerHTML = "Debes tener mas de 17 años";
    return;
  }

  mensajeEdad.innerHTML = "Campo completado existosamente";
  valido = true;
  return valido;
}

function validarInputEmail(input) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  let valido = false;

  if (!input.value.trim().length) {
    mensajeEmail.innerHTML = "Campo obligatorio.";
    return;
  }

  if (!regex.test(input.value.trim())) {
    mensajeEmail.innerHTML = "Correo electrónico no válido.";
    return;
  }

  mensajeEmail.innerHTML = "Campo completado exitosamente.";

  valido = true;
  return valido;
}

function enviarFormulario(e) {
  e.preventDefault();

  let nombreValido = validarInputNombre(inputNombre);
  let apellidoValido = validarInputApellido(inputApellido);
  let emailValido = validarInputEmail(inputEmail);
  let edadValido = validadInputEdad(inputEdad);

  if (nombreValido && apellidoValido && emailValido && edadValido) {
    alert("Formulario enviado");
    formulario.reset();
    mensajeNombre.innerHTML = "";
    mensajeApellido.innerHTML = "";
    mensajeEdad.innerHTML = "";
    mensajeEmail.innerHTML = "";
  } else {
    alert("Debes completar los campos.");
  }
}

formulario.addEventListener("submit", enviarFormulario);
inputNombre.addEventListener("input", () => validarInputNombre(inputNombre));
inputApellido.addEventListener("input", () =>
  validarInputApellido(inputApellido)
);
inputEdad.addEventListener("input", () => validadInputEdad(inputEdad));
inputEmail.addEventListener("input", () => validarInputEmail(inputEmail));
