import { obtenerTodos, obtenerPorId, crear, actualizar, borrar } from './almacen.js';
import {
  validarAtributosHTML,
  validarEmail,
  validarContrasena,
  validarCoincidencia,
  validarFechaNacimiento,
} from './validacion.js';
import {
  mostrarErrorCampo,
  conectarValidacionInteractiva,
  validarFormularioCompleto,
} from './ui.js';

const COLECCION_USUARIOS = 'usuarios';

const formulario = document.querySelector('#form-registro');
const tituloFormulario = document.querySelector('#titulo-formulario-registro');
const inputUsuario = document.querySelector('#reg-usuario');
const inputCorreo = document.querySelector('#reg-correo');
const inputPassword = document.querySelector('#reg-password');
const inputPassword2 = document.querySelector('#reg-password2');
const inputFecha = document.querySelector('#reg-fecha');
const inputCondiciones = document.querySelector('#reg-condiciones');
const btnSubmit = document.querySelector('#btn-submit-registro');
const btnCancelar = document.querySelector('#btn-cancelar-edicion');
const estadoFormulario = document.querySelector('#estado-registro');
const listaUsuarios = document.querySelector('#lista-usuarios');

let idEnEdicion = null;

// Fija la fecha máxima semántica al día actual en formato ISO (AAAA-MM-DD)
inputFecha.max = new Date().toISOString().split('T')[0];

/**
 * Valida un campo individual del formulario de registro leyendo sus atributos HTML y reglas de negocio.
 * @param {HTMLElement} campo
 * @returns {string|null}
 */
function validarCampoRegistro(campo) {
  const etiquetas = {
    usuario: 'nombre de usuario',
    correo: 'correo electrónico',
    password: 'contraseña',
    password2: 'repetir contraseña',
    fechaNacimiento: 'fecha de nacimiento',
    aceptaCondiciones: 'las condiciones de acceso',
  };

  const etiqueta = etiquetas[campo.name] ?? campo.name;
  const errorHTML = validarAtributosHTML(campo, etiqueta);
  if (errorHTML) {
    return errorHTML;
  }

  if (campo === inputCorreo) {
    return validarEmail(campo.value);
  }
  if (campo === inputPassword) {
    return validarContrasena(campo.value, Number(campo.getAttribute('minlength') || 8));
  }
  if (campo === inputPassword2) {
    return validarCoincidencia(campo.value, inputPassword.value);
  }
  if (campo === inputFecha) {
    return validarFechaNacimiento(campo.value, 18);
  }

  return null;
}

/**
 * Restablece el formulario al modo creación y limpia errores previos.
 */
function limpiarModoEdicion() {
  idEnEdicion = null;
  formulario.reset();
  tituloFormulario.textContent = 'Registro de Cliente VIP';
  btnSubmit.textContent = 'Crear usuario';
  btnCancelar.classList.add('oculto');

  formulario.querySelectorAll('input').forEach((campo) => {
    delete campo.dataset.tocado;
    mostrarErrorCampo(campo, null);
  });
}

/**
 * Carga un usuario existente en el formulario para editarlo sin duplicarlo.
 * @param {string} id
 */
function iniciarEdicion(id) {
  const usuario = obtenerPorId(COLECCION_USUARIOS, id);
  if (!usuario) {
    return;
  }

  idEnEdicion = usuario.id;
  inputUsuario.value = usuario.usuario;
  inputCorreo.value = usuario.correo;
  inputFecha.value = usuario.fechaNacimiento;
  inputCondiciones.checked = Boolean(usuario.aceptaCondiciones);
  inputPassword.value = '';
  inputPassword2.value = '';

  tituloFormulario.textContent = `Editando a ${usuario.usuario}`;
  btnSubmit.textContent = 'Guardar cambios';
  btnCancelar.classList.remove('oculto');
  estadoFormulario.textContent = '';

  formulario.querySelectorAll('input').forEach((campo) => {
    delete campo.dataset.tocado;
    mostrarErrorCampo(campo, null);
  });
  inputUsuario.focus();
}

