function addToCart(product) {
    // Mevcut sepeti localStorage'tan al (yoksa boş dizi oluştur)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Ürünü sepete ekle
    cart.push(product);

    // Güncel sepeti kaydet
    localStorage.setItem("cart", JSON.stringify(cart));

    // Sepet sayfasına yönlendir
    window.location.href = "cart.html";
}
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countElem = document.getElementById("cart-count");
    if(countElem) countElem.textContent = cart.length;
}

// Cart sayfasında ürünleri render et
function renderCart() {
    const container = document.getElementById("cart-items");
    if(!container) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    container.innerHTML = "";

    let total = 0;
    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            ${item.name} - €${item.price.toFixed(2)}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        container.appendChild(div);
        total += item.price;
    });

    document.getElementById("cart-total").textContent = total.toFixed(2);
}

// Cart’tan ürün kaldır
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Ödeme
function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if(cart.length === 0){
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your purchase!");
    localStorage.removeItem("cart");
    renderCart();
    updateCartCount();
}

// Sayfa yüklendiğinde sepetteki sayıyı güncelle ve cart sayfasında render et
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCart();
});

