function orderOnWhatsApp(productName, price) {
  const phoneNumber = "919974717061";

  const message =
    "Hello Tiger Bags, I want to order: " +
    productName +
    "\nPrice: ₹" +
    price;

  const whatsappUrl =
    "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

  window.open(whatsappUrl, "_blank");
}
function updateProducts() {
  const searchText = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  const selectedCategory =
    document.getElementById("categoryFilter").value;

  const products = document.querySelectorAll(".shop-product-card");
  let visibleProducts = 0;

  products.forEach(function (product) {
    const productName = product.dataset.name.toLowerCase();
    const productCategory = product.dataset.category;

    const matchesSearch = productName.includes(searchText);
   const matchesCategory =
selectedCategory === "all" ||
product.category.toLowerCase().includes(selectedCategory);
    if (matchesSearch && matchesCategory) {
      product.style.display = "block";
      visibleProducts++;
    } else {
      product.style.display = "none";
    }
  });

  document.getElementById("productCount").textContent =
    visibleProducts + " product(s) found";

  document.getElementById("noProducts").style.display =
    visibleProducts === 0 ? "block" : "none";
}


const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const businessNumber = "916378348074";

    const whatsappMessage =
      "Hello Tiger Bags,%0A%0A" +
      "Name: " + name + "%0A" +
      "Phone: " + phone + "%0A" +
      "Subject: " + subject + "%0A" +
      "Message: " + message;

    window.open(
      "https://wa.me/" + businessNumber + "?text=" + whatsappMessage,
      "_blank"
    );
  });
}
const params = new URLSearchParams(window.location.search);

if (params.has("name")) {
  const name = params.get("name");
  const price = params.get("price");
  const category = params.get("category");
  const description = params.get("description");

  const productImages = {
    "Classic School Bag": "images/school-bag.jpg",
    "Kids Cartoon Bag": "images/kids-school-bag.jfif",
    "Travel Duffel Bag": "images/duffle-bag.jfif",
    "Trolley Travel Bag": "images/trolley-bag.jfif",
    "Premium Ladies Handbag": "images/ladies-handbag.jfif",
    "Ladies Sling Bag": "images/sling-bag.jfif",
    "Office Laptop Bag": "images/laptop-bag.jfif",
    "Executive Backpack": "images/executive-backpack.jfif"
  };

  document.getElementById("detailName").textContent = name;
  document.getElementById("detailPrice").textContent = "₹" + price;
  document.getElementById("detailCategory").textContent = category;
  document.getElementById("detailDescription").textContent = description;

  const detailImage = document.getElementById("detailImage");

  if (detailImage) {
    detailImage.src = productImages[name] || "images/school-bag.jpg";
    detailImage.alt = name;
  }

  document.getElementById("detailOrderBtn").addEventListener("click", function () {
    orderOnWhatsApp(name, price);
  });
}
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show-menu");
  });
}
let cart = JSON.parse(localStorage.getItem("tigerBagsCart")) || [];

function saveCart() {
  localStorage.setItem("tigerBagsCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const totalItems = cart.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  const mobileCount = document.getElementById("cartCount");
  const desktopCount = document.getElementById("cartCountDesktop");

  if (mobileCount) mobileCount.textContent = totalItems;
  if (desktopCount) desktopCount.textContent = totalItems;
}

function addToCart(name, price, image) {
  const existingItem = cart.find(function (item) {
    return item.name === name;
  });

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      image: image,
      quantity: 1
    });
  }

  saveCart();
