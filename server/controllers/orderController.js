const Order = require('../models/Order');

// Mock data for orders from different channels
// This data simulates orders from Shopify, Amazon, and eBay
// In a real application, this data would come from the respective APIs or databases.
// Each order has a unique ID, channel, items, total cost, and status
// The status can be 'pending', 'success', or 'failed'.
// This allows us to test the order syncing functionality without needing real API calls.
 const SHOPIFY_ITEMS = [ 
  { items: ['T-shirt', 'Shoes'], totalCost: 1599 },
  { items: ['Hoodie', 'Cap'], totalCost: 1299 },
  { items: ['Jacket', 'Belt'], totalCost: 1799 }
];

const AMAZON_ITEMS = [
  { items: ['Headphones', 'Laptop Bag'], totalCost: 4599 },
  { items: ['Mouse', 'Keyboard'], totalCost: 2699 },
  { items: ['Power Bank', 'USB Cable'], totalCost: 1999 },
  { items: ['Smartphone Case', 'Screen Protector'], totalCost: 799 },
  { items: ['Bluetooth Speaker', 'Smartwatch'], totalCost: 7999 }
];

const EBAY_ITEMS = [
  { items: ['Watch', 'Sunglasses'], totalCost: 2899 },
  { items: ['Vintage Camera', 'Tripod'], totalCost: 5599 }
];

// Get a random order from the mock data. This function randomly selects an order from the provided array of items.
function getRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Sync Shopify order
exports.syncShopify = async (req, res) => {
  const selection = getRandomFrom(SHOPIFY_ITEMS);
  await syncOrderHelper('SHPY', 'Shopify', selection.items, selection.totalCost, res);
};

// Sync Amazon order
exports.syncAmazon = async (req, res) => {
  const selection = getRandomFrom(AMAZON_ITEMS);
  await syncOrderHelper('AMZ', 'Amazon', selection.items, selection.totalCost, res);
};

// Sync eBay order
exports.syncEbay = async (req, res) => {
  const selection = getRandomFrom(EBAY_ITEMS);
  await syncOrderHelper('EBAY', 'eBay', selection.items, selection.totalCost, res);
};

// General function to handle order syncing. This function has a prefix, channel name, items, total cost, and response object.
async function syncOrderHelper(prefix, channel, items, cost, res) {

//   console.log(`Received request to sync ${channel} order`);          To check if the request is received correctly & from which order channel

  try {
    const newOrder = new Order({
      orderId: `${prefix}-${Date.now()}`,
      channel,
      items,
      totalCost: cost,
      status: 'pending'
    });

    await newOrder.save();
    
    // console.log(`Order saved as pending:`, newOrder);                    To check if the order is saved correctly or not.

    // Simulate delay + status update
    setTimeout(async () => {
      const isSuccess = Math.random() > 0.4;                            // Taking 60% success rate
      newOrder.status = isSuccess ? 'success' : 'failed';
      await newOrder.save();
    }, 7000);                                                                      // 7 seconds delay to simulate processing time

    res.status(201).json({ message: `${channel} order synced (pending)!`, order: newOrder });               // Respond to client with  after saving pending order
  } 
  catch (err) {
    res.status(500).json({ error: `${channel} sync failed` });
  }
}

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });         // Fetch all orders from the database and sort them by creation date in descending order and display them in the order of latest first
    res.status(200).json(orders);
  } 
  catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });          // Handle error if fetching orders fails
  }
};


// Retry failed Orders
exports.retryOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({ orderId });                      // Find the order details by orderId in the database

    if (!order) {                                                                   // edge case 1
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status !== 'failed') {                                                    //edge case 2
      return res.status(400).json({ error: 'Only failed orders can be retried' });
    }

    order.status = 'pending';
    await order.save();

    setTimeout(async () => {
      const isSuccess = Math.random() > 0.1;                     // 90% success rate for retry
      order.status = isSuccess ? 'success' : 'failed';
      await order.save();
    }, 8000);

    res.status(200).json({ message: 'Retry initiated', order });                // Don't wait for the retry to complete, just acknowledge the request
  } 
  
  catch (err) {
    res.status(500).json({ error: 'Retry failed due to server error' });
  }
};