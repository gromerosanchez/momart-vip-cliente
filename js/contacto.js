import { obtenerTodos, obtenerPorId, crear, borrar } from './almacen.js';
import {
  validarAtributosHTML,
  validarEmail,
  validarTelefono,
} from './validacion.js';
import {
  mostrarErrorCampo,
  conectarValidacionInteractiva,
  validarFormularioCompleto,
} from './ui.js';

const COLECCION_MENSAJES = 'mensajesContacto';
const NOMBRE_COOKIE_CONTACTO = 'momart_vip_contacto';
const DIAS_CADUCIDAD_COOKIE = 7;

const MOTIVOS_TEXTO = {
  'reserva-mesa': 'Reservar mesa / reservado VIP',
  'consulta-carta': 'Consulta sobre botellas o cachimbas',
  'incidencia-pedido': 'Incidencia con un pedido',
  'evento-privado': 'Evento privado o cumpleaños',
  otro: 'Otra consulta',
};

const formulario = document.querySelector('#form-contacto');
const inputNombre = document.querySelector('#con-nombre');
const inputCorreo = document.querySelector('#con-correo');
const inputTelefono = document.querySelector('#con-telefono');
const etiquetaTelefonoOpcional = document.querySelector('#etiqueta-telefono-opcional');
const checkLlamar = document.querySelector('#con-llamar');
const selectMotivo = document.querySelector('#con-motivo');
const textareaMensaje = document.querySelector('#con-mensaje');
const contadorMensaje = document.querySelector('#contador-mensaje');
const estadoContacto = document.querySelector('#estado-contacto');
const listaMensajes = document.querySelector('#lista-mensajes');

/**
 * Guarda en una cookie con caducidad el nombre y correo del último envío válido.
 * @param {string} nombre
 * @param {string} correo
 */
function guardarCookieContacto(nombre, correo) {
  const maxAgeSegundos = DIAS_CADUCIDAD_COOKIE * 24 * 60 * 60;
  const valor = encodeURIComponent(JSON.stringify({ nombre, correo }));
  document.cookie = `${NOMBRE_COOKIE_CONTACTO}=${valor}; max-age=${maxAgeSegundos}; path=/; SameSite=Lax`;
}

/**
 * Lee de document.cookie el nombre y correo guardados, si existen.
 * @returns {{nombre?: string, correo?: string}|null}
 */
function leerCookieContacto() {
  const cookies = document.cookie ? document.cookie.split('; ') : [];
  const encontrada = cookies.find((c) => c.startsWith(`${NOMBRE_COOKIE_CONTACTO}=`));
  if (!encontrada) {
    return null;
  }

  try {
    const valorBruto = encontrada.slice(NOMBRE_COOKIE_CONTACTO.length + 1);
    return JSON.parse(decodeURIComponent(valorBruto));
  } catch {
    return null;
  }
}

/**
 * Rellena nombre y correo con los datos de la cookie al cargar la página.
 */
function autorrellenarDesdeCookie() {
  const datos = leerCookieContacto();
  if (!datos) {
    return;
  }
  if (datos.nombre) {
    inputNombre.value = datos.nombre;
  }
  if (datos.correo) {
    inputCorreo.value = datos.correo;
  }
}

/**
 * Actualiza el contador de caracteres del mensaje en tiempo real.
 */
function actualizarContadorMensaje() {
  const max = Number(textareaMensaje.getAttribute('maxlength') || 300);
  const actual = textareaMensaje.value.length;
  contadorMensaje.textContent = `${actual} / ${max}`;
  contadorMensaje.classList.toggle('limite', actual >= max);
}

/**
 * Sincroniza la obligatoriedad del teléfono según el checkbox "Prefiero que me llaméis".
 */
function sincronizarTelefonoObligatorio() {
  const obligatorio = checkLlamar.checked;
  inputTelefono.required = obligatorio;
  etiquetaTelefonoOpcional.textContent = obligatorio ? '(obligatorio)' : '(opcional)';
}

/**
 * Valida un campo del formulario de contacto.
 * @param {HTMLElement} campo
 * @returns {string|null}
 */
