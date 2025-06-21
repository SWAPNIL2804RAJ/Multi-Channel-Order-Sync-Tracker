const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/sync/shopify', orderController.syncShopify);          // PoST route to sync a Shopify order 

router.post('/sync/amazon', orderController.syncAmazon);            // POST route to sync Amazon order

router.post('/sync/ebay', orderController.syncEbay);                 // POST route to sync eBay order    

router.post('/retry/:orderId', orderController.retryOrder);         // POST route to retry an order by ID

router.get('/orders', orderController.getAllOrders);                // GET route to fetch all orders

module.exports = router;
