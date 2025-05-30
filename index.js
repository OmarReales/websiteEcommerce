const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

function numberToCurrency(n) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  }).format(n);
}

const getDolar = async () => {
  const res = await fetch("https://dolarapi.com/v1/dolares/blue");
  const data = await res.json();
  return data.venta;
};

function getJsonPath() {
  const pathname = window.location.pathname;
  console.log("Current Pathname: ", pathname);
  if (
    pathname.includes("index.html") ||
    pathname === "/" ||
    pathname.endsWith("/website-ecommerce/")
  ) {
    return "products.json";
  } else if (pathname.includes("pages/")) {
    return "../products.json";
  }
  return "products.json"; // Ruta por defecto
}

function getImagePath(img) {
  if (!img) return ""; // Protección contra imágenes nulas o indefinidas

  const pathname = window.location.pathname;
  if (
    pathname.includes("index.html") ||
    pathname === "/" ||
    pathname.endsWith("/website-ecommerce/")
  ) {
    return `${img}`; // La ruta ya está completa en el JSON
  } else if (pathname.includes("pages/")) {
    return `../${img}`; // Ruta relativa para páginas dentro de la carpeta 'pages'
  }
  return `${img}`; // Ruta por defecto
}

const loadProducts = async () => {
  try {
    // Utiliza un valor por defecto en caso de fallo
    let dolarValue;
    try {
      dolarValue = await getDolar();
      console.log("Dolar Value: ", dolarValue);
    } catch (error) {
      console.warn(
        "Error al obtener el valor del dólar, usando valor por defecto:",
        error
      );
      dolarValue = 1000; // Valor por defecto
    }

    const response = await fetch(getJsonPath());
    console.log("Fetching JSON from: ", getJsonPath());
    const data = await response.json();
    console.log("Product Data: ", data);

    const db = {
      items: data.items || [],
      methods: {
        find: (id) => {
          return db.items.find((item) => item.id == id);
        },
        remove: (items) => {
          items.forEach((item) => {
            const product = db.methods.find(item.id);
            if (product) {
              product.qty = product.qty - item.qty;
            }
          });
        },
      },
    };

    // Renderizar la tienda
    const productContainer = document.querySelector("#product-container");
    function renderStore() {
      productContainer.innerHTML = "";
      db.items.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("pro", "add");

        div.innerHTML = `
                    <img src="${getImagePath(item.img)}" alt="${item.name}">
                    <div class="des" data-id="${item.id}">
                        <span>${item.tmark}</span>
                        <h5>${item.name}</h5>
                        <div class="star">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <h4>${numberToCurrency(item.price * dolarValue)}</h4>
                    </div>
                    <a href="#"><i class="fa-solid fa-cart-shopping"></i></a>
                `;
        productContainer.append(div);
        div.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.setItem("product", JSON.stringify(item));

          // Obtener el pathname actual
          const pathname = window.location.pathname;

          // Construir la ruta base de acuerdo al pathname actual
          let basePath = window.location.origin;

          // // Verificar si estamos en el directorio 'websiteEcommerce'
          // if (pathname.includes("/website-ecommerce/")) {
          //   basePath += "/website-ecommerce/pages/sproduct.html";
          // } else {
          //   basePath += "/pages/sproduct.html";
          // }

          // // Redireccionar a la página sproduct.html
          // window.location.href = basePath;
          // Detecta si estás en GitHub Pages usando `window.location.hostname`
          if (window.location.hostname === "omarreales.github.io") {
            // Si está en GitHub Pages, usa el directorio del repositorio
            basePath += "/website-ecommerce/pages/sproduct.html";
          } else {
            // Verifica si estamos dentro de un directorio websiteEcommerce
            if (window.location.pathname.includes("/webSiteEcommerce/")) {
              basePath += "/pages/sproduct.html";
            } else {
              // Ruta genérica para otros casos
              basePath += "/pages/sproduct.html";
            }
          }

          // Redireccionar a la página sproduct.html
          window.location.href = basePath;
        });
      });
    }

    renderStore();
  } catch (error) {
    console.error("Error al cargar el JSON o el valor del dólar:", error);
  }
};

loadProducts();
