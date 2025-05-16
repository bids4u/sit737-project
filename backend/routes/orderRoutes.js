const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// CRUD routes
router.post('/', orderController.createOrder); // Create
router.get('/', authMiddleware, orderController.getAllOrders); // Get all
router.get('/:id', authMiddleware, orderController.getOrderById); // Get by ID
router.put('/:id', authMiddleware, orderController.updateOrderById); // Update by ID
router.delete('/:id', authMiddleware, orderController.deleteOrderById); // Delete by ID

module.exports = router;
