# E-Commerce Website

Una tienda en línea moderna desarrollada con HTML, CSS y JavaScript vanilla.

## Estructura de Archivos

El proyecto está organizado en varios archivos y carpetas principales:

- **index.html**: Página principal del sitio web.
- **index.js**: Contiene funciones JavaScript para manejar la navegación y cargar productos desde products.json.
- **products.json**: Almacena la información de los productos en formato JSON.
- **styles.css**: Hoja de estilos para el diseño del sitio web.
- **styles-extra.css**: Hoja de estilos adicional con mejoras visuales y optimizaciones.
- **img/**: Carpeta que contiene todas las imágenes utilizadas en el sitio web.
- **pages/**: Carpeta que contiene las páginas secundarias del sitio web como shop.html, sproduct.html, etc.
- **JS/**: Carpeta que contiene los archivos javascript como cart.js, email.js, details.js y app.js.

## Funcionalidades Principales

### Navegación del Menú en Mobile

- Al hacer clic en el icono de menú (#bar), se muestra el menú de navegación (#navbar).
- Al hacer clic en el botón de cerrar (#close), se oculta el menú de navegación.
- Menú responsive adaptado a diferentes tamaños de pantalla.

### Carga Dinámica de Productos

- Se utiliza fetch() para obtener datos del archivo products.json según la ruta actual.
- Se convierte el precio de los productos multiplicando el valor del dólar en pesos ARS a la moneda USD.
- API de cotización del dólar: [dolarApi](https://dolarapi.com/v1/dolares/blue).
- Manejo de errores en la carga de imágenes con imágenes de respaldo.

### Detalles del Producto

- En la página sproduct.html, se muestran detalles específicos del producto seleccionado almacenado en localStorage.
- Galería de imágenes con vista previa y zoom.
- Cálculo dinámico de precios según el valor del dólar actual.

### Carrito de Compras

- Permite agregar productos al carrito desde la página de detalles del producto.
- Gestiona el stock disponible y muestra mensajes de error si la cantidad solicitada supera el stock.
- Aplica descuentos mediante códigos de cupón (DESCUENTO50, ENVIOGRATIS) que modifican el costo total.
- Notificaciones interactivas con SweetAlert2.

### Mejoras Implementadas (2024)

- Corrección de rutas de imágenes y manejo de errores.
- Sistema de fallback para imágenes no disponibles.
- Mejoras visuales con efectos hover y transiciones.
- Optimización para dispositivos móviles y tablets.
- Variables CSS para facilitar personalización.
- Mejor manejo de excepciones en las API.

### Mejoras Implementadas (Mayo 2025)

- Implementación de Progressive Web App (PWA) para funcionalidad offline
- Servicio de caché con Service Worker para mejorar rendimiento
- Lazy loading de imágenes para optimizar el tiempo de carga
- Modo oscuro con persistencia en localStorage
- Gestor de carrito mejorado con animaciones y notificaciones toast
- Botón "volver arriba" para mejor navegación en páginas largas
- Optimización de imágenes con soporte para formato WebP
- Mejoras de accesibilidad (atributos ARIA, fallback noscript)
- Schema.org y Open Graph para mejorar SEO y compartir en redes sociales
- Sistema de skeleton loading para mejorar la percepción de carga

## Características Técnicas

### Progressive Web App (PWA)

El sitio puede instalarse como una aplicación nativa en dispositivos móviles y funcionar sin conexión gracias a:

- Service Worker para cachear recursos estáticos
- Manifest.json para configurar la experiencia de instalación
- Iconos adaptados para diferentes tamaños de pantalla

### Optimización de Rendimiento

- Lazy loading de imágenes mediante Intersection Observer API
- Precarga de recursos críticos con `<link rel="preload">`
- Detección y uso de WebP cuando el navegador lo soporta
- Minimización del bloqueo del renderizado

### Mejoras UX/UI

- Animaciones sutiles controladas con `prefers-reduced-motion`
- Notificaciones toast para mejor feedback al usuario
- Persistencia de datos del carrito mediante localStorage
- Transiciones suaves entre estados de la interfaz

### Accesibilidad

- Atributos ARIA para elementos interactivos
- Fallback para navegadores sin JavaScript
- Alto contraste en modo oscuro para mejorar legibilidad
- Navegación por teclado mejorada

### Soporte de navegadores

- Compatibilidad total: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- Compatibilidad parcial con IE11 (funcionalidad básica)

## Instalación y Uso

1. Clona este repositorio
2. Abre index.html en tu navegador
3. No requiere servidor, funciona localmente

## Créditos

Desarrollado por Omar Reales

- Envío de Correos Electrónicos:

  Utiliza EmailJS para enviar mensajes de consulta desde un formulario.

  Muestra una confirmación visual al usuario después de enviar el mensaje.

## Consideraciones Finales

Rutas Dinámicas: Las funciones getJsonPath() y getImagePath() ajustan dinámicamente las rutas de los archivos según la página actual.
