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
            displayProductsByCategory(data);
        })
        .catch(e => {
            productsGrid.innerHTML = `<div class="col-span-4 flex flex-col items-center justify-center py-20 text-center">
            <svg class="w-16 h-16 text-red-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <p class="text-red-400 font-medium">Failed to load products for category: ${cat}</p>
            <button id="cat onclick="filterByCategory('${cat}')" class="mt-3 btn-primary text-white text-sm font-semibold px-5 py-2 rounded-xl">Retry</button>
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
        categoryButtons.innerHTML += `<button data-cat="${cat}" class="cat-btn px-5 py-2 rounded-full text-sm font-semibold border border-gray-200 bg-white text-gray-700 capitalize" onclick="filterByCategory('${cat}')">${cat}</button>`;
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
            </div>
        </div>`;
    });
}




loadCategories();


// const API = 'https://fakestoreapi.com';
// let allProducts = [];
// let filteredProducts = [];
// let activeCategory = 'all';

// // ===== CART =====
// let cart = JSON.parse(localStorage.getItem('sc_cart') || '[]');
// function saveCart() { localStorage.setItem('sc_cart', JSON.stringify(cart)); }

// function addToCart(product) {
//     const ex = cart.find(i => i.id === product.id);
//     if (ex) ex.qty += 1; else cart.push({ ...product, qty: 1 });
//     saveCart(); updateCartUI();
//     showToast('"' + product.title.substring(0, 30) + '..." added!');
// }

// function removeFromCart(id) {
//     cart = cart.filter(i => i.id !== id);
//     saveCart(); updateCartUI(); renderCartItems();
// }

// function updateCartUI() {
//     const total = cart.reduce((s, i) => s + i.qty, 0);
//     const b = document.getElementById('cart-badge');
//     b.textContent = total;
//     total > 0 ? b.classList.add('visible') : b.classList.remove('visible');
// }

// function renderCartItems() {
//     const c = document.getElementById('cart-items');
//     const t = document.getElementById('cart-total');
//     if (!cart.length) {
//         c.innerHTML = '<div class="flex flex-col items-center justify-center h-48 text-gray-400"><svg class="w-12 h-12 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8"/></svg><p>Cart is empty</p></div>';
//         t.textContent = '$0.00'; return;
//     }
//     let total = 0;
//     c.innerHTML = cart.map(item => {
//         total += item.price * item.qty; return `
//     <div class="flex gap-3 items-start">
//       <img src="${item.image}" class="w-14 h-14 object-contain rounded-lg bg-gray-50 p-1 flex-shrink-0"/>
//       <div class="flex-1 min-w-0">
//         <p class="text-xs font-semibold text-gray-800 leading-tight line-clamp-2">${item.title.substring(0, 45)}...</p>
//         <p class="text-xs text-gray-500 mt-1">$${item.price} × ${item.qty}</p>
//         <p class="text-xs font-bold mt-0.5" style="color:#6351ff">$${(item.price * item.qty).toFixed(2)}</p>
//       </div>
//       <button onclick="removeFromCart(${item.id})" class="text-gray-300 hover:text-red-400 transition text-xl leading-none">×</button>
//     </div>`;
//     }).join('');
//     t.textContent = '$' + total.toFixed(2);
// }

// function openCart() { renderCartItems(); document.getElementById('cart-sidebar').style.transform = 'translateX(0)'; document.getElementById('cart-overlay').classList.remove('hidden'); }
// function closeCart() { document.getElementById('cart-sidebar').style.transform = 'translateX(100%)'; document.getElementById('cart-overlay').classList.add('hidden'); }

// // ===== TOAST =====
// function showToast(msg) {
//     const t = document.getElementById('toast');
//     document.getElementById('toast-msg').textContent = msg;
//     t.style.opacity = '1'; t.style.transform = 'translateY(0)';
//     setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(16px)'; }, 2800);
// }

