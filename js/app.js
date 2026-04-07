// DOM references and global state
const categoryContainer = document.getElementById("category-container");
const postContainer = document.getElementById("post-container");
const loader = document.getElementById("loader");
const modalContainer = document.getElementById("modal-container");
const cartContainer = document.getElementById("cart-container");
const totalPrice = document.getElementById("total-price");

// Store cart items
let addToCart = [];

// Toggle category button
document.getElementById("toggle-btn").addEventListener("click", () => {
  categoryContainer.classList.toggle("hidden");
});

// Loader function
const loading = (status) => {
  if (status) {
    loader.classList.remove("hidden");
    loader.classList.add("flex");
  } else {
    loader.classList.remove("flex");
    loader.classList.add("hidden");
  }
};