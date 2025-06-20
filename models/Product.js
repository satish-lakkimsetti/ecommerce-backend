// Import mongoose to define schema and interact with MongoDB
import mongoose from 'mongoose';

// Define a schema for Product collection in the database
const productSchema = new mongoose.Schema({
  productId: {
    type: String,     // Unique product identifier (e.g., "PROD001")
    required: true,   // Must be provided
    unique: true      // Ensures no two products have the same ID
  },
  name: {
    type: String,     // Name of the product (e.g., "Bluetooth Speaker")
    required: true
  },
  description: {
    type: String      // Optional field describing the product features
  },
  price: {
    type: Number,     // Price of the product in numerical format
    required: true
  },
  category: {
    type: String,     // Category to group the product (e.g., "Electronics")
    required: true
  },
  inStock: {
    type: Boolean,    // Availability status: true (in stock), false (out of stock)
    default: true     // Defaults to available
  },
  createdAt: {
    type: Date,       // Timestamp of when the product was added
    default: Date.now // Automatically set to current time
  }
});

// Create and export the Product model using the defined schema
export default mongoose.model('Product', productSchema);