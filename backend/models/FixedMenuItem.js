const mongoose = require('mongoose');

const fixedMenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    menu_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuCategory', required: true },
    image_url: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('FixedMenuItem', fixedMenuItemSchema);
