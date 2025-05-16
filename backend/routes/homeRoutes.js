const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Route to get all slideshow images and special offers
router.get('/home', homeController.getOffersAndImages);

module.exports = router;
