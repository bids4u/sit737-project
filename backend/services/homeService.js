const SlideshowImage = require('../models/SlideshowImage');
const SpecialOffer = require('../models/SpecialOffer');

// Fetch all slideshow images and special offers
async function getAllOffersAndImages() {
    const today = new Date();

  const slideshowImages = await SlideshowImage.find();
  const specialOffers = await SpecialOffer.find({
    endDate: { $gte: today },
    startDate: { $lte: today }
});
  return { slideshowImages, specialOffers };
}

module.exports = {
  getAllOffersAndImages,
  // Other functions...
};
