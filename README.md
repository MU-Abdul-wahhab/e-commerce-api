⚠️ **WARNING:** Some functionalities may not be fully completed, and certain standards such as consistent status codes, proper error handling, and message formatting are not fully maintained. The `isAdmin` middleware is implemented but not applied to all necessary routes. The primary objective of this project is to demonstrate the integration of **Stripe**, **Cloudinary**, and **Webhook** functionalities.

# 🛒 E-Commerce API Backend

This project is a Node.js-based E-Commerce RESTful API built using **Express**, **MongoDB**, and **Mongoose**. It includes core functionalities for user management, product handling, order processing, reviews, coupon management, and secure payment processing using **Stripe**. Product images are uploaded with **Multer** and stored via **Cloudinary**. Stripe **Webhook** is integrated to manage payment event updates.

---

## 🚀 Features

### 🧑‍💻 User & Admin
- User registration & login (Authentication)
- Protected routes using middleware (Authorization)
- Admin middleware available (partially applied)

### 📦 Products
- Product listing with **pagination**, **filtering**, and **sorting**
- Category and brand management (CRUD)
- Product review system

### 💰 Orders
- Order placement and management
- **Stripe payment integration**
- Stripe **Webhook** for real-time payment status updates
- Order statistics & analytics

### 💸 Coupons
- Coupon creation and application

### 🖼️ Image Handling
- Image uploading via **Multer**
- Image storage and access using **Cloudinary**

---

## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB & Mongoose**
- **Multer**
- **Cloudinary**
- **Stripe API**
- **JWT** for authentication
- **dotenv** for environment variables

