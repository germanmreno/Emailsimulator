const btnEnviar = document.querySelector("#enviar");
const formulario = document.querySelector("#enviar-mail");

const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", iniciarApp);

  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);
}

function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {
  if (e.target.value.length > 0) {
    console.log("Hay algo");
    mostrarExito(e.target);
  } else {
    mostrarError(e.target, "Todos los campos son obligatorios");
  }

  if (e.target.type === "email") {
    const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (er.test(e.target.value)) {
      console.log("Email válido");
      mostrarExito(e.target);
    } else {
      mostrarError(e.target, "El email no es válido");
    }
  }
}

function mostrarExito(e) {
  const error = document.querySelector("p.error");

  error.remove();

  e.classList.remove("border-red-500");
  e.classList.add("border", "border-green-500");
}

function mostrarError(e, msj) {
  e.classList.remove("border-green-500");
  e.classList.add("border", "border-red-500");

  const mensajeError = document.createElement("p");
  mensajeError.textContent = msj;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}
