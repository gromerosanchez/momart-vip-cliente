/**
 * Funciones puras de validación para formularios de MOMART VIP.
 * Todas devuelven un string con el mensaje de error o null si el valor es válido.
 */

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_TELEFONO = /^(\+\d{1,3}[\s-]?)?\d{9,12}$/;
const REGEX_MAYUSCULA = /[A-ZÁÉÍÓÚÑ]/;
const REGEX_NUMERO = /\d/;

/**
 * Valida las restricciones semánticas HTML del campo (required, minlength, maxlength, min, max).
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} campo
 * @param {string} etiqueta
 * @returns {string|null}
 */
export function validarAtributosHTML(campo, etiqueta) {
  if (campo.type === 'checkbox') {
    if (campo.required && !campo.checked) {
      return `Debes aceptar ${etiqueta}.`;
    }
    return null;
  }

  const valor = campo.value.trim();

  if (campo.required && !valor) {
    return `El campo ${etiqueta} es obligatorio.`;
  }

  if (!valor) {
    return null;
  }

  const minLength = campo.getAttribute('minlength');
  if (minLength !== null && valor.length < Number(minLength)) {
    return `${etiqueta} debe tener al menos ${minLength} caracteres.`;
  }

  const maxLength = campo.getAttribute('maxlength');
  if (maxLength !== null && campo.value.length > Number(maxLength)) {
    return `${etiqueta} no puede superar ${maxLength} caracteres.`;
  }

  const minAttr = campo.getAttribute('min');
  if (minAttr !== null && valor < minAttr) {
    return `${etiqueta} no puede ser anterior o inferior a ${minAttr}.`;
  }

  const maxAttr = campo.getAttribute('max');
  if (maxAttr !== null && valor > maxAttr) {
    return `${etiqueta} no puede ser posterior o superior a ${maxAttr}.`;
  }

  return null;
}

/**
 * Valida un correo electrónico mediante expresión regular.
 * @param {string} correo
 * @returns {string|null}
 */
export function validarEmail(correo) {
  const limpio = correo.trim();
  if (!limpio) {
    return null;
  }
  if (!REGEX_EMAIL.test(limpio)) {
    return 'Introduce un correo electrónico válido (ej: nombre@dominio.com).';
  }
  return null;
}

/**
 * Valida una contraseña segura (mínimo 8 caracteres, 1 mayúscula y 1 número).
 * @param {string} contrasena
 * @param {number} [longitudMinima=8]
 * @returns {string|null}
 */
export function validarContrasena(contrasena, longitudMinima = 8) {
  if (!contrasena) {
    return null;
  }
  if (contrasena.length < longitudMinima) {
    return `La contraseña debe tener al menos ${longitudMinima} caracteres.`;
  }
  if (!REGEX_MAYUSCULA.test(contrasena)) {
    return 'La contraseña debe incluir al menos una letra mayúscula.';
  }
  if (!REGEX_NUMERO.test(contrasena)) {
    return 'La contraseña debe incluir al menos un número.';
  }
  return null;
}

/**
 * Valida que dos valores coincidan exactamente (por ejemplo, repetir contraseña).
 * @param {string} valor
 * @param {string} valorReferencia
 * @param {string} [mensaje='Los valores no coinciden.']
 * @returns {string|null}
 */
export function validarCoincidencia(valor, valorReferencia, mensaje = 'Las contraseñas no coinciden.') {
  if (!valor) {
    return null;
  }
  if (valor !== valorReferencia) {
    return mensaje;
  }
  return null;
}

/**
 * Valida una fecha de nacimiento en formato ISO (AAAA-MM-DD): no futura y edad mínima.
 * @param {string} fechaIso
 * @param {number} [edadMinima=18]
 * @returns {string|null}
 */
export function validarFechaNacimiento(fechaIso, edadMinima = 18) {
  if (!fechaIso) {
    return null;
  }

  const partes = fechaIso.split('-').map(Number);
  if (partes.length !== 3 || partes.some(Number.isNaN)) {
    return 'Introduce una fecha de nacimiento válida.';
  }

  const [anio, mes, dia] = partes;
  const nacimiento = new Date(anio, mes - 1, dia);
  if (
    nacimiento.getFullYear() !== anio ||
    nacimiento.getMonth() !== mes - 1 ||
    nacimiento.getDate() !== dia
  ) {
    return 'La fecha introducida no es válida.';
  }

  const hoy = new Date();
  const hoySinHora = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  if (nacimiento > hoySinHora) {
    return 'La fecha de nacimiento no puede ser futura.';
  }

  const limiteEdad = new Date(
    hoySinHora.getFullYear() - edadMinima,
    hoySinHora.getMonth(),
    hoySinHora.getDate(),
  );
  if (nacimiento > limiteEdad) {
    return `Debes ser mayor de ${edadMinima} años para registrarte.`;
  }

  return null;
}

/**
 * Valida un número de teléfono si se rellena o si es obligatorio.
 * @param {string} telefono
 * @param {boolean} [obligatorio=false]
 * @returns {string|null}
 */
export function validarTelefono(telefono, obligatorio = false) {
  const limpio = telefono.trim();
  if (!limpio) {
    return obligatorio ? 'El teléfono es obligatorio si prefieres que te llamemos.' : null;
  }
  if (!REGEX_TELEFONO.test(limpio)) {
    return 'Introduce un teléfono válido (ej: 600123456 o +34 600123456).';
  }
  return null;
}