function validarCampoContacto(campo) {
  const etiquetas = {
    nombre: 'nombre',
    correo: 'correo electrónico',
    telefono: 'teléfono',
    motivo: 'motivo de la consulta',
    mensaje: 'mensaje',
  };

  if (campo === checkLlamar) {
    return null;
  }

  if (campo === inputTelefono) {
    return validarTelefono(campo.value, checkLlamar.checked);
  }

  const etiqueta = etiquetas[campo.name] ?? campo.name;
  const errorHTML = validarAtributosHTML(campo, etiqueta);
  if (errorHTML) {
    return errorHTML;
  }

  if (campo === inputCorreo) {
    return validarEmail(campo.value);
  }

  return null;
}

/**
 * Renderiza la lista dinámica de mensajes enviados.
 */
function pintarMensajes() {
  const mensajes = obtenerTodos(COLECCION_MENSAJES);
  listaMensajes.innerHTML = '';

  if (mensajes.length === 0) {
    const vacio = document.createElement('p');
    vacio.className = 'lista-vacia';
    vacio.textContent = 'No hay mensajes enviados todavía.';
    listaMensajes.appendChild(vacio);
    return;
  }

  mensajes.forEach((item) => {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta-registro';

    const titulo = document.createElement('h3');
    titulo.textContent = `${item.nombre} — ${MOTIVOS_TEXTO[item.motivo] ?? item.motivo}`;

    const correo = document.createElement('p');
    correo.textContent = `Correo: ${item.correo}${item.telefono ? ` · Tel: ${item.telefono}` : ''}`;

    const preferencia = document.createElement('p');
    preferencia.textContent = `Prefiere llamada: ${item.prefiereLlamada ? 'Sí' : 'No'}`;

    const texto = document.createElement('p');
    texto.textContent = item.mensaje;

    const acciones = document.createElement('div');
    acciones.className = 'acciones-registro';

    const btnBorrar = document.createElement('button');
    btnBorrar.type = 'button';
    btnBorrar.className = 'btn-peligro';
    btnBorrar.dataset.accion = 'borrar';
    btnBorrar.dataset.id = item.id;
    btnBorrar.textContent = 'Borrar';

    acciones.appendChild(btnBorrar);
    tarjeta.append(titulo, correo, preferencia, texto, acciones);
    listaMensajes.appendChild(tarjeta);
  });
}

textareaMensaje.addEventListener('input', actualizarContadorMensaje);

checkLlamar.addEventListener('change', () => {
  sincronizarTelefonoObligatorio();
  if (
    inputTelefono.dataset.tocado === 'true' ||
    inputTelefono.getAttribute('aria-invalid') === 'true' ||
    checkLlamar.checked
  ) {
    mostrarErrorCampo(inputTelefono, validarCampoContacto(inputTelefono));
  }
});

conectarValidacionInteractiva(formulario, validarCampoContacto);

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  estadoContacto.textContent = '';

  if (!validarFormularioCompleto(formulario, validarCampoContacto)) {
    return;
  }

  const nombre = inputNombre.value.trim();
  const correo = inputCorreo.value.trim();

  crear(COLECCION_MENSAJES, {
    nombre,
    correo,
    telefono: inputTelefono.value.trim(),
    prefiereLlamada: Boolean(checkLlamar.checked),
    motivo: selectMotivo.value,
    mensaje: textareaMensaje.value.trim(),
    fechaEnvio: new Date().toISOString(),
  });

  guardarCookieContacto(nombre, correo);

  formulario.reset();
  sincronizarTelefonoObligatorio();
  actualizarContadorMensaje();

  formulario.querySelectorAll('input, select, textarea').forEach((campo) => {
    delete campo.dataset.tocado;
    mostrarErrorCampo(campo, null);
  });

  autorrellenarDesdeCookie();
  estadoContacto.textContent = 'Mensaje enviado correctamente al equipo de Momart VIP.';
  pintarMensajes();
});

// Delegación de eventos para borrar mensajes enviados
listaMensajes.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-accion="borrar"]');
  if (!boton) {
    return;
  }

  const { id } = boton.dataset;
  const registro = obtenerPorId(COLECCION_MENSAJES, id);
  const autor = registro ? registro.nombre : 'este mensaje';
  if (window.confirm(`¿Seguro que deseas borrar el mensaje de ${autor}?`)) {
    borrar(COLECCION_MENSAJES, id);
    pintarMensajes();
  }
});

autorrellenarDesdeCookie();
sincronizarTelefonoObligatorio();
actualizarContadorMensaje();
pintarMensajes();
