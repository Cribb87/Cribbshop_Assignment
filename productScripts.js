let prod = []

let cart = JSON.parse(localStorage.getItem("cart"));
if (cart == null) {
  cart = [];
}

function renderCart() {
  const getProducts = JSON.parse(localStorage.getItem("cart"));

  getProducts.forEach((element) => {
    document.getElementById("productsInCart").innerHTML +=
    `<tr class="table-default">
        <td scope="row">${element.title}</td>
        </td>
        <td scope="row">${element.price} $</td>
        <td><button type="button" class="btn btn-secondary" onclick="addProduct(${element.id})">+
        <button type="button" class="btn btn-default">${element.quantity}
        <button type="button" class="btn btn-secondary" onclick="removeProduct(${element.id})">-</td>
        <td id="${element.id}">${(element.price * element.quantity).toFixed(2)} $</td> 
    </tr>`;
  });
}

function getAllProducts() {
  fetch("https://webacademy.se/fakestore/")
    .then((response) => response.json())
    .then((data) =>
      data.forEach((element) => {
        let newProduct = {
          id: element.id,
          title: element.title,
          description: element.description,
          image: element.image,
          price: element.price,
          category: element.category,
          quantity: 0,
        };
        prod.push(newProduct);
        document.getElementById("products").innerHTML += 
        `<div class="col-lg-4 col-md-6 col-sm-12">
          <div class="card border-primary mb-3" style="max-width: 30rem;">
            <div class="card-header bg-success" > ${element.title}</div>
            <div class="card-body">
            <h4 class="card-title" > ${element.category} </h4>
            <img class="img-thumbnail" src="${element.image}" alt="Random picture" />
            <p class="card-text" > ${element.description} </p>
            <h4 class="card-price" > ${element.price.toFixed(2)} $</h4>
            <button class="btn btn-secondary" onclick="toCart(${element.id})" > Add to cart </button>
          </div>
        </div>`;
      })
    );
}

function getProduct(id) {
  var returnProduct;
  prod.forEach((element) => {
    if (element.id == id) {
      returnProduct = element;
    }
  });
  return returnProduct;
}

function toCart(id) {
  var adding = getProduct(id);
  var test = false
  cart.forEach(element => {
    if (element.id == id){
      test = true
      adding = element
    }
  })
  if (!test) {
    adding.quantity = 1;
    cart.push(adding);
  } 
  else {
    adding.quantity += 1
      }
  saveCart()
}

function addProduct(product) {
  window.location.reload()
  let add = JSON.parse(localStorage.getItem("cart"));
  let adding = add.find((element) => element.id == product);
  adding.quantity += 1;
  localStorage.setItem("cart", JSON.stringify(add));
}

function removeProduct(product) {
  window.location.reload();
  let cart = JSON.parse(localStorage.getItem("cart"));
  let removing = cart.find((element) => element.id == product);
    if (removing.quantity !== 0) {
      removing.quantity += -1;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

$("#placeOrder").click(function () {
  let name = document.forms["myForm"]["name"].value;
  let phone = document.forms["myForm"]["phone"].value;
  let adress = document.forms["myForm"]["adress"].value;
  let email = document.forms["myForm"]["email"].value;

  if (name == "" || phone == "" || adress == "" || email == "") {
    alert("You need to fill in every field to place the order");
  } 
  else {
    alert("Thanks for shopping at Cribbshop, please come again");
    localStorage.clear();
  }
});

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

$("#clear").click(function () {
  localStorage.clear();
});
