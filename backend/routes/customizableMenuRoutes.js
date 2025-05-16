const express = require('express');
const router = express.Router();
const customizableMenuController = require('../controllers/customizableMenuController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeAdmin = require('../middlewares/authorizeAdmin');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', authMiddleware, authorizeAdmin, upload.single('image_file'), customizableMenuController.createCustomizableMenu);
router.get('/:id', authMiddleware, authorizeAdmin, customizableMenuController.getCustomizableMenuById);
router.get('/', authMiddleware, authorizeAdmin, customizableMenuController.getAllCustomizableMenus);
router.put('/:id', authMiddleware, authorizeAdmin, customizableMenuController.updateCustomizableMenu);
router.delete('/:id', authMiddleware, authorizeAdmin, customizableMenuController.deleteCustomizableMenu);

module.exports = router;
