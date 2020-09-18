const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", iniciarApp);

  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  formulario.addEventListener("submit", enviarEmail);
  btnReset.addEventListener("click", resetearFormulario);
}

function iniciarApp() {
  btnEnviar.disabled = true;
  bloquearBtn();

  email.classList.remove("border-green-500", "border-red-500");
  asunto.classList.remove("border-green-500", "border-red-500");
  mensaje.classList.remove("border-green-500", "border-red-500");
}

function bloquearBtn() {
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
    if (er.test(e.target.value)) {
      console.log("Email válido");
      mostrarExito(e.target);
    } else {
      mostrarError(e.target, "El email no es válido");
    }
  }

  if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  } else {
    bloquearBtn();
  }
}

function mostrarExito(e) {
  const error = document.querySelector("p.error");
  if (error) {
    error.remove();
  }

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

function enviarEmail(e) {
  e.preventDefault();

  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  setTimeout(() => {
    spinner.style.display = "none";

    const mensajeExito = document.createElement("p");
    mensajeExito.textContent = "¡Mensaje enviado!";
    mensajeExito.classList.add(
      "border",
      "border-green-500",
      "background-green-100",
      "text-green-500",
      "p-3",
      "mt-5",
      "text-center",
      "error"
    );

    formulario.appendChild(mensajeExito);

    setTimeout(() => {
      mensajeExito.remove();
      resetearFormulario();
    }, 5000);
  }, 3000);
}

function resetearFormulario() {
  formulario.reset();
  iniciarApp();
}
