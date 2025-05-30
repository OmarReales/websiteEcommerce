// Gestión mejorada del carrito de compras
class CartManager {
  constructor() {
    this.cart = [];
    this.loadCart();
    this.setupEventListeners();
  }

  // Cargar carrito desde localStorage
  loadCart() {
    try {
      const savedCart = localStorage.getItem("shoppingCart");
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
        this.updateBadge();
      }
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
      this.cart = [];
      localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
    }
  }

  // Guardar carrito en localStorage
  saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
    this.updateBadge();
  }

  // Añadir producto al carrito
  addToCart(product, quantity = 1) {
    // Verificar si el producto ya está en el carrito
    const existingItem = this.cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.qty += quantity;
    } else {
      product.qty = quantity;
      this.cart.push(product);
    }

    this.saveCart();

    return {
      success: true,
      cartSize: this.cart.length,
      totalItems: this.getTotalItems(),
    };
  }

  // Eliminar producto del carrito
  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();

    return {
      success: true,
      cartSize: this.cart.length,
      totalItems: this.getTotalItems(),
    };
  }

  // Actualizar cantidad de un producto
  updateQuantity(productId, quantity) {
    const existingItem = this.cart.find((item) => item.id === productId);

    if (existingItem && quantity > 0) {
      existingItem.qty = quantity;
      this.saveCart();
      return true;
    }

    return false;
  }

  // Obtener todos los productos del carrito
  getCart() {
    return this.cart;
  }

  // Obtener el total de productos (sumando cantidades)
  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.qty, 0);
  }

  // Calcular el subtotal del carrito
  getSubtotal() {
    return this.cart.reduce((total, item) => total + item.price * item.qty, 0);
  }

  // Aplicar un cupón de descuento
  applyCoupon(code) {
    const coupons = {
      WELCOME10: { discount: 0.1, description: "10% de descuento" },
      SUMMER25: { discount: 0.25, description: "25% de descuento" },
      FREESHIP: {
        discount: 0,
        freeShipping: true,
        description: "Envío gratis",
      },
    };

    const coupon = coupons[code];

    if (coupon) {
      return {
        success: true,
        coupon: { ...coupon, code },
      };
    }

    return {
      success: false,
      message: "Cupón no válido",
    };
  }

  // Vaciar el carrito
  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  // Actualizar badge de carrito con la cantidad de productos
  updateBadge() {
    const totalItems = this.getTotalItems();
    const badges = document.querySelectorAll(".badge, .mobile-badge");

    badges.forEach((badge) => {
      if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = "flex";
      } else {
        badge.style.display = "none";
      }
    });
  }

  // Configurar listeners para eventos de productos
  setupEventListeners() {
    document.addEventListener("click", (event) => {
      // Detectar clicks en botones de agregar al carrito
      if (event.target.classList.contains("fa-cart-shopping")) {
        event.preventDefault();

        // Intentar obtener datos del producto desde el elemento padre
        const productCard = event.target.closest(".pro");
        if (productCard) {
          const productId = parseInt(productCard.dataset.id || "0");
          const productName =
            productCard.querySelector("h5")?.textContent || "Producto";
          const productPrice = parseFloat(
            productCard
              .querySelector("h4")
              ?.textContent.replace(/[^0-9.-]+/g, "") || "0"
          );
          const productImg = productCard.querySelector("img")?.src || "";

          const product = {
            id: productId,
            name: productName,
            price: productPrice,
            img: productImg,
            qty: 1,
          };

          this.addToCart(product);

          // Animación de producto añadido
          const img = productCard.querySelector("img");
          if (img) {
            img.style.transform = "scale(1.05)";
            setTimeout(() => {
              img.style.transform = "";
            }, 300);
          }

          // Notificación con SweetAlert
          Swal.fire({
            title: "¡Producto añadido!",
            text: `${productName} se ha añadido a tu carrito`,
            icon: "success",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      }
    });
  }
}

// Inicializar el gestor de carrito
const cartManager = new CartManager();

// Exponer a nivel global para acceso desde otras partes
window.cartManager = cartManager;
