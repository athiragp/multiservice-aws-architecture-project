const API_URL = "https://3qp4shb8k5.execute-api.ap-south-1.amazonaws.com/prod/admin/order";

// 🔹 Helper to handle both ISO string & epoch timestamp
function parseDate(createdAt) {
    // epoch seconds as number OR numeric string
    if (!isNaN(createdAt)) {
        return new Date(Number(createdAt) * 1000);
    }

    // ISO date string
    return new Date(createdAt);
}


async function loadOrders() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("API call failed");
        }

        const orders = await response.json();

        // ✅ SORT: Latest orders first
        orders.sort((a, b) => {
            return parseDate(b.createdAt) - parseDate(a.createdAt);
        });

        const tableBody = document.getElementById("ordersTableBody");
        tableBody.innerHTML = "";

        orders.forEach(order => {
            const row = document.createElement("tr");

            const readableDate = parseDate(order.createdAt).toLocaleString();

            row.innerHTML = `
                <td>${order.orderId}</td>
                <td>${order.customerName}</td>
                <td>${order.totalAmount}</td>
                <td>${readableDate}</td>
                <td>${formatItems(order.items)}</td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error loading orders:", error);
        alert("Failed to load orders. Check console.");
    }
}

function formatItems(items) {
    if (!items || items.length === 0) {
        return "No items";
    }

    return items.map(item => {
        if (typeof item === "string") {
            return item;
        }
        return `${item.name} (₹${item.price})`;
    }).join(", ");
}

window.onload = loadOrders;
