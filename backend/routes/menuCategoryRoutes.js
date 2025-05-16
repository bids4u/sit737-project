const express = require('express');
const router = express.Router();
const menuCategoryController = require('../controllers/menuCategoryController');
const authenticate = require('../middlewares/authMiddleware');
const authorizeAdmin = require('../middlewares/authorizeAdmin');

// Routes for menu categories
router.post('/', authenticate, authorizeAdmin, menuCategoryController.createMenuCategory);
router.get('/', authenticate, authorizeAdmin, menuCategoryController.getAllMenuCategories);
router.get('/:id', authenticate, authorizeAdmin, menuCategoryController.getMenuCategoryById);
router.put('/:id', authenticate, authorizeAdmin, menuCategoryController.updateMenuCategory);
router.delete('/:id', authenticate, authorizeAdmin, menuCategoryController.deleteMenuCategory);

module.exports = router;