showToast("🛒 " + name + " added to cart");
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const emptyCart = document.getElementById("emptyCart");
  const cartSummary = document.getElementById("cartSummary");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !emptyCart || !cartSummary || !cartTotal) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    emptyCart.style.display = "block";
    cartSummary.style.display = "none";
    return;
  }

  emptyCart.style.display = "none";
  cartSummary.style.display = "flex";

  let total = 0;

  cart.forEach(function (item, index) {
    total += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
          <div class="quantity-controls">
            <button onclick="changeQuantity(${index}, -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });

  cartTotal.textContent = total;
}

function changeQuantity(index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function checkoutOnWhatsApp() {
  if (cart.length === 0) return;

  const businessNumber = "919974717061"; // apna actual WhatsApp number lagana

  let message = "Hello Tiger Bags, I want to place an order:%0A%0A";

  cart.forEach(function (item, index) {
    message +=
      (index + 1) +
      ". " +
      item.name +
      " | Qty: " +
      item.quantity +
      " | ₹" +
      item.price * item.quantity +
      "%0A";
  });

  const total = cart.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  message += "%0ATotal Amount: ₹" + total;

  window.open(
    "https://wa.me/" + businessNumber + "?text=" + message,
    "_blank"
  );
}

updateCartCount();
renderCart();
const defaultProducts = [
  {
    name: "Classic School Bag",
    price: 799,
    category: "School Bag",
    image: "images/school-bag.jpg",
    description: "Comfortable, spacious and perfect for daily school use."
  },
  {
    name: "Kids Cartoon Bag",
    price: 599,
    category: "School Bag",
    image: "images/kids-school-bag.jfif",
    description: "Lightweight and colourful bag for young students."
  },
  {
    name: "Travel Duffel Bag",
    price: 1299,
    category: "Travel Bag",
    image: "images/duffle-bag.jfif",
    description: "Large capacity bag for weekend trips and travel."
  },
  {
    name: "Trolley Travel Bag",
    price: 2499,
    category: "Travel Bag",
    image: "images/trolley-bag.jfif",
    description: "Strong wheels and durable design for long journeys."
  },
  {
    name: "Premium Ladies Handbag",
    price: 999,
    category: "Ladies Bag",
    image: "images/ladies-handbag.jfif",
    description: "Elegant handbag for office, outings and special occasions."
  },
  {
    name: "Ladies Sling Bag",
    price: 749,
    category: "Ladies Bag",
    image: "images/sling-bag.jfif",
    description: "Compact, stylish and easy to carry every day."
  },
  {
    name: "Office Laptop Bag",
    price: 1499,
    category: "Office Bag",
    image: "images/laptop-bag.jfif",
    description: "Professional laptop bag with secure compartments."
  },
  {
    name: "Executive Backpack",
    price: 1199,
    category: "Office Bag",
    image: "images/executive-backpack.jfif",
    description: "Modern backpack for office, college and laptop use."
  }
];

let products = JSON.parse(localStorage.getItem("tigerBagsProducts")) || defaultProducts;

function saveProducts() {
  localStorage.setItem("tigerBagsProducts", JSON.stringify(products));
}

function renderAdminProducts() {
  const adminProducts = document.getElementById("adminProducts");

  if (!adminProducts) return;

  adminProducts.innerHTML = "";

  products.forEach(function (product, index) {
    adminProducts.innerHTML += `
      <div class="admin-product">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <h3>${product.name}</h3>
          <p>₹${product.price} | ${product.category}</p>
          <p>${product.description}</p>
        </div>
        <div class="admin-actions">
          <button class="edit-product-btn" onclick="editProduct(${index})">Edit</button>
          <button class="delete-product-btn" onclick="deleteProduct(${index})">Delete</button>
        </div>
      </div>
    `;
  });
}

function editProduct(index) {
  const product = products[index];

  document.getElementById("editIndex").value = index;
  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productCategory").value = product.category;
  document.getElementById("productImage").value = product.image;
  document.getElementById("productDescription").value = product.description;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteProduct(index) {
  const confirmDelete = confirm("Delete this product?");

  if (!confirmDelete) return;

  products.splice(index, 1);
  saveProducts();
  renderAdminProducts();
}

const productForm = document.getElementById("productForm");

if (productForm) {
  productForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const editIndex = document.getElementById("editIndex").value;

    const productData = {
      name: document.getElementById("productName").value,
      price: Number(document.getElementById("productPrice").value),
      category: document.getElementById("productCategory").value,
      image: document.getElementById("productImage").value,
      description: document.getElementById("productDescription").value
    };

    if (editIndex === "") {
      products.push(productData);
    } else {
      products[Number(editIndex)] = productData;
    }

    saveProducts();
    productForm.reset();
    document.getElementById("editIndex").value = "";
    renderAdminProducts();
  });
}

const cancelEditBtn = document.getElementById("cancelEditBtn");

if (cancelEditBtn) {
  cancelEditBtn.addEventListener("click", function () {
    productForm.reset();
    document.getElementById("editIndex").value = "";
  });
}

renderAdminProducts();
function getProductLink(product) {
  return (
    "product.html?name=" + encodeURIComponent(product.name) +
    "&price=" + encodeURIComponent(product.price) +
    "&category=" + encodeURIComponent(product.category) +
    "&description=" + encodeURIComponent(product.description)
  );
}

function renderShopProducts(productList) {
  const productsContainer = document.getElementById("productsContainer");
  const productCount = document.getElementById("productCount");

  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  if (productList.length === 0) {
    productsContainer.innerHTML = "<p class='no-products'>No bags found.</p>";
    if (productCount) productCount.textContent = "No products found";
    return;
  }

  productList.forEach(function (product) {
    productsContainer.innerHTML += `
      <div class="shop-product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>

        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <p class="price">₹${product.price.toLocaleString("en-IN")}</p>

        <a href="${getProductLink(product)}" class="view-details-btn">
          View Details
        </a>
<button
  class="wishlist-btn"
  onclick="addToWishlist('${product.name}', ${product.price}, '${product.image}')"
>
  ❤️ Wishlist
</button>

        <button
          class="add-cart-btn"
          onclick="addToCart('${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.image}')"
        >
          Add to Cart
        </button>

        <button onclick="orderOnWhatsApp('${product.name.replace(/'/g, "\\'")}', '${product.price}')">
          Order on WhatsApp
        </button>
      </div>
    `;
  });

  if (productCount) {
    productCount.textContent = "Showing " + productList.length + " product(s)";
  }
}

function filterShopProducts() {
  const searchText = document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();

  const selectedCategory =
    document.getElementById("categoryFilter").value.toLowerCase();

  const filteredProducts = products.filter(function (product) {
    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      product.category.toLowerCase().includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  renderShopProducts(filteredProducts);
}
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

if (searchInput && categoryFilter) {
  searchInput.addEventListener("input", filterShopProducts);
  categoryFilter.addEventListener("change", filterShopProducts);

  renderShopProducts(products);
}
function getUsers() {
  return JSON.parse(localStorage.getItem("tigerBagsUsers")) || [];
}

function saveUsers(users) {
  localStorage.setItem("tigerBagsUsers", JSON.stringify(users));
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const phone = document.getElementById("registerPhone").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const message = document.getElementById("registerMessage");

    const users = getUsers();

    const alreadyExists = users.some(function (user) {
      return user.email === email;
    });

    if (alreadyExists) {
      message.textContent = "This email is already registered. Please login.";
      return;
    }

    users.push({
      name: name,
      phone: phone,
      email: email,
      password: password
    });

    saveUsers(users);

    sessionStorage.setItem(
      "tigerBagsCurrentUser",
      JSON.stringify({ name: name, phone: phone, email: email })
    );

    window.location.href = "shop.html";
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const error = document.getElementById("loginError");

    const users = getUsers();

    const user = users.find(function (savedUser) {
      return savedUser.email === email && savedUser.password === password;
    });

    if (!user) {
      error.textContent = "Email or password is incorrect.";
      return;
    }

    sessionStorage.setItem(
      "tigerBagsCurrentUser",
      JSON.stringify({
        name: user.name,
        phone: user.phone,
        email: user.email
      })
    );

    window.location.href = "shop.html";
  });
}
function updateNavbarUser() {

    const currentUser = JSON.parse(
        sessionStorage.getItem("tigerBagsCurrentUser")
    );

    const guestMenu = document.getElementById("guestMenu");
    const guestRegister = document.getElementById("guestRegister");

    const userMenu = document.getElementById("userMenu");
    const logoutMenu = document.getElementById("logoutMenu");

    const userName = document.getElementById("userName");

    if (!guestMenu) return;

    if (currentUser) {

        guestMenu.style.display = "none";
        guestRegister.style.display = "none";

        userMenu.style.display = "block";
        logoutMenu.style.display = "block";

        userName.textContent = "👤 " + currentUser.name;

    } else {

        guestMenu.style.display = "block";
        guestRegister.style.display = "block";

        userMenu.style.display = "none";
        logoutMenu.style.display = "none";
    }

}

function logoutUser() {

    sessionStorage.removeItem("tigerBagsCurrentUser");
showToast("👋 Logged out","info");

    window.location.href = "index.html";

}

updateNavbarUser();
function loadProfile() {

    const currentUser = JSON.parse(
        sessionStorage.getItem("tigerBagsCurrentUser")
    );

    if (!document.getElementById("profileName")) return;

    if (!currentUser) {

        window.location.href="login.html";
        return;

    }

    document.getElementById("profileName").textContent=currentUser.name;

    document.getElementById("profileEmail").textContent=currentUser.email;

    document.getElementById("profilePhone").textContent=currentUser.phone;

}

loadProfile();
let wishlist = JSON.parse(
localStorage.getItem("wishlist")
) || [];

function addToWishlist(name,price,image){

const exists = wishlist.find(function(item){

return item.name===name;

});

if(exists){

showToast("❤️ Already in Wishlist","info");

return;

}

wishlist.push({

name:name,

price:price,

image:image

});

localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);

updateWishlistCount();
showToast("❤️ Added to Wishlist");

}

