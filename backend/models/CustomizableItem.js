const mongoose = require('mongoose');

const customizableItemSchema = new mongoose.Schema({
    customizable_menu_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomizableMenu', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('CustomizableItem', customizableItemSchema);
