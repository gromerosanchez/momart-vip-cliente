/**
 * Busca el nombre de la categoría correspondiente a un categoriaId.
 * @param {Array<{id: number, nombre: string}>} categorias
 * @param {number} categoriaId
 * @returns {string}
 */
function obtenerNombreCategoria(categorias, categoriaId) {
  const categoria = categorias.find((c) => c.id === categoriaId);
  return categoria ? categoria.nombre : 'General';
}

/**
 * Renderiza dinámicamente el listado de tarjetas de producto en el contenedor indicado.
 * @param {Array<Object>} productos
 * @param {Array<Object>} categorias
 * @param {HTMLElement} contenedor
 * @param {Function} alSeleccionar
 */
export function pintarListado(productos, categorias, contenedor, alSeleccionar) {
  contenedor.innerHTML = '';

  productos.forEach((producto) => {
    const nombreCategoria = obtenerNombreCategoria(categorias, producto.categoriaId);
    const claseStock = producto.stock ? 'disponible' : 'agotado';
    const textoStock = producto.stock ? 'Disponible' : 'Agotado';

    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta-producto';

    tarjeta.innerHTML = `
      <span class="badge-categoria">${nombreCategoria}</span>
      <h3>${producto.nombre}</h3>
      <p class="precio">${producto.precio} €</p>
      <p class="estado-stock ${claseStock}">${textoStock}</p>
      <button type="button" class="btn-detalle" ${!producto.stock ? 'disabled' : ''}>
        Ver ficha completa
      </button>
    `;

    const boton = tarjeta.querySelector('.btn-detalle');
    boton.addEventListener('click', () => alSeleccionar(producto, nombreCategoria));

    contenedor.appendChild(tarjeta);
  });
}

/**
 * Renderiza la ficha completa de detalle de un producto en el contenedor indicado.
 * @param {Object} producto
 * @param {string} nombreCategoria
 * @param {HTMLElement} contenedor
 */
export function pintarDetalle(producto, nombreCategoria, contenedor) {
  const textoStock = producto.stock ? 'En stock' : 'Sin stock';

  contenedor.innerHTML = `
    <article class="ficha-detalle">
      <span class="badge-categoria">${nombreCategoria}</span>
      <h2>${producto.nombre}</h2>
      <p class="descripcion">${producto.descripcion}</p>
      <ul>
        <li><strong>Precio:</strong> ${producto.precio} €</li>
        <li><strong>Acompañamientos incluidos:</strong> ${producto.refrescosIncluidos} refrescos</li>
        <li><strong>Estado en barra:</strong> ${textoStock}</li>
      </ul>
      <button type="button" class="btn-principal">Añadir a la mesa (Próximamente)</button>
    </article>
  `;
}
