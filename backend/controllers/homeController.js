const homeService = require('../services/homeService');

// Get all slideshow images and special offers
async function getOffersAndImages(req, res) {
  try {
    const { slideshowImages, specialOffers } = await homeService.getAllOffersAndImages();
    res.status(200).json({ slideshowImages, specialOffers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getOffersAndImages,
  // Other functions...
};
