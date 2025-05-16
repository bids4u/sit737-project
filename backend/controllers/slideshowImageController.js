const slideshowImageService = require('../services/slideshowImageService');

// Create a new slideshow image
const createSlideshowImage = async (req, res, next) => {
    try {
        const newImage = await slideshowImageService.createSlideshowImage(req.body);
        res.status(201).json(newImage);
    } catch (error) {
        next(error);
    }
};

// Get all slideshow images
const getAllSlideshowImages = async (req, res, next) => {
    try {
        const images = await slideshowImageService.getAllSlideshowImages();
        res.status(200).json(images);
    } catch (error) {
        next(error);
    }
};

// Get a slideshow image by ID
const getSlideshowImageById = async (req, res, next) => {
    try {
        const image = await slideshowImageService.getSlideshowImageById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Slideshow image not found' });
        }
        res.status(200).json(image);
    } catch (error) {
        next(error);
    }
};

// Update a slideshow image by ID
const updateSlideshowImageById = async (req, res, next) => {
    try {
        const updatedImage = await slideshowImageService.updateSlideshowImageById(req.params.id, req.body);
        if (!updatedImage) {
            return res.status(404).json({ message: 'Slideshow image not found' });
        }
        res.status(200).json(updatedImage);
    } catch (error) {
        next(error);
    }
};

// Delete a slideshow image by ID
const deleteSlideshowImageById = async (req, res, next) => {
    try {
        const deletedImage = await slideshowImageService.deleteSlideshowImageById(req.params.id);
        if (!deletedImage) {
            return res.status(404).json({ message: 'Slideshow image not found' });
        }
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSlideshowImage,
    getAllSlideshowImages,
    getSlideshowImageById,
    updateSlideshowImageById,
    deleteSlideshowImageById
};
