import { categorias, productos } from './datos.js';
import { pintarListado, pintarDetalle } from './ui.js';

const seccionListado = document.querySelector('#vista-listado');
const seccionDetalle = document.querySelector('#vista-detalle');
const contenedorProductos = document.querySelector('#contenedor-productos');
const contenedorDetalle = document.querySelector('#contenedor-detalle');
const btnVolver = document.querySelector('#btn-volver');

/**
 * Muestra la ficha de detalle del producto seleccionado y oculta el listado.
 * @param {Object} producto
 * @param {string} nombreCategoria
 */
function mostrarDetalle(producto, nombreCategoria) {
  pintarDetalle(producto, nombreCategoria, contenedorDetalle);
  seccionListado.classList.add('oculto');
  seccionDetalle.classList.remove('oculto');
}

btnVolver.addEventListener('click', () => {
  seccionDetalle.classList.add('oculto');
  seccionListado.classList.remove('oculto');
});

pintarListado(productos, categorias, contenedorProductos, mostrarDetalle);
