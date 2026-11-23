/**
 * Capa de persistencia sobre localStorage para las colecciones de MOMART VIP.
 */

/**
 * Genera un identificador único para nuevos registros.
 * @returns {string}
 */
function generarId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Guarda un array completo de registros en localStorage.
 * @param {string} coleccion
 * @param {Array<Object>} registros
 */
function guardarColeccion(coleccion, registros) {
  localStorage.setItem(coleccion, JSON.stringify(registros));
}

/**
 * Obtiene todos los registros de una colección almacenada en localStorage.
 * @param {string} coleccion
 * @returns {Array<Object>}
 */
export function obtenerTodos(coleccion) {
  const bruto = localStorage.getItem(coleccion);
  if (!bruto) {
    return [];
  }

  try {
    const parsed = JSON.parse(bruto);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Busca y devuelve un registro por su id dentro de una colección.
 * @param {string} coleccion
 * @param {string|number} id
 * @returns {Object|null}
 */
export function obtenerPorId(coleccion, id) {
  const registros = obtenerTodos(coleccion);
  return registros.find((item) => String(item.id) === String(id)) ?? null;
}

/**
 * Crea un nuevo registro en la colección asignándole un id único si no lo tiene.
 * @param {string} coleccion
 * @param {Object} dato
 * @returns {Object}
 */
export function crear(coleccion, dato) {
  const registros = obtenerTodos(coleccion);
  const nuevo = {
    ...dato,
    id: dato.id ?? generarId(),
  };
  registros.push(nuevo);
  guardarColeccion(coleccion, registros);
  return nuevo;
}

/**
 * Actualiza un registro existente por su id dentro de la colección.
 * @param {string} coleccion
 * @param {string|number} id
 * @param {Object} dato
 * @returns {Object|null}
 */
export function actualizar(coleccion, id, dato) {
  const registros = obtenerTodos(coleccion);
  const indice = registros.findIndex((item) => String(item.id) === String(id));
  if (indice === -1) {
    return null;
  }

  const actualizado = {
    ...registros[indice],
    ...dato,
    id: registros[indice].id,
  };
  registros[indice] = actualizado;
  guardarColeccion(coleccion, registros);
  return actualizado;
}

/**
 * Elimina un registro por su id de la colección.
 * @param {string} coleccion
 * @param {string|number} id
 * @returns {boolean}
 */
export function borrar(coleccion, id) {
  const registros = obtenerTodos(coleccion);
  const filtrados = registros.filter((item) => String(item.id) !== String(id));
  if (filtrados.length === registros.length) {
    return false;
  }

  guardarColeccion(coleccion, filtrados);
  return true;
}
