const express = require('express');
const router = express.Router();
const customizableItemController = require('../controllers/customizableItemController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeAdmin = require('../middlewares/authorizeAdmin');

router.post('/', authMiddleware, authorizeAdmin, customizableItemController.createCustomizableItem);
router.get('/', authMiddleware, authorizeAdmin, customizableItemController.getAllCustomizableItems);
router.get('/:id', authMiddleware, authorizeAdmin, customizableItemController.getCustomizableItemById);
router.put('/:id', authMiddleware, authorizeAdmin, customizableItemController.updateCustomizableItem);
router.delete('/:id', authMiddleware, authorizeAdmin, customizableItemController.deleteCustomizableItem);

module.exports = router;
