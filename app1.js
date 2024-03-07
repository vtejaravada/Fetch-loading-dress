const url = "https://fakestoreapi.com/products";
const productContainer = document.getElementById("product_card");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let page = 1;
const productsPerPage = 8;
let loadedProducts = 0;


async function fetchProducts() {
    try {
        const response = await fetch(`${url}?page=${page}`);
        if (!response.ok) { 
            
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        appendProducts(data);

        // Show/hide the "Load More" button based on available products
        if (loadedProducts >= data.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }

        page++;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

function appendProducts(data) {
    for (let i = loadedProducts; i < Math.min(loadedProducts + productsPerPage, data.length); i++) {
        const item = data[i];
        const productCard = createProductCard(item);
        productContainer.appendChild(productCard);
    }

    loadedProducts += productsPerPage;
}

function createProductCard(item) {
    const productCard = document.createElement("div");
    productCard.classList.add("productCard");

    let truncatedDescription = item.description.length > 100 ? item.description.substring(0, 100) + "..." : item.description;

    productCard.innerHTML = `
    <div class="product_list">
        <div class="title">
            <h3>${item.title}</h3>
        </div>
        <div class="price">
            <p>$${item.price}</p>
        </div>
        <div class="description">
            <p>${truncatedDescription}</p>
            ${item.description.length > 100 ? `<a class="readMoreBtn" data-item="${encodeURIComponent(JSON.stringify(item))}">Read More</a>` : ''}
        </div>
        
        <div class="category">
            <p>${item.category}</p>
        </div>

        <div class="product_img">
            <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="rating">
            <div class="rate">
                <p>${item.rating.rate}</p>
            </div>
            <div class="count">
                <p>${item.rating.count}</p>
            </div>
        </div>
    </div>    
`;

return productCard;
}

function handleReadMore(event) {
    const encodedItemData = event.target.dataset.item;
    const decodedItemData = decodeURIComponent(encodedItemData);
    const itemData = JSON.parse(decodedItemData);

    const productCard = event.target.closest('.productCard');

    if (productCard) {
        const descriptionParagraph = productCard.querySelector('.description p');

        if (descriptionParagraph) {
            descriptionParagraph.textContent = itemData.description;
            event.target.style.display = 'none';
        } else {
            console.error('Description paragraph not found within the product card');
        }
    } else {
        console.error('Product card not found');
    }
}

loadMoreBtn.addEventListener("click", fetchProducts);
fetchProducts();

productContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('readMoreBtn')) {
        handleReadMore(event);
    }
});