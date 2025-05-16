const express = require('express');
const router = express.Router();
const slideshowImageController = require('../controllers/slideshowImageController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeAdmin = require('../middlewares/authorizeAdmin');

// CRUD routes
router.post('/',authenticateToken,authorizeAdmin, slideshowImageController.createSlideshowImage); // Create
router.get('/', slideshowImageController.getAllSlideshowImages); // Get all
router.get('/:id', authenticateToken,authorizeAdmin,slideshowImageController.getSlideshowImageById); // Get by ID
router.put('/:id',authenticateToken,authorizeAdmin, slideshowImageController.updateSlideshowImageById); // Update by ID
router.delete('/:id',authenticateToken,authorizeAdmin, slideshowImageController.deleteSlideshowImageById); // Delete by ID

module.exports = router;
