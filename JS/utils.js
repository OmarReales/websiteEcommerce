// Loading Indicator para llamadas API
function showLoading() {
  Swal.fire({
    title: "Cargando...",
    text: "Por favor espere",
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });
}

function hideLoading() {
  Swal.close();
}

// Lazy loading de imágenes
function setupLazyLoading() {
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add("loaded");
            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback para navegadores que no soportan IntersectionObserver
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
    });
  }
}

// Validación de formularios
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  const re = /^\d{7,15}$/;
  return re.test(String(phone));
}

// Mensaje de éxito personalizado
function showSuccess(title, message) {
  Swal.fire({
    title: title,
    text: message,
    icon: "success",
    confirmButtonColor: "#088178",
  });
}

// Mensaje de error personalizado
function showError(title, message) {
  Swal.fire({
    title: title,
    text: message,
    icon: "error",
    confirmButtonColor: "#088178",
  });
}

// Confirmación personalizada
// Función para verificar soporte de WebP y optimizar imágenes
async function checkWebPSupport() {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.src =
      "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=";
    webP.onload = webP.onerror = function () {
      resolve(webP.height === 1);
    };
  });
}

// Obtener la mejor versión de una imagen según soporte del navegador
async function getOptimizedImagePath(imgPath) {
  const supportsWebP = await checkWebPSupport();
  if (supportsWebP && imgPath && !imgPath.includes(".svg")) {
    // Convertir extensión a WebP si existe
    const webpPath = imgPath.replace(/\.(jpe?g|png)$/i, ".webp");

    // Verificar si existe la versión WebP
    try {
      const response = await fetch(webpPath, { method: "HEAD" });
      if (response.ok) {
        return webpPath;
      }
    } catch (error) {
      console.log("WebP version not found, using original");
    }
  }
  return imgPath;
}

// Formatear precios con moneda y separadores de miles
function formatPrice(price, currency = "USD") {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price);
}

function showConfirm(title, message, confirmCallback, cancelCallback) {
  Swal.fire({
    title: title,
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#088178",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed && confirmCallback) {
      confirmCallback();
    } else if (cancelCallback) {
      cancelCallback();
    }
  });
}

// Exportar funciones
export {
  showLoading,
  hideLoading,
  validateEmail,
  validatePhone,
  showSuccess,
  showError,
  showConfirm,
};
