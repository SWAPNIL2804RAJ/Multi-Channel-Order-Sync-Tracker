const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

  orderId: String,                           // Unique identifier for the order

  channel: String,                          // Shopify, Amazon, eBay, etc.

  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },

  items: [String],                              // Array of item IDs or names in the order

  totalCost: {                                          // Total cost of the order
    type: Number,
    required: true,
    default: 0
  },                            
  currency: {                                     // Currency of the order
    type: String,
    default: 'INR'
  },

  createdAt: {                                      // Timestamp for when the order was created
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
