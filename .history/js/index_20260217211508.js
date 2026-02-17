//loa categories  
const loadCategories = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const data = await res.json();
        displayCategories(data);
    } catch (e) {
        console.error('Failed to load categories');
    }
};

//load products
const loadProducts = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        displayProductsByCategory(data);
    } catch (e) {
        console.error('Failed to load products');
    }
};

//remove active class from all category buttons
const removeActiveClass = () => {
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
}

//filter products by category
const filterByCategory = (cat) => {
    const productsGrid = document.getElementById('products-grid');
    console.log(cat);
    const url = `https://fakestoreapi.com/products/category/${cat}`;
    if (cat === 'all') {
        loadProducts();
        return;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickedBtn = document.getElementById(`cat-${cat}`);
            clickedBtn.classList.add('active');
            displayProductsByCategory(data);
        })
        .catch(e => {
            productsGrid.innerHTML = `<div class="col-span-4 flex flex-col items-center justify-center py-20 text-center">
            <svg class="w-16 h-16 text-red-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <p class="text-red-400 font-medium">Failed to load products for category: ${cat}</p>
            <button onclick="filterByCategory('${cat}')" class="mt-3 btn-primary text-white text-sm font-semibold px-5 py-2 rounded-xl">Retry</button>
          </div>`;
            console.error('Failed to load products for category: ' + cat);
        });
};

//display categories as buttons
const displayCategories = (categories) => {
    const productsGrid = document.getElementById('products-grid');
    const categoryButtons = document.getElementById('category-buttons');
    categoryButtons.innerHTML = `<button data-cat="all" class="cat-btn active px-5 py-2 rounded-full text-sm font-semibold border border-gray-200 bg-white text-gray-700" onclick="filterByCategory('all')">All</button>`;
    categories.forEach(cat => {
        categoryButtons.innerHTML += `<button data-cat="${cat}" class="cat-btn px-5 py-2 rounded-full text-sm font-semibold border border-gray-200 bg-white text-gray-700 capitalize" id="cat-${cat}" onclick="filterByCategory('${cat}')">${cat}</button>`;
    });
};

//display products by category
const displayProductsByCategory = (products) => {
    console.log(products);
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    if (!products.length) {
        productsGrid.innerHTML = `<div class="col-span-4 flex flex-col items-center justify-center py-20 text-center">
        <svg class="w-16 h-16 text-red-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        <p class="text-red-400 font-medium">No products found in this category</p>
        <button onclick="filterByCategory('all')" class="mt-3 btn-primary text-white text-sm font-semibold px-5 py-2 rounded-xl">View All</button>
      </div>`;
        return;
    }
    products.forEach(product => {
        productsGrid.innerHTML += `
        <div class="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
            <div class="h-44 sm:h-48 flex items-center justify-center bg-gray-50 p-3 cursor-pointer">
                <img src="${product.image}" alt="${product.title}" loading="lazy" class="max-h-full max-w-full object-contain transition duration-300 hover:scale-105"/>
            </div>
            <div class="p-4 flex flex-col flex-1">
                <span class="text-xs font-semibold capitalize px-2 py-0.5 rounded-full inline-block self-start mb-2 truncate max-w-full" style="background:#ede9fe;color:#6351ff">${product.category}</span>
                <h3 class="text-xs sm:text-sm font-semibold text-gray-800 flex-1 leading-snug mb-3">${product.title.substring(0, 55)}${product.title.length > 55 ? '...' : ''}</h3>
                <p class="text-lg sm:text-xl font-extrabold mb-3" style="color:#6351ff">$${product.price}</p>
                <button on class="flex-1 btn-primary flex items-center justify-center gap-1 text-white text-xs font-bold py-2 rounded-xl">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    Details
                </button>
                <button onclick='addToCart(${JSON.stringify(product).replace(/\\/g, "\\\\").replace(/'/g, "\\'")})' class="flex-1 btn-primary flex items-center justify-center gap-1 text-white text-xs font-bold py-2 rounded-xl mt-2">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8"/></svg>   
                    Add to Cart
                </button>
            </div>
        </div>`;
    });
}

const showDetails = async (id) => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const p = await res.json();

        document.getElementById('details-modal-img').src = p.image;
        document.getElementById('details-modal-img').alt = p.title;
        document.getElementById('details-modal-category').textContent = p.category;
        document.getElementById('details-modal-title').textContent = p.title;
        document.getElementById('details-modal-price').textContent = `$${p.price}`;
        document.getElementById('details-modal-rating').textContent =
            `⭐ ${p.rating.rate} (${p.rating.count} reviews)`;
        document.getElementById('details-modal-desc').textContent = p.description;

        document.getElementById('details-modal-overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    } catch (e) {
        console.error('Failed to load product details');
    }
};

const closeDetailsModal = () => {
    document.getElementById('details-modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
};




loadCategories();

