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

    const res = await fetch(
      "https://openapi.programming-hero.com/api/categories",
    );
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

// Load all plant data from API
const fetchAllPost = async () => {
  try {
    loading(true);
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    loadPost(data.plants);
  } catch (err) {
    console.log(err);
  } finally {
    loading(false);
  }
};

// Display plant data in UI
const loadPost = async (data) => {
  postContainer.innerHTML = "";
  data.forEach((plant) => {
    const div = document.createElement("div");
    div.className =
      "card bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition p-3 card-parent";
    div.innerHTML = `
  <figure class="overflow-hidden rounded-xl">
    <img class="w-full h-48 object-cover"
      src="${plant.image}"
      alt="plant"
      />
  </figure>
  
  <div class="card-body px-2 py-4 space-y-3">
  <h2 class="text-lg font-semibold text-gray-800 cursor-pointer" onclick="showDetails('${plant.id}')">${plant.name}</h2>
  <p class="text-sm text-gray-600 line-clamp-2 ">
      ${plant.description}
      </p>
      <div class="flex justify-between items-center">
      <span class="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
      ${plant.category}
      </span>
      <span class="text-lg font-bold text-black-600">৳<span class="price ">${plant.price}</span></span>
      </div>
      <div class="card-actions mt-2">
     <button class="btn bg-green-600 hover:text-black text-white rounded-full w-full text-base font-medium py-2 cart-btn" data-id="${plant.id}">
     Add to Cart
     </button> 
      </div>
      </div>
      `;
    postContainer.appendChild(div);
  });
};

// Category filtering
const plantsByCategorie = async (id) => {
  try {
    loading(true);

    const res = await fetch(
      `https://openapi.programming-hero.com/api/category/${id}`,
    );
    const data = await res.json();

    loadPost(data.plants);
  } catch (err) {
    console.log(err);
  } finally {
    loading(false);
  }
};

// Category click event
categoryContainer.addEventListener("click", (e) => {
  if (e.target.nodeName === "LI") {
    document.querySelectorAll(".active-li").forEach((li) => {
      li.classList.remove("bg-green-700", "text-white");
    });

    const id = e.target.id;
    e.target.classList.add("bg-green-700", "text-white");

    if (id === "all-types") {
      fetchAllPost();
    } else {
      plantsByCategorie(id);
    }

    categoryContainer.classList.add("hidden");
  }
});

//Show details in modal
const showDetails = async (id) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/plant/${id}`,
    );
    const data = await res.json();
    const detail = data.plants;

    const dialog = document.createElement("dialog");
    dialog.className = "modal modal-middle";

    dialog.innerHTML = `
      <div class="modal-box space-y-3">
        <h3 class="text-2xl font-bold">${detail.name}</h3>

        <img src="${detail.image}" class="w-full h-60 object-cover rounded-md"/>

        <p><strong>Category:</strong> ${detail.category}</p>
        <p><strong>Price:</strong> ৳${detail.price}</p>
        <p>${detail.description}</p>

        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    `;

    modalContainer.innerHTML = "";
    modalContainer.appendChild(dialog);
    dialog.showModal();
  } catch (err) {
    console.log(err);
  }
};

// Add to cart functionality
postContainer.addEventListener("click", (e) => {
  if (e.target.nodeName === "BUTTON") {
    const card = e.target.closest(".card-parent");

    const name = card.querySelector("h2").textContent;
    const price = parseInt(card.querySelector(".price").textContent);
    const id = e.target.dataset.id;

    const existingItem = addToCart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      addToCart.push({
        name,
        price,
        id,
        quantity: 1,
      });
    }

    alert(`${name} added to cart`);

    updateCart();
    calculatePrice();
  }
});

// Load data when app starts
fetchAllPost();
loadCategory();
