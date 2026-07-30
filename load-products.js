// ضع بيانات مشروعك مباشرة هنا (هذا المفتاح عام وآمن للظهور)
const SUPABASE_URL = "https://yskyapmyenvkfejbicav.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlza3lhcG15ZW52a2ZlamJpY2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNjI4MzksImV4cCI6MjEwMDkzODgzOX0.Mhe6AyfRO08AJrdu-NCdJhBfNpjQvyL4PbHifq7Sl3k";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

async function fetchProducts() {
    const container = document.getElementById("products-container");
    if (!container) return;

    container.innerHTML = `<p style="text-align: center; grid-column: 1/-1; color: #888;">Summoning relics from the void...</p>`;

    const { data: products, error } = await supabaseClient
        .from('products')
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        console.error("Error fetching products:", error);
        container.innerHTML = `<p style="text-align: center; grid-column: 1/-1; color: #a81c1c;">Failed to load relics.</p>`;
        return;
    }

    renderProducts(products);
}

function renderProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    if (!products || products.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: #888; grid-column: 1/-1; padding: 2rem 0;">No relics available in the sanctuary yet.</p>`;
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image-placeholder">
                <img src="${product.image || 'ring.PNG'}" alt="${product.title || 'Relic'}" onerror="this.src='ring.PNG'">
            </div>
            <h3 class="product-title">${product.title || ''}</h3>
            <p class="product-description">${product.description || ''}</p>
            <div class="product-bottom">
                <span class="product-price">${product.price || ''}</span>
                <button class="btn btn-primary" onclick="addToCart(this)">Add to Cart</button>
            </div>
        `;

        container.appendChild(card);
    });
}
