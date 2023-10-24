const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM4NDIyNjc3Y2RhYTAwMTQ2ZGYzYmUiLCJpYXQiOjE2OTgxODU3NjYsImV4cCI6MTY5OTM5NTM2Nn0.aov05XFNgy-2KNGAmWOusPTxn1NC7XM2hT3khImchrQ"
    }
})

    .then(response => response.json())
    .then(displayProducts);

const productName = document.querySelector("#productName");
const productImage = document.querySelector("#productImage");
const productPrice = document.querySelector("#productPrice");
const productDescription = document.querySelector("#productDescription");
function displayProducts(product) {
    productName.innerHTML = product.name;
    productImage.src = product.imageUrl;
    productPrice.innerHTML = `€${product.price}`;
    productDescription.innerHTML = product.description;
} 