/**
 * Renderiza la lista dinámica de usuarios guardados (sin mostrar ni guardar contraseñas).
 */
function pintarUsuarios() {
  const usuarios = obtenerTodos(COLECCION_USUARIOS);
  listaUsuarios.innerHTML = '';

  if (usuarios.length === 0) {
    const vacio = document.createElement('p');
    vacio.className = 'lista-vacia';
    vacio.textContent = 'No hay usuarios VIP registrados todavía.';
    listaUsuarios.appendChild(vacio);
    return;
  }

  usuarios.forEach((item) => {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta-registro';

    const titulo = document.createElement('h3');
    titulo.textContent = item.usuario;

    const correo = document.createElement('p');
    correo.textContent = `Correo: ${item.correo}`;

    const fecha = document.createElement('p');
    fecha.textContent = `Nacimiento: ${item.fechaNacimiento}`;

    const condiciones = document.createElement('p');
    condiciones.textContent = `Condiciones aceptadas: ${item.aceptaCondiciones ? 'Sí' : 'No'}`;

    const acciones = document.createElement('div');
    acciones.className = 'acciones-registro';

    const btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.className = 'btn-secundario';
    btnEditar.dataset.accion = 'editar';
    btnEditar.dataset.id = item.id;
    btnEditar.textContent = 'Editar';

    const btnBorrar = document.createElement('button');
    btnBorrar.type = 'button';
    btnBorrar.className = 'btn-peligro';
    btnBorrar.dataset.accion = 'borrar';
    btnBorrar.dataset.id = item.id;
    btnBorrar.textContent = 'Borrar';

    acciones.append(btnEditar, btnBorrar);
    tarjeta.append(titulo, correo, fecha, condiciones, acciones);
    listaUsuarios.appendChild(tarjeta);
  });
}

// Revalida "repetir contraseña" en tiempo real si cambia la contraseña principal
inputPassword.addEventListener('input', () => {
  if (inputPassword2.dataset.tocado === 'true' || inputPassword2.getAttribute('aria-invalid') === 'true') {
    mostrarErrorCampo(inputPassword2, validarCampoRegistro(inputPassword2));
  }
});

conectarValidacionInteractiva(formulario, validarCampoRegistro);

btnCancelar.addEventListener('click', () => {
  limpiarModoEdicion();
  estadoFormulario.textContent = 'Edición cancelada.';
});

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  estadoFormulario.textContent = '';

  if (!validarFormularioCompleto(formulario, validarCampoRegistro)) {
    return;
  }

  // Nunca se guardan las contraseñas en localStorage
  const datosUsuario = {
    usuario: inputUsuario.value.trim(),
    correo: inputCorreo.value.trim(),
    fechaNacimiento: inputFecha.value,
    aceptaCondiciones: Boolean(inputCondiciones.checked),
  };

  if (idEnEdicion) {
    actualizar(COLECCION_USUARIOS, idEnEdicion, datosUsuario);
    estadoFormulario.textContent = 'Usuario actualizado correctamente.';
  } else {
    crear(COLECCION_USUARIOS, datosUsuario);
    estadoFormulario.textContent = 'Usuario VIP registrado correctamente.';
  }

  limpiarModoEdicion();
  pintarUsuarios();
});

// Delegación de eventos en la lista de usuarios (cero onclick en HTML)
listaUsuarios.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-accion]');
  if (!boton) {
    return;
  }

  const { accion, id } = boton.dataset;
  if (accion === 'editar') {
    iniciarEdicion(id);
    return;
  }

  if (accion === 'borrar') {
    const usuario = obtenerPorId(COLECCION_USUARIOS, id);
    const nombre = usuario ? usuario.usuario : 'este usuario';
    if (window.confirm(`¿Seguro que deseas borrar a ${nombre}?`)) {
      borrar(COLECCION_USUARIOS, id);
      if (idEnEdicion === id) {
        limpiarModoEdicion();
      }
      pintarUsuarios();
    }
  }
});

pintarUsuarios();
