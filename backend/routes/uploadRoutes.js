const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// API route to upload an image
router.post('/upload-image', upload.single('image'), uploadController.uploadImage);

module.exports = router;
