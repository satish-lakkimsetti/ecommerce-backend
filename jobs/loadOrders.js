// Import mongoose to interact with MongoDB
import mongoose from 'mongoose';

// Load environment variables from the .env file
import dotenv from 'dotenv';

// Path utilities to work with file locations
import path from 'path';

// ES Module helper to simulate __dirname behavior
import { fileURLToPath } from 'url';

// Import the Order model to insert/update order documents
import Order from '../models/Order.js';

// Import custom utility to load CSV data and transform it
import { loadCSV } from '../utils/csvLoader.js';

// Initialize environment variables from .env file
dotenv.config();

// Resolve the current filename and directory using ES Module approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB using the connection URI from environment variable
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Log a success message after DB connection
    console.log('MongoDB connected for order load.');

    // Build the full path to the orders CSV file
    const csvPath = path.join(__dirname, '../data/orders.csv');

    // Load and parse the CSV into an array of order objects
    const orders = await loadCSV(csvPath, (row) => ({
      orderId: row.orderId,                         // Unique order identifier
      customerName: row.customerName,               // Customer's name
      products: JSON.parse(row.products),           // Parse product array string into real array
      totalAmount: Number(row.totalAmount),         // Convert total amount to number
      paymentStatus: row.paymentStatus              // e.g., 'Paid', 'Pending'
    }));

    // Loop through each order and insert or update it in the database
    for (const order of orders) {
      await Order.findOneAndUpdate(
        { orderId: order.orderId }, // Match existing order by unique order ID
        order,                      // New or updated order data
        { upsert: true, new: true } // Insert if not found, return updated doc
      );
    }

    // Log how many orders were processed and exit successfully
    console.log(`Inserted ${orders.length} orders.`);
    process.exit(0); // Terminate the process cleanly
  })
  .catch((err) => {
    // Log any connection or runtime errors and exit with error code
    console.error('Order load error:', err.message);
    process.exit(1);
  });