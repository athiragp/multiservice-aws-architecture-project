let cart = [];
let totalAmount = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    totalAmount += price;
    renderCart();
}

function renderCart() {
    const cartList = document.getElementById("cartItems");
    cartList.innerHTML = "";

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price}`;
        cartList.appendChild(li);
    });

    document.getElementById("total").innerText = totalAmount;
}

function showMessage(text, type = "success") {
    const msg = document.getElementById("message");
    msg.innerText = text;
    msg.className = `message ${type}`;
    msg.style.display = "block";

    // Auto-hide after 3 seconds
    setTimeout(() => {
        msg.style.display = "none";
    }, 3000);
}

function placeOrder() {
    const customerName =
        document.getElementById("customerName").value || "Anonymous";

    if (cart.length === 0) {
        showMessage("❌ Cart is empty", "error");
        return;
    }

    fetch("https://ip04xjenvl.execute-api.ap-south-1.amazonaws.com/prod/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            customerName: customerName,
            items: cart,
            totalAmount: totalAmount
        })
    })
        .then(res => res.json())
        .then(data => {
            showMessage("✅ Order placed successfully!", "success");
            cart = [];
            totalAmount = 0;
            renderCart();
        })
        .catch(err => {
            showMessage("❌ Order failed. Try again.", "error");
            console.error(err);
        });
}
