const menuCategoryService = require('../services/menuCategoryService');

const createMenuCategory = async (req, res, next) => {
    try {
        const menuCategory = await menuCategoryService.createMenuCategory(req.body, req.user.id);
        res.status(201).json({ message: 'Menu category created successfully', data: menuCategory });
    } catch (error) {
        next(error);
    }
};

const getAllMenuCategories = async (req, res, next) => {
    try {
        const menuCategories = await menuCategoryService.getAllMenuCategories();
        res.status(200).json({ message: 'Menu categories retrieved successfully', data: menuCategories });
    } catch (error) {
        next(error);
    }
};

const getMenuCategoryById = async (req, res, next) => {
    try {
        const menuCategory = await menuCategoryService.getMenuCategoryById(req.params.id);
        res.status(200).json({ message: 'Menu category retrieved successfully', data: menuCategory });
    } catch (error) {
        next(error);
    }
};

const updateMenuCategory = async (req, res, next) => {
    try {
        const menuCategory = await menuCategoryService.updateMenuCategory(req.params.id, req.body);
        res.status(200).json({ message: 'Menu category updated successfully', data: menuCategory });
    } catch (error) {
        next(error);
    }
};

const deleteMenuCategory = async (req, res, next) => {
    try {
        await menuCategoryService.deleteMenuCategory(req.params.id);
        res.status(204).json({ message: 'Menu category deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createMenuCategory,
    getAllMenuCategories,
    getMenuCategoryById,
    updateMenuCategory,
    deleteMenuCategory,
};
