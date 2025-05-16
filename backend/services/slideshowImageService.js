const SlideshowImage = require('../models/SlideshowImage');

// Create a new slideshow image
const createSlideshowImage = async (imageData) => {
    try {
        const newImage = new SlideshowImage(imageData);
        return await newImage.save();
    } catch (error) {
        throw new Error('Error creating slideshow image');
    }
};

// Get all slideshow images
const getAllSlideshowImages = async () => {
    try {
        return await SlideshowImage.find().sort({ order: 1 });
    } catch (error) {
        throw new Error('Error fetching slideshow images');
    }
};

// Get a slideshow image by ID
const getSlideshowImageById = async (id) => {
    try {
        return await SlideshowImage.findById(id);
    } catch (error) {
        throw new Error('Error fetching slideshow image by ID');
    }
};

// Update a slideshow image by ID
const updateSlideshowImageById = async (id, imageData) => {
    try {
        return await SlideshowImage.findByIdAndUpdate(id, imageData, { new: true });
    } catch (error) {
        throw new Error('Error updating slideshow image');
    }
};

// Delete a slideshow image by ID
const deleteSlideshowImageById = async (id) => {
    try {
        return await SlideshowImage.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error deleting slideshow image');
    }
};

module.exports = {
    createSlideshowImage,
    getAllSlideshowImages,
    getSlideshowImageById,
    updateSlideshowImageById,
    deleteSlideshowImageById
};
