const mainRow = document.querySelector("#row");
async function getProducts() {
    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM4NDIyNjc3Y2RhYTAwMTQ2ZGYzYmUiLCJpYXQiOjE2OTgxODU3NjYsImV4cCI6MTY5OTM5NTM2Nn0.aov05XFNgy-2KNGAmWOusPTxn1NC7XM2hT3khImchrQ"
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error message", error);
        throw error;
    }
}

async function addProduct(event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const description = document.querySelector("#description").value;
    const brand = document.querySelector("#brand").value;
    const imageUrl = document.querySelector("#image").value;
    const price = document.querySelector("#price").value;

    const product = {
        name,
        description,
        brand,
        imageUrl,
        price,
    };

    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM4NDIyNjc3Y2RhYTAwMTQ2ZGYzYmUiLCJpYXQiOjE2OTgxODU3NjYsImV4cCI6MTY5OTM5NTM2Nn0.aov05XFNgy-2KNGAmWOusPTxn1NC7XM2hT3khImchrQ"
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            alert("Action figure has been added");
            const data = await getProducts();
            displayProducts(data);

        } else {
            console.error("Error cannot send");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
function displayProducts(data) {
    const productsHTML = data.map(({ _id, name, description, brand, imageUrl, price }) =>
        `<div class="col-2 border border-1 mb-5 mt-5 d-flex align-items-center"> <img src="${imageUrl}" alt="${description}" class="img-fluid" /> </div>
            <div class="col-2 d-flex align-items-center flex-wrap">"${name}"</div>
            <div class="col-2 d-flex align-items-center flex-wrap">"${description}"</div>
            <div class="col-2 d-flex align-items-center flex-wrap">"${brand}"</div>
            <div class="col-2 d-flex align-items-center flex-wrap">"€${price}"</div>
            <div class="col-2 d-flex align-items-center flex-wrap">
            <button class="border border-none me-3" id="remove-button" onclick="handleDelete('${_id}')"> <i class="bi bi-trash3-fill text-color"></i>Remove</button>
            <button class="border border-none" onclick="handleEdit('${_id}')"><i class="bi bi-pencil-square text-color"></i> Edit </button>
            </div>`
    ).join("");

    mainRow.innerHTML = productsHTML;
}
async function handleEdit(id) {
    const productData = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id)
    const productJson = await productData.json()

    const { name, description, brand, imageUrl, price } = productJson

    const productDataRow = document.querySelector(`${id}`)

    productDataRow.innerHTML = `
    <form class="d-flex flex-column" id="form" onsubmit="handleEditSubmit(event,'${_id}')">
    <div class="row mb-3">
        <div class="col-6">
            <label for="name">Name</label>
            <input required id="name" type="text" class="form-control" placeholder="Batman Combat Belt" value="${name}">
        </div>
        <div class="col-6">
            <label for="description">Description</label>
            <input required id="description" type="text" class="form-control" placeholder="Firing Grappling Hook, launching missile and capture cuffs!" value="${description}">
        </div>
    </div>
    <div class="row mb-3">
        <!-- 2nd Column -->
        <div class="col-6">
            <label for="brand">Brand</label>
            <input required id="brand" type="text" class="form-control" placeholder="Kenner" value="${brand}">
        </div>
        <div class="col-6">
            <label for="image">Image URL</label>
            <input required id="image"type="text" class="form-control" placeholder="https://ibb.co/yNYC0rk" value="${imageUrl}">
        </div>
    </div>
    <div class="row mb-3">
        <!-- 3rd Column -->
        <div class="col-6">
            <label for="price">Price</label>
            <div class="d-flex align-items-center">
                <span class="me-2 text-color"> € </span>
                <input required id="price" type="text" class="form-control" placeholder="500" value="${price}">
            </div>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-around mt-3">
            <button class="btn-light border-0 rounded p-2 mt-2 "type="button" onclick="handleEditCancel()"> <i class="bi bi-x-square-fill"></i></button>
        </div>
    </div>
</form>
`
}
async function handleEditSubmit(e, id) {
    e.preventDefault();
    e.target.classList.add("pe-none")
    e.target.querySelector("button[type=submit]").innerHTML = `
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;

    const name = form.querySelector("#name");
    const description = form.querySelector("#description");
    const brand = form.querySelector("#brand");
    const imageUrl = form.querySelector("#image");
    const price = form.querySelector("#price");

    const updatedProduct = {
        name: name.value,
        description: description.value,
        brand: brand.value,
        imageUrl: imageUrl.value,
        price: price.value,
    };

    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM4NDIyNjc3Y2RhYTAwMTQ2ZGYzYmUiLCJpYXQiOjE2OTgxODU3NjYsImV4cCI6MTY5OTM5NTM2Nn0.aov05XFNgy-2KNGAmWOusPTxn1NC7XM2hT3khImchrQ"
            },
            body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
            displayProducts(await getProducts());
        } else {
            alert("Error Message.");
        }
    } catch {
        alert("Internet offline.");
    }
}

async function handleDelete(id) {

    if (!confirm("Are you sure you want to remove this item?")) {
        return
    }

    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM4NDIyNjc3Y2RhYTAwMTQ2ZGYzYmUiLCJpYXQiOjE2OTgxODU3NjYsImV4cCI6MTY5OTM5NTM2Nn0.aov05XFNgy-2KNGAmWOusPTxn1NC7XM2hT3khImchrQ"
        }
    })

    if (response.ok) {
        alert("Your item has been removed!")
        displayProducts(await getProducts())
    } else {
        alert("Can't remove this product.")
    }
}

window.onload = async function () {
    try {
        const productData = await getProducts();
        displayProducts(productData);
    } catch (error) {
        console.log(error);
    }
};
