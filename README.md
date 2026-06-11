# GrabIt — React E-Commerce App

A full-featured e-commerce web app built with React.

## 🔗 Live Demo
[https://react-grab-it-ecommerce.vercel.app](https://react-grab-it-ecommerce.vercel.app)

## ✨ Features
- Browse, search & filter products by category
- Product detail page with quantity selector
- Add to cart & wishlist (per-user)
- User authentication — signup, login, logout
- Protected routes — cart, wishlist & checkout require login
- Guests redirected away from login/signup if already logged in
- Checkout with full form validation
- Order confirmation
- Mock REST API via json-server

## 🛠 Tech Stack
React 19, React Router v7, Tailwind CSS v4, Axios,
React Hook Form, Yup, json-server

## 🚀 Getting Started

# 1. Install dependencies
npm install

# 2. Start mock backend (port 5000)
npm run server

# 3. Start frontend (port 5173)
npm run dev

## 📝 Note
The backend is powered by json-server (mock REST API) for demo purposes.
In a production app this would be replaced with a real backend (e.g. Node.js + Express + MongoDB).