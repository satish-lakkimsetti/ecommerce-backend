// Import the Express framework to create and manage the server
import express from 'express';

// Import Mongoose for MongoDB interaction
import mongoose from 'mongoose';

// Load environment variables from the .env file
import dotenv from 'dotenv';

// Import custom route handlers for products and orders
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Import global error handling middleware
import errorHandler from './middleware/errorMiddleware.js';

// Initialize environment variable support
dotenv.config();

// Create an instance of the Express application
const app = express();

// Middleware: Parse incoming JSON requests automatically
app.use(express.json());

// Mount product-related API routes at /products
app.use('/products', productRoutes);

// Mount order-related API routes at /orders
app.use('/orders', orderRoutes);

// Global error handler middleware (must be after all routes)
app.use(errorHandler);

// Define port from environment or fallback (optional: add default value)
const PORT = process.env.PORT;

// Establish MongoDB connection using Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

// Root route for server health check
app.get('/', (req, res) => {
  res.send('E-commerce API is up and running!');
});

// Start the server and listen for incoming HTTP requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});