# 🛒 E-commerce Backend API

This is a lightweight Node.js + Express backend for managing products and orders, complete with CSV ingestion scripts, robust error handling, and a modular architecture built with MongoDB and Mongoose.

---

## 🚀 Features

- ✅ RESTful APIs for products and orders  
- ✅ CSV ingestion using custom loader scripts  
- ✅ MongoDB with Mongoose models  
- ✅ Express middleware for error handling  
- ✅ Fully tested with Postman  
- ✅ Project ready for portfolio/demo use  

---

## 📁 Folder Structure

├── data/               # products.csv, orders.csv  
├── jobs/               # loadProducts.js, loadOrders.js  
├── models/             # Mongoose schemas  
├── routes/             # API endpoints  
├── middleware/         # errorMiddleware.js  
├── utils/              # loadCSV utility  
├── index.js            # Server entry point  
├── .env.example        # Environment variable sample  
├── .gitignore          # Git exclusions  

---

## ⚙️ Setup Instructions

1. **Clone the repository and install dependencies:**

   ```
   git clone https://github.com/satish-lakkimsetti/ecommerce-backend.git
   cd ecommerce-backend
   npm install
   ```

2. **Create your environment configuration:**

   ```
   cp .env.example .env
   ```

   Then open `.env` and fill in your actual MongoDB connection string and preferred port.

3. **Load initial CSV data (seed products and orders):**

   ```
   npm run load:products
   npm run load:orders
   ```

4. **Start the development server:**

   ```
   npm run dev
   ```

---

## 📦 API Endpoints

| Method | Endpoint         | Description                 |
|--------|------------------|-----------------------------|
| GET    | `/`              | Health check                |
| GET    | `/products`      | Get all products            |
| POST   | `/products`      | Create a new product        |
| GET    | `/orders`        | Get all orders              |
| POST   | `/orders`        | Create a new order          |

> All endpoints expect and return JSON.

---

## 🧪 Sample Product POST Body

```json
{
  "productId": "PROD888",
  "name": "Gaming Headset",
  "description": "Surround sound headphones",
  "price": 2499,
  "category": "Electronics",
  "inStock": true
}
```

---

## 📌 Scripts

```json
"scripts": {
  "dev": "nodemon index.js",
  "load:products": "node jobs/loadProducts.js",
  "load:orders": "node jobs/loadOrders.js"
}
```

Use these to run your server or load CSV seed data directly.

---

## 👨‍💻 Tech Stack

- Node.js  
- Express  
- MongoDB (Atlas)  
- Mongoose  
- csv-parser  
- dotenv  
- Postman (for testing)  

---

## 📂 Environment Variables

Your `.env` file should include:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Reference `.env.example` for structure.

---

## 💬 Author

Built by Satish Lakkimsetti — backend dev with a passion for clean APIs, secure data flow, and real-world architecture.

---

## ✅ Status

✅ Fully functional  
🔒 Secure with schema validation  
🧠 Ready for deployment or demo

📚 **Looking for more details?**  
Check out the [project Wiki](../../wiki) for a deeper dive into API usage, CSV loaders, architecture, and more.

