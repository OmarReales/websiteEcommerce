// Registrar Service Worker para funcionalidad offline (PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registrado con éxito:", registration.scope);
      })
      .catch((error) => {
        console.log("Error al registrar el Service Worker:", error);
      });
  });
}

// Agregar funcionalidad para prevenir imágenes rotas en todo el sitio
document.addEventListener("DOMContentLoaded", function () {
  // Verificar y corregir imágenes de fondo de los banners
  const fixBannerBackgrounds = () => {
    const bannerBoxes = document.querySelectorAll("#banner3 .banner-box");
    bannerBoxes.forEach((box) => {
      // Verificar si la imagen de fondo se cargó correctamente
      const bgImage = getComputedStyle(box).backgroundImage;
      if (bgImage === "none" || !bgImage.includes("url")) {
        // Determinar qué imagen debe tener según su clase
        if (box.classList.contains("banner-box3")) {
          box.style.backgroundImage = 'url("./img/banner/b18.jpg")';
        } else if (box.classList.contains("banner-box2")) {
          box.style.backgroundImage = 'url("./img/banner/b4.jpg")';
        } else {
          box.style.backgroundImage = 'url("./img/banner/b7.png")';
        }

        // Configurar un evento para detectar si la imagen falló al cargar
        const img = new Image();
        img.onload = () => console.log("Banner image loaded successfully");
        img.onerror = () => {
          // Si falla la carga, usar el placeholder
          box.style.backgroundImage = 'url("./img/banner/placeholder.svg")';
          console.log("Fallback to placeholder");
        };

        // Extraer la URL de la imagen del estilo
        const styleUrl = box.style.backgroundImage.match(
          /url\(['"]?([^'")]+)['"]?\)/
        );
        if (styleUrl && styleUrl[1]) {
          img.src = styleUrl[1];
        }
      }
    });
  };

  // Ejecutar después de un pequeño retraso para asegurar que los estilos se han aplicado
  setTimeout(fixBannerBackgrounds, 300);

  // Configurar lazy loading para imágenes
  const lazyLoadImages = () => {
    const imgOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px 50px 0px",
    };

    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");

          // Solo cambiar la fuente si existe data-src
          if (src) {
            img.src = src;
            img.classList.add("loaded");
            observer.unobserve(img);
          }
        }
      });
    }, imgOptions);

    // Seleccionar todas las imágenes con data-src
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imgObserver.observe(img));
  };

  // Convertir imágenes normales en lazy loading
  const setupLazyLoadingForAllImages = () => {
    const images = document.querySelectorAll("img:not([data-src])");
    images.forEach((img) => {
      if (img.src && !img.dataset.src && !img.classList.contains("logo")) {
        img.dataset.src = img.src;
        img.src =
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'; // Tiny placeholder
        img.classList.add("lazy");
      }
    });

    lazyLoadImages();
  };

  // Ejecutar después de un pequeño retraso para no bloquear la carga inicial
  setTimeout(setupLazyLoadingForAllImages, 100);

  // Arreglar imágenes rotas
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.onerror = function () {
      this.onerror = null;
      // Usar ruta relativa correcta según la ubicación
      const path = window.location.pathname.includes("/pages/")
        ? "../img/banner/placeholder.svg"
        : "img/banner/placeholder.svg";
      this.src = path;
      if (!this.getAttribute("alt")) {
        this.alt = "Imagen no disponible";
      }
    };
  });

  // Añadir efectos hover a los banners
  const bannerBoxes = document.querySelectorAll(".banner-box");

  bannerBoxes.forEach((box) => {
    box.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)";
    });

    box.addEventListener("mouseleave", function () {
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    });
  });

  // Mejora de accesibilidad - añadir atributos ARIA
  const cartButtons = document.querySelectorAll(".fa-cart-shopping");
  cartButtons.forEach((button) => {
    if (button.parentElement.tagName === "A") {
      button.parentElement.setAttribute("aria-label", "Añadir al carrito");
    }
  });

  // Añadir funcionalidad para mensajes de stock
  const productsContainer = document.querySelectorAll(".pro");
  productsContainer.forEach((product) => {
    product.addEventListener("click", function (e) {
      if (e.target.classList.contains("fa-cart-shopping")) {
        e.preventDefault();
        // Mostrar notificación de añadido al carrito usando SweetAlert
        Swal.fire({
          title: "¡Producto añadido!",
          text: "El producto se ha añadido a tu carrito",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          confirmButtonText: "Continuar",
          confirmButtonColor: "#088178",
        });
      }
    });
  });

  // Añadir botón "volver arriba"
  const addBackToTopButton = () => {
    const backToTopBtn = document.createElement("button");
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = "back-to-top";
    backToTopBtn.setAttribute("aria-label", "Volver arriba");
    document.body.appendChild(backToTopBtn);

    // Mostrar/ocultar botón según scroll
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    // Acción de scroll suave al hacer clic
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  addBackToTopButton();

  // Añadir modo oscuro con botón y persistencia
  const addDarkModeToggle = () => {
    // Crear botón para el modo oscuro
    const darkModeBtn = document.createElement("button");
    darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeBtn.className = "dark-mode-toggle";
    darkModeBtn.setAttribute("aria-label", "Activar/desactivar modo oscuro");
    document.body.appendChild(darkModeBtn);

    // Comprobar preferencia guardada
    const isDarkMode = localStorage.getItem("darkMode") === "true";

    // Aplicar modo al cargar
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle al hacer clic
    darkModeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDark);
      darkModeBtn.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    });
  };

  addDarkModeToggle();
});
