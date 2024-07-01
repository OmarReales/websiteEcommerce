const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {  
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}
const db = {
    methods: {
        find: (id) => {
            return db.items.find(product => item.id === id)
        },
        remove: (items) => {
            items.forEach(item => {
                const product = db.methods.find(item.id);
                product.qty = product.qty - item.qty;
            });
            console.log(db);
        },
    },
    items: [
        {
            id: 0,
            name: "Teclado K552",
            img: "../img/products/f1.jpg",
            price: 8000,
            qty: 4,
            tmark: "Redragon"
        },
        {
            id: 1,
            name: "Teclado K600",
            img: "../img/products/f1.jpg",
            price: 10000,
            qty: 6,
            tmark: "Redragon"
        },
        {
            id: 2,
            name: "Auricular 5.1",
            img: "../img/products/f1.jpg",
            price: 9000,
            qty: 8,
            tmark: "Redragon"
        },
        {
            id: 3,
            name: "Auricular 7.1",
            img: "../img/products/f1.jpg",
            price: 13000,
            qty: 4,
            tmark: "Redragon"
        },
        {
            id: 4,
            name: "Auriculares de oficina",
            img: "../img/products/f1.jpg",
            price: 5000,
            qty: 6,
            tmark: "Genius"
        },
        {
            id: 5,
            name: "Monitor 24\"",
            img: "../img/products/f1.jpg",
            price: 24000,
            qty: 4,
            tmark: "LG"
        },
        {
            id: 6,
            name: "Monitor 24\" 144Hz",
            img: "../img/products/f1.jpg",
            price: 32000,
            qty: 6,
            tmark: "LG"
        },
        {
            id: 7,
            name: "Monitor 27\" 144Hz",
            img: "../img/products/f1.jpg",
            price: 38000,
            qty: 4,
            tmark: "LG"
        },
        {
            id: 8,
            name: "Mouse M600",
            price: 8000,
            img: "../img/products/f1.jpg",
            qty: 6,
            tmark: "Redragon"
        },
        {
            id: 9,
            name: "Mouse M552",
            img: "../img/products/f1.jpg",
            price: 7000,
            qty: 4,
            tmark: "Redragon"
        },
        {
            id: 10,
            name: "Mouse M701",
            img: "../img/products/f1.jpg",
            price: 14000,
            qty: 6,
            tmark: "Redragon"
        },
        {
            id: 11,
            name: "Joystick J7",
            img: "../img/products/f1.jpg",
            price: 8000,
            qty: 4,
            tmark: "Redragon"
        },
        {
            id: 12,
            name: "Placa de video RTX 3090",
            img: "../img/products/f1.jpg",
            price: 300000,
            qty: 6,
            tmark: "Nvidia"
        },
        {
            id: 13,
            name: "Placa de video GTX 1080",
            img: "../img/products/f1.jpg",
            price: 150000,
            qty: 4,
            tmark: "Nvidia"
        },
        {
            id: 14,
            name: "Webcam C600",
            img: "../img/products/f1.jpg",
            price: 15000,
            qty: 6,
            tmark: "Logitech"
        },
        {
            id: 15,
            name: "Parlante SP-HF180",
            img: "../img/products/f1.jpg",
            price: 15000,
            qty: 4,
            tmark: "Genius"
        },
    ]
}
const shoppingCart = {
    items: JSON.parse(localStorage.getItem('shoppingCart')) || [],
    methods: {
        add:(id, qty)=>{
            const cartItem = shoppingCart.methods.get(id);
            
            if(cartItem){
                if(shoppingCart.methods.hasInventory(id, qty + cartItem.qty)){
                    cartItem.qty += qty;
                }else{
                    alert('No hay productos suficientes');
                }
            }else{
                shoppingCart.items.push({id, qty});
            }
            saveLocal();
        },
        remove:(id, qty)=>{
            const cartItem = shoppingCart.methods.get(id);

            cartItem.qty - qty > 0 ? cartItem.qty -= qty : (shoppingCart.items = shoppingCart.items.filter(item => item.id !== id));
            saveLocal();
        },
        count:()=>{
            return shoppingCart.items.reduce((acc, item) => acc += item.qty, 0);
            saveLocal();
        },
        get:(id)=>{
            const index = shoppingCart.items.findIndex(item => item.id === id);
            return index >= 0 ? shoppingCart.items[index] : null;
        },
        getTotal:()=>{
            const total = shoppingCart.items.reduce((acc, item) => {
                const found = db.methods.find(item.id);
                return (acc += found.price * item.qty);
            });
            return total;
        },
        hasInventory:(id, qty)=>{
            return db.items.find(item => item.id === id).qty - qty >= 0;
        },
        purchase:()=>{
            db.methods.remove(shoppingCart.items);
            shoppingCart.items = [];
            saveLocal();
        },
    }
}
const saveLocal = () => {
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart.items));
}

const productContainer = document.querySelector('#product-container');
function renderStore() {
    const html = db.items.map((item) => {
        const div = document.createElement('div');
        div.classList.add('pro', 'add');
        
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" >
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
                <h4>${item.price}</h4>
            </div>
            <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a>
        `;
        productContainer.append(div);
        div.addEventListener('click', e => {
            window.location.href = 'sproduct.html';
            const id = parseInt(div.getAttribute('data-id'));
            const item = db.methods.find(id);
            renderDetails();
        })
    });
}
renderStore();

const proDetails = document.querySelector('#prodetails');
function renderDetails(){
    const html = db.items.map((item) => {
        const div = document.createElement('div');
        div.classList.add('single-pro-image')
        div.innerHTML = `
            <img src="${item.img}" width="100%" id="mainImg" alt="">
            <div class="small-img-group">
                <div class="small-img-col">
                    <img src="../img/products/f1.jpg" width="100%" class="small-img" alt="">
                </div>
                <div class="small-img-col">
                    <img src="../img/products/f4.jpg" width="100%" class="small-img" alt="">
                </div>
                <div class="small-img-col">
                    <img src="../img/products/f5.jpg" width="100%" class="small-img" alt="">
                </div>
                <div class="small-img-col">
                    <img src="../img/products/f6.jpg" width="100%" class="small-img" alt="">
                </div>
            </div>>
        `;
        const div2 = document.createElement('div');
        div2.classList.add('single-pro-details');
        div2.innerHTML = `
            <h6>${item.tmark}</h6>
            <h4>${item.name}</h4>
            <h2>${item.price}</h2>
            <select>
                <option>Color</option>
                <option>Blanco</option>
                <option>Negro</option>
                <option>Gris</option>
            </select>
            <input type="number" value="${item.qty}">
            <button class="normal addOne" data-id="${item.id}">Añadir al carrito</button>
            <h4>Caracteristicas</h4>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit doloribus alias voluptate quibusdam, excepturi ipsum deserunt corrupti numquam suscipit in ullam ipsam necessitatibus quasi sint vel, ad quaerat similique dolorem.</span>
        `;
    })
}


function renderShoppingCart() {
    
}

