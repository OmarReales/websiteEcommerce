const productLocal = JSON.parse(localStorage.getItem("product"));
let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) ||[];
console.log(productLocal);
const badge = document.querySelector(".badge");

// let addCart = document.querySelector(".addcart");
function renderDetails() {
    const productLocal = JSON.parse(localStorage.getItem("product"));
    const proDetails = document.querySelector("#prodetails");
    
    
    proDetails.innerHTML = `
    <div class="single-pro-image">
        <img src="${productLocal.img}" width="100%" id="mainimg" alt="">
        <div class="small-img-group">
            <div class="small-img-col">
                <img src="${productLocal.sImg.img1}" width="100%" class="small-img" alt="">
            </div>
            <div class="small-img-col">
                <img src="${productLocal.sImg.img2}" width="100%" class="small-img" alt="">
            </div>
            <div class="small-img-col">
                <img src="${productLocal.sImg.img3}" width="100%" class="small-img" alt="">
            </div>
            <div class="small-img-col">
                <img src="${productLocal.sImg.img4}" width="100%" class="small-img" alt="">
            </div>
        </div>
    </div>
    <div class="single-pro-details">
        <h6>${productLocal.tmark}</h6>
        <h4>${productLocal.name}</h4>
        <h2>$${productLocal.price}</h2>
        <span>Stock: ${productLocal.qty}</span>
        <select>
            <option>Color</option>
            <option>Blanco</option>
            <option>Negro</option>
            <option>Gris</option>
        </select>
        <input class= "quantity" id="quantity" type="number" data-id ="${productLocal.id}" value="1">
        <button class="normal addcart" id="${productLocal.id}">Añadir al carrito</button>
        <h4>Caracteristicas</h4>
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit doloribus alias voluptate quibusdam, excepturi ipsum deserunt corrupti numquam suscipit in ullam ipsam necessitatibus quasi sint vel, ad quaerat similique dolorem.</span>
    </div>
    `;
    addToCart();
    // document.querySelectorAll(".addcart").forEach((button) => {
    //     button.addEventListener("click", (e) => {
    //         localStorage.setItem("shoppingCart", JSON.stringify(productLocal));
    //     });
    // });
};
renderDetails();


let mainImg = document.getElementById("mainimg");
let smallImg = document.getElementsByClassName("small-img");

for (let i = 0; i < smallImg.length; i++) {
    smallImg[i].onclick = function() {
        mainImg.src = smallImg[i].src;
    };
}

function addToCart() {
    let addCartButtons = document.querySelectorAll(".addcart");

    addCartButtons.forEach(button => {
        button.addEventListener("click",(e)=>{
            // localStorage.setItem("shoppingCart", JSON.stringify(productLocal));
            addToShoppingCart(e);
        });
    });
}



function addToShoppingCart(e){

    const buttonId = e.currentTarget.id;
    const quantityInput = document.querySelector(`#quantity[data-id="${buttonId}"]`);
    const quantity = parseInt(quantityInput.value);

    if (!Array.isArray(shoppingCart)) {
        shoppingCart = [];
    }

    const productIndex = shoppingCart.findIndex(product => product.id === buttonId);
    if(productIndex !== -1){
        shoppingCart[productIndex].qty += quantity;
        
    }else{
        const newProduct = {...productLocal, qty: quantity};
        
        shoppingCart.push(newProduct);
    }
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    console.log(shoppingCart);
    renderBadge();
}

function renderBadge() {
    let badge = document.querySelector(".badge");
    
    if ( shoppingCart.length>0){
        badge.style.display = "";
        badge.innerHTML = shoppingCart.length;
    }else{
        badge.style.display = "none";
    }
    // badge.style.display = "";
    // badge.innerHTML = shoppingCart.length;
}