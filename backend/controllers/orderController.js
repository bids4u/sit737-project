const orderService = require('../services/orderService');

// Create a new order
const createOrder = async (req, res, next) => {
    try {
        const newOrder = await orderService.createOrder(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
};

// Get all orders
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

// Get an order by ID
const getOrderById = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

// Update an order by ID
const updateOrderById = async (req, res, next) => {
    try {
        const updatedOrder = await orderService.updateOrderById(req.params.id, req.body);
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        next(error);
    }
};

// Delete an order by ID
const deleteOrderById = async (req, res, next) => {
    try {
        const deletedOrder = await orderService.deleteOrderById(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
};
