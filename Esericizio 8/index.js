async function getProducts() {
  const response = await fetch("https://striveschool-api.herokuapp.com/api/product", {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM4NDIyNjc3Y2RhYTAwMTQ2ZGYzYmUiLCJpYXQiOjE2OTgxODU3NjYsImV4cCI6MTY5OTM5NTM2Nn0.aov05XFNgy-2KNGAmWOusPTxn1NC7XM2hT3khImchrQ"
    }
  });
  const data = await response.json();
  return data;
}
function displayProducts(data) {
  const productSection = document.getElementById("row");
  productSection.innerHTML = data.map((product) => {
    return `
      <div class='col col-4 mt-5 mb-5 column'>
        <div class="card border-1 rounded p-1">
          <img src='${product.imageUrl}' class="img-fluid card-img-top" alt='${product.alt}' />
          <div class="card-body">
            <div class="d-flex justify-content-evenly align-items-center">
              <div class="d-flex flex-column">
                <small class="product-name"> Name: ${product.name}</small>
                <small> Brand: ${product.brand}</small>
                <small class="text-truncate" style="max-width:250px;">${product.description}</small>
              </div>
              <span class="price-style"> €${product.price}</span>
           </div>
          <hr>
            <div class="d-flex justify-content-between mt-2">
              <a href="./figuresdetails.html?id=${product._id}" class="text-decoration-none"><i class="bi bi-three-dots text-color"> </i> View details</a>
              <button class="border border-none"> <i class="fas fa-shopping-cart text-color"></i> Buy</button>
            </div>
          </div >
        </div>
      </div>`;
  }).join("");
}

const searchFigures = () => {
  let query = document.getElementById('form-style').value;
  let allTitles = document.querySelectorAll(".product-name");
  console.log(
    query,
    allTitles[0].innerText.toLowerCase().includes(query.toLowerCase())
  );
  allTitles.forEach((title) => {
    const currCard = title.closest('.column');
    if (!title.innerText.toLowerCase().includes(query.toLowerCase())) {
      currCard.style.display = "none";
    } else {
      currCard.style.display = "block";
    }
  });
}
async function fetchAndDisplayProducts() {
  try {
    const products = await getProducts();
    displayProducts(products);
  } catch (error) {
    console.error("An error has occurred:", error);
  }
}
fetchAndDisplayProducts();