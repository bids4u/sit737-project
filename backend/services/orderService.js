const Order = require('../models/Order');

const createOrder = async (orderData) => {
    try {
        console.log(orderData)
        const newOrder = new Order(orderData);
        return await newOrder.save();
    } catch (error) {
        console.log(error)
        throw new Error('Error creating order');
    }
};

const getAllOrders = async () => {
    try {
        return await Order.find()
            .populate({
                path: 'items.item', // Populate `item` in `items`model: 'FixedMenuItem', // Specify the model to populate
                model: 'FixedMenuItem',
            })
            .populate({
                path: 'customItems.item', // Populate `item` in `customItems`model: 'CustomizableItem', // Specify the model to populate
                model: 'CustomizableItem',
            })
            .populate({
                path: 'specialOffer.item', // Populate `item` in `specialOffer`model: 'SpecialOffer', // Specify the model to populate
                model: 'SpecialOffer',
            }).sort({ createdAt: -1 });;
    } catch (error) {
        throw new Error('Error fetching orders');
    }
};


const getOrderById = async (id) => {
    try {
        return await Order.findById(id).populate('items').populate('customItems').populate('specialOffer');
    } catch (error) {
        throw new Error('Error fetching order by ID');
    }
};

const updateOrderById = async (id, orderData) => {
    try {
        return await Order.findByIdAndUpdate(id, orderData, { new: true }).populate('items').populate('customItems').populate('specialOffer');
    } catch (error) {
        throw new Error('Error updating order');
    }
};

const deleteOrderById = async (id) => {
    try {
        return await Order.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error deleting order');
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
};
