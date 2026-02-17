const loadProducts = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        displayProducts(data);
    } catch (e) {
        console.error('Failed to load products');
    }
};

const displayProducts = (products) => { 
    console.log(products);
};

loadProducts();

