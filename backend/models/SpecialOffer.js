const mongoose = require('mongoose');

const specialOfferSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    image_url: { type: String }, // Add image URL field
    discount: { type: Number }, // Make discount optional
    price: { type: Number, required: true  } // Make discount optional
}, { timestamps: true });

module.exports = mongoose.model('SpecialOffer', specialOfferSchema);
