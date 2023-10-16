const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJjNDJkZTFjMGFiNzAwMTgxNGJjMDgiLCJpYXQiOjE2OTczOTk1MTgsImV4cCI6MTY5ODYwOTExOH0.dQzFGjft8QtGEsIAkT2_gC2J8ldcM2J5FaC_Qif9e_0"
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