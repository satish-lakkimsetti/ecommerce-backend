// Import mongoose for connecting to MongoDB
import mongoose from 'mongoose';

// Load environment variables from .env file into process.env
import dotenv from 'dotenv';

// Built-in path utility to handle file paths reliably
import path from 'path';

// Helper to simulate __dirname in ES modules
import { fileURLToPath } from 'url';

// Import the Product model schema from the models folder
import Product from '../models/Product.js';

// Import the reusable CSV loader utility function
import { loadCSV } from '../utils/csvLoader.js';

// Load environment variables (e.g., MONGO_URI)
dotenv.config();

// Reconstruct __filename and __dirname since ES modules don’t expose them by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to the MongoDB database using the URI from .env
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Log successful connection message
    console.log('MongoDB connected for product load.');

    // Build the absolute path to the products CSV file
    const csvPath = path.join(__dirname, '../data/products.csv');

    // Load and transform product data from the CSV file
    const products = await loadCSV(csvPath, (row) => ({
      productId: row.productId,             // Custom product ID (e.g., "PROD001")
      name: row.name,                       // Product name
      description: row.description,         // Optional product description
      price: Number(row.price),             // Convert price to number
      category: row.category,               // Product category (e.g., "Electronics")
      inStock: row.inStock === 'true'       // Convert string to boolean (from CSV)
    }));

    // Iterate through all parsed products and insert/update in DB
    for (const product of products) {
      await Product.findOneAndUpdate(
        { productId: product.productId },   // Match by unique productId
        product,                            // New data from CSV
        { upsert: true, new: true }         // Insert if not found; return new document
      );
    }

    // Log how many products were processed
    console.log(`Inserted ${products.length} products.`);
    process.exit(0); // Exit the process after successful completion
  })
  .catch((err) => {
    // Catch any connection or runtime errors and log them
    console.error('Product load error:', err.message);
    process.exit(1); // Exit with error code
  });