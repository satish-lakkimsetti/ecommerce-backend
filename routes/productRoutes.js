// Import the Express framework to define routes
import express from 'express';

// Import the Product model to interact with the MongoDB products collection
import Product from '../models/Product.js';

// Create a new Express router instance
const router = express.Router();

/**
 * @route   GET /products
 * @desc    Fetch and return all products from the database
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    // Fetch all product documents from the MongoDB collection
    const products = await Product.find();

    // Respond with 200 OK and send products as JSON
    res.status(200).json(products);
  } catch (err) {
    // Catch and respond with 500 if there's a server/database error
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});

/**
 * @route   POST /products
 * @desc    Create and save a new product in the database
 * @access  Public (can be secured later with auth)
 */
router.post('/', async (req, res) => {
  try {
    // Create a new Product instance using data from the request body
    const product = new Product(req.body);

    // Save the product to the database
    const savedProduct = await product.save();

    // Respond with 201 Created and return the saved product
    res.status(201).json(savedProduct);
  } catch (err) {
    // Handle validation errors and send 400 Bad Request
    res.status(400).json({
      message: 'Failed to create product',
      error: err.message
    });
  }
});

// Export the configured router to be used in index.js
export default router;