# MOMART VIP — Carta Digital y Gestión de Reservados

Aplicación web en Vanilla JavaScript (ES6+ Modules) para que los clientes de los reservados VIP de **Momart Theatre Cádiz** realicen pedidos de botellas, combinados, cachimbas y extras desde su mesa, y para que el staff de barra gestione las comandas en tiempo real.

---

## 1. Backlog priorizado por hitos

| Hito | Prioridad | Alcance y funcionalidades |
| :--- | :---: | :--- |
| **Hito 1** | Alta | Estructura modular (`index.html`, `css/`, `js/`), configuración de ESLint (0 errores), navegación multipágina entre vistas, catálogo dinámico desde `datos.js` y vista de detalle de producto. |
| **Hito 2** | Alta | Filtros dinámicos por categoría (Botellas Premium, Copas y Combinados, Hielos y Extras, Cachimbas) y buscador en tiempo real sobre el catálogo. |
| **Hito 3** | Media | Carrito de mesa interactivo: añadir/eliminar productos, ajuste de cantidades, cálculo de subtotal y validación de refrescos incluidos y extras. |
| **Hito 4** | Media | Simulación del flujo de pago de mesa, generación de número de comanda y pantalla de seguimiento del estado del pedido. |
| **Hito 5** | Baja | Conversión completa a SPA (Single Page Application) sin recargas y Panel de Barra para gestionar, preparar y entregar comandas. |

---

## 2. Mapa de pantallas

| Pantalla / Vista | Archivo (Hito 1) | Datos que muestra |
| :--- | :--- | :--- |
| **Carta Digital VIP** | `index.html` (`#vista-listado`) | Listado dinámico de productos en tarjetas: categoría, nombre, precio en euros, disponibilidad en barra y botón para ver ficha completa. |
| **Detalle de Producto** | `index.html` (`#vista-detalle`) | Ficha completa del producto seleccionado: categoría, nombre, descripción, precio, número de refrescos incluidos, estado de stock y botón de volver al listado. |
| **Carrito de Mesa** | `carrito.html` | Resumen de productos añadidos al reservado, selector de refrescos incluidos, cantidades, total a pagar y confirmación de pedido *(en construcción hasta Hito 3)*. |
| **Seguimiento Pedido** | `tracking.html` | Estado en tiempo real de la comanda del reservado (`Pendiente`, `En preparación`, `En camino`, `Entregado`) y hora estimada *(en construcción hasta Hito 4)*. |
| **Panel de Barra** | `barra.html` | Cola de comandas activas por número de reservado, detalle de botellas/extras solicitados y controles para cambiar el estado del pedido *(en construcción hasta Hito 5)*. |
