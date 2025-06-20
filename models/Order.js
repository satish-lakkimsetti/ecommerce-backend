// Import mongoose library for schema definition and model creation
import mongoose from 'mongoose';

// Define a new schema for the Order collection
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,       // Unique identifier for the order (e.g., "ORD001")
    required: true,     // Must be provided when creating an order
    unique: true        // Prevents duplicate order IDs in the collection
  },
  customerName: {
    type: String,       // Name of the customer who placed the order
    required: true
  },
  products: [
    {
      productId: String,  // ID of the product included in the order
      quantity: Number    // Quantity of the product in the order
    }
  ],
  totalAmount: {
    type: Number,       // Sum of all product prices × quantities
    required: true
  },
  paymentStatus: {
    type: String,       // Status of payment: "Paid", "Pending", etc.
    required: true
  },
  orderDate: {
    type: Date,         // Timestamp for when the order was created
    default: Date.now   // Defaults to current date/time
  }
});

// Create and export the Order model to use elsewhere in the app
export default mongoose.model('Order', orderSchema);