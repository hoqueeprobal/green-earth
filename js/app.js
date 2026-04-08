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

// Fetch categories from API and render them dynamically
const loadCategory = async () => {
  try {
    categoryContainer.innerHTML = "";

    const allTypesLi = document.createElement("li");
    allTypesLi.id = "all-types";
    allTypesLi.className =
      "hover:bg-green-700 hover:text-white rounded-lg cursor-pointer px-3 py-2 active-li bg-green-700 text-white";
    allTypesLi.textContent = "All Types";
    categoryContainer.appendChild(allTypesLi);

    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();

    data.categories.forEach((cat) => {
      const li = document.createElement("li");
      li.id = cat.id;
      li.className =
        "hover:bg-green-700 hover:text-white rounded-lg cursor-pointer px-3 py-2 active-li";
      li.textContent = cat.category_name;
      categoryContainer.appendChild(li);
    });
  } catch (err) {
    console.log(err);
  }
};

// Load data when app starts
loadCategory();


