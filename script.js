function openProduct(id) {
    window.location.href = "product.html?id=" + id;
}

const products = {
    1: {
        name: "iPhone Transparent Case",
        price: 250,
        models: ["iPhone 11", "iPhone 12", "iPhone 13"],
        images: ["img/product1-1.jpg", "img/product1-2.jpg", "img/product1-3.jpg", "img/product1-4.jpg"]
    },
    2: {
        name: "Samsung Rugged Armor",
        price: 350,
        models: ["A12", "A23", "A50", "A52"],
        images: ["img/product2-1.jpg", "img/product2-2.jpg", "img/product2-3.jpg", "img/product2-4.jpg"]
    },

    // SAME FORMAT → 10 PRODUCT COMPLETE
};

function loadProduct() {
    const url = new URLSearchParams(window.location.search);
    const id = url.get("id");
    const p = products[id];

    if (!p) return;

    document.getElementById("product-container").innerHTML = `
        <div class="product-box">
            <img class="big-img" id="mainImg" src="${p.images[0]}">

            <div class="small-imgs">
                ${p.images.map(img => `<img onclick="document.getElementById('mainImg').src='${img}'" src="${img}">`).join("")}
            </div>

            <h2>${p.name}</h2>
            <p class="price-tag">Price: ${p.price} Tk</p>

            <h3>Available Models:</h3>
            <ul>${p.models.map(m => `<li>${m}</li>`).join("")}</ul>

            <button class="order-btn" onclick="orderNow('${p.name}', ${p.price})">Order Now</button>
        </div>
    `;
}

function orderNow(name, price) {
    const phone = "01960559745";
    const msg = `Hello, I want to order:\n${name}\nPrice: ${price} Tk`;
    window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

if (window.location.pathname.includes("product.html")) {
    loadProduct();
}