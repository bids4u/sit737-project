const express = require('express');
const router = express.Router();
const fixedMenuItemController = require('../controllers/fixedMenuItemController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeAdmin = require('../middlewares/authorizeAdmin');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', authMiddleware, authorizeAdmin, upload.single('image_file'), fixedMenuItemController.createFixedMenuItem);
router.get('/', authMiddleware, authorizeAdmin, fixedMenuItemController.getAllFixedMenuItems);
router.get('/:id', authMiddleware, authorizeAdmin, fixedMenuItemController.getFixedMenuItemById);
router.put('/:id', authMiddleware, authorizeAdmin, fixedMenuItemController.updateFixedMenuItem);
router.delete('/:id', authMiddleware, authorizeAdmin, fixedMenuItemController.deleteFixedMenuItem);

module.exports = router;
