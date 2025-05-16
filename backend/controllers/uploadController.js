const cloudinary = require('cloudinary').v2;

/**
 * Upload an image to Cloudinary and return the image URL
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        res.status(200).json({ imageUrl: result.secure_url });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadImage,
};
