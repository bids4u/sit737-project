const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FixedMenuItem' // Adjust according to the type of order
        },
        quantity: {
            type: Number,
            required: true,
            default: 1 // Default quantity is 1
        }
    }],
    customItems: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CustomizableItem' // Adjust if `customized` type
        },
        quantity: {
            type: Number,
            required: true,
            default: 1 // Default quantity is 1
        }
    }],
    specialOffer: {
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SpecialOffer' // Adjust if `special` type
        },
        quantity: {
            type: Number,
            required: true,
            default: 1 // Default quantity is 1
        }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    customer: {
        name: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
        address: { type: String, required: false }
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'], // Possible statuses
        default: 'pending'
    },
    paymentScreenshot: {  // New field
        type: String,
        required: false // Optional field
    },
    optionalRequest: {  // New field for optional requests
        type: String,
        required: false // Optional field
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
