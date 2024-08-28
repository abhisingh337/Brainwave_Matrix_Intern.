document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Laptop", price: 19.99, image: "laptop.jpg", category: "electronics" },
        { id: 2, name: "Jeans", price: 29.99, image: "jeans.jpg", category: "clothing" },
        { id: 3, name: "Sofa", price: 39.99, image: "sofa.jpg", category: "home" }
    ];

    const productContainer = document.getElementById("product-list");
    const cartCountElement = document.getElementById("cart-count");
    const categoryButtons = document.querySelectorAll('.category-btn');


    function displayProducts(category) {
        productContainer.innerHTML = '';
        const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);

        filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: <span class="product-price">$${product.price.toFixed(2)}</span></p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productContainer.appendChild(productElement);
        });
    }


    displayProducts('all');


    productContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.getAttribute("data-id");
            addToCart(productId);
        }
    });

    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const product = products.find(p => p.id == productId);

        if (product) {
            const existingProduct = cart.find(item => item.id == productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        }
    }

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }


    updateCartCount();


    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            displayProducts(category);
        });
    });
});
