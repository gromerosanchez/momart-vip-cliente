# MOMART VIP — Carta Digital y Gestión de Reservados

Aplicación web en Vanilla JavaScript (ES6+ Modules) para que los clientes de los reservados VIP de **Momart Theatre Cádiz** realicen pedidos de botellas, combinados, cachimbas y extras desde su mesa, y para que el staff de barra gestione las comandas.

---

## 1. Backlog (funcionalidades ordenadas por prioridad)

| Prioridad | Estado | Funcionalidad | Descripción |
| :---: | :---: | :--- | :--- |
| **Alta** | ✅ Completado | Estructura base y ESLint | Montaje del proyecto modular (`index.html`, `css/`, `js/datos.js`, `js/ui.js`, `js/main.js`) y validación sin errores con ESLint. |
| **Alta** | ✅ Completado | Menú de navegación | Cabecera común con enlaces funcionales a todas las vistas del mapa de pantallas. |
| **Alta** | ✅ Completado | Catálogo dinámico (listado de productos) | Renderizado automático de tarjetas de producto desde `datos.js` con categoría, precio y disponibilidad. |
| **Alta** | ✅ Completado | Vista de detalle de producto | Ficha completa al seleccionar un producto (descripción, precio, refrescos incluidos, stock y botón de volver). |
| **Alta** | ✅ Completado | Persistencia y validación modular | Módulo `almacen.js` sobre `localStorage` y funciones puras de validación en `validacion.js`. |
| **Alta** | ✅ Completado | Registro y CRUD de usuarios VIP | Formulario con validación en tiempo real, edición sin duplicados y borrado con confirmación (`registro.html`). |
| **Alta** | ✅ Completado | Contacto VIP y cookies | Formulario de contacto con teléfono condicional, contador de caracteres, mensajes enviados y cookie de autorrelleno (`contacto.html`). |
| **Media** | ⏳ Pendiente | Filtro por categoría | Filtrado dinámico de la carta según la categoría seleccionada (Botellas Premium, Copas, Hielos y Extras, Cachimbas). |
| **Media** | ⏳ Pendiente | Buscador de productos | Búsqueda en tiempo real por nombre o descripción del producto. |
| **Media** | ⏳ Pendiente | Carrito de mesa | Añadir/quitar productos del reservado, ajustar cantidades y calcular el importe total. |
| **Media** | ⏳ Pendiente | Validación de refrescos incluidos | Selección y control de los refrescos incluidos con cada botella y cálculo de extras adicionales. |
| **Baja** | ⏳ Pendiente | Confirmación y seguimiento del pedido | Envío de la comanda del reservado y consulta del estado (`Pendiente`, `En preparación`, `En camino`, `Entregado`). |
| **Baja** | ⏳ Pendiente | Panel de barra | Vista para que el personal de barra consulte las comandas activas por mesa y actualice su estado. |
| **Baja** | ⏳ Pendiente | Conversión completa a SPA | Navegación entre todas las vistas sin recargar la página. |

---

## 2. Mapa de pantallas

| Pantalla / Vista | Archivo | Datos que muestra |
| :--- | :--- | :--- |
| **Carta Digital VIP** | `index.html` (`#vista-listado`) | Listado dinámico de productos en tarjetas: categoría, nombre, precio en euros, disponibilidad en barra y botón para ver la ficha completa. |
| **Detalle de Producto** | `index.html` (`#vista-detalle`) | Ficha completa del producto seleccionado: categoría, nombre, descripción, precio, acompañamientos incluidos, estado en barra y botón para volver al listado. |
| **Registro VIP** | `registro.html` | Formulario de alta/edición de usuarios VIP (sin guardar contraseñas) y listado CRUD con botones Editar y Borrar. |
| **Contacto VIP** | `contacto.html` | Formulario de contacto VIP con autorrelleno mediante cookie, contador de caracteres y listado de mensajes enviados con opción de borrado. |
| **Mi Mesa / Carrito** | `carrito.html` | Resumen de productos añadidos al reservado, cantidades, selección de refrescos incluidos, importe total y confirmación de pedido *(en construcción)*. |
| **Estado del Pedido** | `tracking.html` | Número de comanda, mesa/reservado, resumen del pedido y estado actual de preparación o entrega *(en construcción)*. |
| **Panel de Barra** | `barra.html` | Listado de comandas activas por reservado, detalle de botellas/extras solicitados y controles para cambiar el estado del pedido *(en construcción)*. |

---

## Hito 2

### Mapa de validación

| Formulario | Campo | Regla | Mensaje de error |
| :--- | :--- | :--- | :--- |
| Registro | Nombre de usuario | `required`, `minlength="3"`, `maxlength="30"` | `El campo nombre de usuario es obligatorio.` / `nombre de usuario debe tener al menos 3 caracteres.` |
| Registro | Correo electrónico | `required`, formato email por regex | `Introduce un correo electrónico válido (ej: nombre@dominio.com).` |
| Registro | Contraseña | `required`, mín. 8 caracteres, 1 mayúscula y 1 número | `La contraseña debe tener al menos 8 caracteres.` / `...al menos una letra mayúscula.` / `...al menos un número.` |
| Registro | Repetir contraseña | `required`, coincidencia exacta con contraseña | `Las contraseñas no coinciden.` |
| Registro | Fecha de nacimiento | `required`, fecha ISO no futura y edad ≥ 18 años | `La fecha de nacimiento no puede ser futura.` / `Debes ser mayor de 18 años para registrarte.` |
| Registro | Aceptar condiciones | `required` (checkbox marcado) | `Debes aceptar las condiciones de acceso.` |
| Contacto | Nombre | `required`, `minlength="2"`, `maxlength="60"` | `El campo nombre es obligatorio.` / `nombre debe tener al menos 2 caracteres.` |
| Contacto | Correo electrónico | `required`, formato email por regex | `Introduce un correo electrónico válido (ej: nombre@dominio.com).` |
| Contacto | Teléfono | Opcional salvo si se marca *Prefiero que me llaméis*; regex numérico | `El teléfono es obligatorio si prefieres que te llamemos.` / `Introduce un teléfono válido (ej: 600123456 o +34 600123456).` |
| Contacto | Motivo | `required` (opción distinta de vacío) | `El campo motivo de la consulta es obligatorio.` |
| Contacto | Mensaje | `required`, `minlength="10"`, `maxlength="300"` | `El campo mensaje es obligatorio.` / `mensaje debe tener al menos 10 caracteres.` |

### Resumen del Hito 2

- **Qué se ha hecho**: capa de persistencia en `js/almacen.js` sobre `localStorage`, funciones puras de validación en `js/validacion.js`, utilidades accesibles de error (`aria-invalid` + `aria-describedby`) en `js/ui.js`, página `registro.html` con CRUD completo sin guardar contraseñas, página `contacto.html` con teléfono condicional, contador de caracteres, cookie con caducidad y delegación de eventos, además de estilos responsive en `css/styles.css`.
- **Qué falta**: filtros por categoría y buscador en la carta, carrito de mesa con validación de refrescos, seguimiento de pedido, panel de barra y unificación en SPA.
- **Qué ha costado más**: coordinar la validación en tiempo real (`blur` + `input`) entre campos dependientes (como la coincidencia de contraseñas y la obligatoriedad dinámica del teléfono según el checkbox de llamada) manteniendo el mismo formulario reutilizable para crear y editar registros sin duplicarlos.
