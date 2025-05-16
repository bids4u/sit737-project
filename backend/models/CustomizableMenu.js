const mongoose = require('mongoose');

const customizableMenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    base_price: { type: Number, required: true },
    image_url: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('CustomizableMenu', customizableMenuSchema);
