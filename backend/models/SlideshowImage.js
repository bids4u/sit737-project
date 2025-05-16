const mongoose = require('mongoose');

const slideshowImageSchema = new mongoose.Schema({
    image_url: { type: String, required: true },
    caption: { type: String }, // Optional caption for the image
    order: { type: Number, required: true }, // Order of the image in the slideshow
    link: { type: String } // Optional link to redirect
}, { timestamps: true });

module.exports = mongoose.model('SlideshowImage', slideshowImageSchema);
