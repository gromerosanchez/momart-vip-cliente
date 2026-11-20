# MOMART VIP — Carta Digital y Gestión de Reservados

Aplicación web en Vanilla JavaScript (ES6+ Modules) para que los clientes de los reservados VIP de **Momart Theatre Cádiz** realicen pedidos de botellas, combinados, cachimbas y extras desde su mesa, y para que el staff de barra gestione las comandas.

---

## 1. Backlog (funcionalidades ordenadas por prioridad)

| Prioridad | Funcionalidad | Descripción |
| :---: | :--- | :--- |
| **Alta** | Estructura base y ESLint | Montaje del proyecto modular (`index.html`, `css/`, `js/datos.js`, `js/ui.js`, `js/main.js`) y validación sin errores con ESLint. |
| **Alta** | Menú de navegación | Cabecera común con enlaces funcionales a todas las vistas del mapa de pantallas. |
| **Alta** | Catálogo dinámico (listado de productos) | Renderizado automático de tarjetas de producto desde `datos.js` con categoría, precio y disponibilidad. |
| **Alta** | Vista de detalle de producto | Ficha completa al seleccionar un producto (descripción, precio, refrescos incluidos, stock y botón de volver). |
| **Media** | Filtro por categoría | Filtrado dinámico de la carta según la categoría seleccionada (Botellas Premium, Copas, Hielos y Extras, Cachimbas). |
| **Media** | Buscador de productos | Búsqueda en tiempo real por nombre o descripción del producto. |
| **Media** | Carrito de mesa | Añadir/quitar productos del reservado, ajustar cantidades y calcular el importe total. |
| **Media** | Validación de refrescos incluidos | Selección y control de los refrescos incluidos con cada botella y cálculo de extras adicionales. |
| **Baja** | Confirmación y seguimiento del pedido | Envío de la comanda del reservado y consulta del estado (`Pendiente`, `En preparación`, `En camino`, `Entregado`). |
| **Baja** | Panel de barra | Vista para que el personal de barra consulte las comandas activas por mesa y actualice su estado. |
| **Baja** | Conversión completa a SPA | Navegación entre todas las vistas sin recargar la página. |

---

## 2. Mapa de pantallas

| Pantalla / Vista | Archivo | Datos que muestra |
| :--- | :--- | :--- |
| **Carta Digital VIP** | `index.html` (`#vista-listado`) | Listado dinámico de productos en tarjetas: categoría, nombre, precio en euros, disponibilidad en barra y botón para ver la ficha completa. |
| **Detalle de Producto** | `index.html` (`#vista-detalle`) | Ficha completa del producto seleccionado: categoría, nombre, descripción, precio, acompañamientos incluidos, estado en barra y botón para volver al listado. |
| **Mi Mesa / Carrito** | `carrito.html` | Resumen de productos añadidos al reservado, cantidades, selección de refrescos incluidos, importe total y confirmación de pedido *(en construcción)*. |
| **Estado del Pedido** | `tracking.html` | Número de comanda, mesa/reservado, resumen del pedido y estado actual de preparación o entrega *(en construcción)*. |
| **Panel de Barra** | `barra.html` | Listado de comandas activas por reservado, detalle de botellas/extras solicitados y controles para cambiar el estado del pedido *(en construcción)*. |
