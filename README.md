# 🌱 Green Earth

A responsive web app built with **HTML, Tailwind CSS, DaisyUI and JavaScript (ES6+)** that helps users explore plants and contribute to a greener future

---

## 🚀 Live Link

[Green Earth](https://hoqueeprobal.github.io/green-earth/)

---



## ✨ Features

- 🌿 Browse plants by categories  
- 🔍 View detailed plant information in a modal  
- 🛒 Add plants to cart with quantity management  
- 💰 Dynamic total price calculation  
- 📱 Fully responsive design (mobile & desktop)  
- ⚡ Loading spinner for better UX  
- 🎯 Sticky sidebar for categories and cart  

---

## 🛠️ Tech Stack

- HTML5  
- Tailwind CSS  
- DaisyUI  
- JavaScript (ES6+)  
- Font Awesome  
- REST API (Programming Hero Open API)  

---

## ⚙️ Key Functionalities

### 🌿 Category System
- Dynamically loads categories from API  
- Active category highlighting  
- Mobile-friendly toggle menu  

### 🌱 Plant Display
- Fetches and renders plant data dynamically  
- Clean card-based UI with image, price, and description  

### 🔍 Product Modal
- Click to view detailed plant information  
- Uses dynamic modal rendering  

### 🛒 Cart System
- Add/remove items  
- Quantity increment for existing items  
- Real-time UI update  

### 💰 Price Calculation
- Uses `reduce()` for accurate total price  
- Updates instantly on cart changes  

---

## 🔗 API Endpoints

### 🌿 Get All Plants
https://openapi.programming-hero.com/api/plants  

### 📂 Get Categories
https://openapi.programming-hero.com/api/categories  

### 🌱 Get Plants by Category
https://openapi.programming-hero.com/api/category/{id}  

### 🔍 Get Plant Details
https://openapi.programming-hero.com/api/plant/{id}  

---

## 📂 Project Structure

```plaintext
Green-Earth/
│── index.html
│── assets/
│   ├── about.png
│   ├── hero-leaf1.png
│   └── hero-leaf2.png
│── js/
│   └── app.js
└── README.md