function updateWishlistCount(){

const count=document.getElementById("wishlistCount");

if(count){

count.textContent=wishlist.length;

}

}

function loadWishlist(){

const container=document.getElementById("wishlistItems");

if(!container) return;

container.innerHTML="";

wishlist.forEach(function(item){

container.innerHTML+=`

<div class="cart-item">

<img src="${item.image}">

<div>

<h3>${item.name}</h3>

<p>₹${item.price}</p>

<button onclick="removeWishlist('${item.name}')">

Remove

</button>

</div>

</div>

`;

});

}

function removeWishlist(name){

wishlist=wishlist.filter(function(item){

return item.name!==name;

});

localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);

loadWishlist();

updateWishlistCount();

}

updateWishlistCount();

loadWishlist();
function showToast(message, type = "success") {

    const oldToast = document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement("div");

    toast.className = "toast " + type;

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 2500);

}
const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {

checkoutForm.addEventListener("submit",function(e){

e.preventDefault();

const customer={

name:fullName.value,

phone:phone.value,

address:address.value,

city:city.value,

state:state.value,

pincode:pincode.value

};

localStorage.setItem(

"customer",

JSON.stringify(customer)

);

window.location.href="payment.html";

});

}
const paymentForm = document.getElementById("paymentForm");

if (paymentForm) {

  paymentForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const paymentMethod = document.querySelector(
      'input[name="payment"]:checked'
    ).value;

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const currentUser = JSON.parse(
      sessionStorage.getItem("tigerBagsCurrentUser")
    );

    const total = cart.reduce(function(sum, item) {
      return sum + item.price * item.quantity;
    }, 0);

    orders.push({
      orderId: "TB" + Date.now(),
      date: new Date().toLocaleDateString(),
      payment: paymentMethod,
      total: total,
      items: cart,
      status: "Order Placed",
      customer: currentUser ? currentUser.name : "Guest"
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("tigerBagsCart");

    showToast("✅ Order Placed Successfully");

    setTimeout(function () {
      window.location.href = "order-success.html";
    }, 1200);

  });

}function loadOrders(){

const container=document.getElementById("ordersContainer");

if(!container) return;

const orders=JSON.parse(localStorage.getItem("orders")) || [];

if(orders.length===0){

container.innerHTML="<h2>No Orders Found</h2>";

return;

}

container.innerHTML="";

orders.reverse().forEach(function(order){

container.innerHTML+=`

<div class="order-card">

<h3>Order ID : ${order.orderId}</h3>

<p><b>Date :</b> ${order.date}</p>

<p><b>Total :</b> ₹${order.total}</p>

<p><b>Payment :</b> ${order.payment}</p>

<p class="order-status">

${order.status}

</p>

</div>

`;

});

}

loadOrders();