// // ===== STARS =====
// function generateStars(rate) {
//     const star = '<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
//     return [1, 2, 3, 4, 5].map(i => `<span class="${i <= Math.round(rate) ? 'text-yellow-400' : 'text-gray-200'}">${star}</span>`).join('');
// }

// // ===== MODAL =====
// function openModal(product) {
//     document.getElementById('modal-content').innerHTML = `
//     <div class="flex gap-4 mb-4">
//       <img src="${product.image}" class="w-28 h-28 object-contain rounded-xl bg-gray-50 p-2 flex-shrink-0"/>
//       <div class="flex-1 min-w-0">
//         <span class="text-xs font-semibold px-2 py-1 rounded-full capitalize inline-block" style="background:#ede9fe;color:#6351ff">${product.category}</span>
//         <h3 class="text-sm font-bold text-gray-900 mt-2 leading-snug">${product.title}</h3>
//         <div class="flex items-center gap-2 mt-1">
//           <div class="flex">${generateStars(product.rating.rate)}</div>
//           <span class="text-xs text-gray-500">${product.rating.rate} (${product.rating.count})</span>
//         </div>
//         <p class="text-2xl font-extrabold mt-1" style="color:#6351ff">$${product.price}</p>
//       </div>
//     </div>
//     <p class="text-sm text-gray-600 leading-relaxed mb-5">${product.description}</p>
//     <div class="flex gap-3">
//       <button onclick='addToCart(${JSON.stringify(product).replace(/\\/g, "\\\\").replace(/'/g, "\\'")}); closeModal()' class="btn-primary flex-1 text-white font-bold py-3 rounded-xl text-sm">Add to Cart</button>
//       <button onclick="closeModal()" class="flex-1 border border-gray-200 text-gray-700 font-bold py-3 rounded-xl text-sm hover:bg-gray-50 transition">Close</button>
//     </div>`;
//     const m = document.getElementById('modal');
//     m.classList.remove('hidden'); m.classList.add('flex');
//     setTimeout(() => m.classList.add('open'), 10);
// }

// function closeModal() {
//     const m = document.getElementById('modal');
//     m.classList.remove('open');
//     setTimeout(() => { m.classList.remove('flex'); m.classList.add('hidden'); }, 250);
// }
// document.getElementById('modal').addEventListener('click', function (e) { if (e.target === this) closeModal(); });

// // ===== PRODUCT CARD =====
// function createProductCard(p) {
//     const pStr = JSON.stringify(p).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
//     return `
//   <div class="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
//     <div class="h-44 sm:h-48 flex items-center justify-center bg-gray-50 p-3 cursor-pointer" onclick='openModal(${pStr})'>
//       <img src="${p.image}" alt="${p.title}" loading="lazy" class="max-h-full max-w-full object-contain transition duration-300 hover:scale-105"/>
//     </div>
//     <div class="p-4 flex flex-col flex-1">
//       <span class="text-xs font-semibold capitalize px-2 py-0.5 rounded-full inline-block self-start mb-2 truncate max-w-full" style="background:#ede9fe;color:#6351ff">${p.category}</span>
//       <div class="flex items-center gap-1.5 mb-2">
//         <div class="flex">${generateStars(p.rating.rate)}</div>
//         <span class="text-xs text-gray-400">${p.rating.rate} (${p.rating.count})</span>
//       </div>
//       <h3 class="text-xs sm:text-sm font-semibold text-gray-800 flex-1 leading-snug mb-3">${p.title.substring(0, 55)}${p.title.length > 55 ? '...' : ''}</h3>
//       <p class="text-lg sm:text-xl font-extrabold mb-3" style="color:#6351ff">$${p.price}</p>
//       <div class="flex gap-2">
//         <button onclick='openModal(${pStr})' class="flex-1 flex items-center justify-center gap-1 border border-gray-200 text-gray-700 text-xs font-semibold py-2 rounded-xl hover:bg-gray-50 transition">
//           <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
//           Details
//         </button>
//         <button onclick='addToCart(${pStr})' class="flex-1 btn-primary flex items-center justify-center gap-1 text-white text-xs font-bold py-2 rounded-xl">
//           <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8"/></svg>
//           Add
//         </button>
//       </div>
//     </div>
//   </div>`;
// }

