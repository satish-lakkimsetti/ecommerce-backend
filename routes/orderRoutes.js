// Import Express framework to create route handlers
import express from 'express';

// Import the Order model to interact with the MongoDB orders collection
import Order from '../models/Order.js';

// Create a new router instance to define /orders routes
const router = express.Router();

/**
 * @route   GET /orders
 * @desc    Fetch all orders from the database
 * @access  Public (can be protected later)
 */
router.get('/', async (req, res) => {
  try {
    // Retrieve all order documents from MongoDB
    const orders = await Order.find();
    
    // Send the list of orders as a JSON response
    res.status(200).json(orders);
  } catch (err) {
    // Handle server or database errors
    res.status(500).json({ message: 'Server error while fetching orders ' });
  }
});

/**
 * @route   POST /orders
 * @desc    Create a new order and save it to the database
 * @access  Public (can be protected later)
 */
router.post('/', async (req, res) => {
  try {
    // Create a new Order instance using the request body
    const order = new Order(req.body);

    // Save the new order document to MongoDB
    const savedOrder = await order.save();

    // Return the saved order as confirmation
    res.status(201).json(savedOrder);
  } catch (err) {
    // Handle validation errors or bad input
    res.status(400).json({
      message: 'Failed to create order',
      error: err.message
    });
  }
});

// Export the router so it can be used in index.js
export default router;