// // ===== RENDER PRODUCTS =====
// function renderProducts(products) {
//     const grid = document.getElementById('products-grid');
//     const empty = document.getElementById('empty-state');
//     const count = document.getElementById('product-count');
//     count.textContent = products.length + ' products';
//     if (!products.length) {
//         grid.classList.add('hidden');
//         empty.classList.remove('hidden'); empty.classList.add('flex');
//         return;
//     }
//     empty.classList.add('hidden'); empty.classList.remove('flex');
//     grid.classList.remove('hidden');
//     grid.innerHTML = products.map(createProductCard).join('');
// }

// // ===== CATEGORY FILTER =====
// function filterByCategory(cat) {
//     activeCategory = cat;
//     document.getElementById('search-input').value = '';
//     // Update active button
//     document.querySelectorAll('.cat-btn').forEach(b => {
//         b.classList.toggle('active', b.dataset.cat === cat);
//     });
//     filteredProducts = cat === 'all' ? [...allProducts] : allProducts.filter(p => p.category === cat);
//     renderProducts(filteredProducts);
// }

// // ===== SEARCH =====
// function handleSearch() {
//     const q = document.getElementById('search-input').value.toLowerCase().trim();
//     const base = activeCategory === 'all' ? allProducts : allProducts.filter(p => p.category === activeCategory);
//     const results = !q ? base : base.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
//     renderProducts(results);
// }

// function resetFilters() {
//     activeCategory = 'all';
//     document.getElementById('search-input').value = '';
//     document.querySelectorAll('.cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === 'all'));
//     filteredProducts = [...allProducts];
//     renderProducts(filteredProducts);
// }

// // ===== LOAD CATEGORIES =====
// async function loadCategories() {
//     try {
//         const res = await fetch(`${API}/products/categories`);
//         const cats = await res.json();
//         const container = document.getElementById('category-buttons');
//         container.innerHTML = `<button data-cat="all" class="cat-btn active px-5 py-2 rounded-full text-sm font-semibold border border-gray-200 bg-white text-gray-700" onclick="filterByCategory('all')">All</button>`;
//         cats.forEach(cat => {
//             container.innerHTML += `<button data-cat="${cat}" class="cat-btn px-5 py-2 rounded-full text-sm font-semibold border border-gray-200 bg-white text-gray-700 capitalize" onclick="filterByCategory('${cat}')">${cat}</button>`;
//         });
//     } catch (e) {
//         console.error('Failed to load categories');
//     }
// }

// // ===== LOAD ALL PRODUCTS =====
// async function loadProducts() {
//     try {
//         const res = await fetch(`${API}/products`);
//         allProducts = await res.json();
//         filteredProducts = [...allProducts];
//         document.getElementById('products-loading').style.display = 'none';
//         renderProducts(filteredProducts);
//     } catch (e) {
//         document.getElementById('products-loading').innerHTML = `
//       <div class="col-span-4 flex flex-col items-center justify-center py-20 text-center">
//         <svg class="w-16 h-16 text-red-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
//         <p class="text-red-400 font-medium">Failed to load products</p>
//         <button onclick="loadProducts()" class="mt-3 btn-primary text-white text-sm font-semibold px-5 py-2 rounded-xl">Retry</button>
//       </div>`;
//     }
// }

// // ===== NAVBAR =====
// window.addEventListener('scroll', () => {
//     document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
// });
// document.getElementById('menu-toggle').addEventListener('click', () => {
//     document.getElementById('mobile-menu').classList.toggle('hidden');
// });

// // ===== INIT =====
// updateCartUI();
// loadCategories();
// loadProducts();
