const MenuCategory = require('../models/MenuCategory');

const createMenuCategory = async (data, userId) => {
    console.log('dtat>>>>',userId)
    try {
        const menuCategory = new MenuCategory({ ...data, user_id: userId });
        return await menuCategory.save();
    } catch (error) {
        throw new Error('Error creating menu category: ' + error.message);
    }
};

const getAllMenuCategories = async () => {
    try {
        return await MenuCategory.find(); // Retrieve all menu categories
    } catch (error) {
        throw new Error('Error fetching menu categories: ' + error.message);
    }
};

const getMenuCategoryById = async (id) => {
    try {
        const menuCategory = await MenuCategory.findById(id);
        if (!menuCategory) {
            throw new Error('Menu category not found');
        }
        return menuCategory;
    } catch (error) {
        throw new Error('Error fetching menu category: ' + error.message);
    }
};

const updateMenuCategory = async (id, data) => {
    try {
        const menuCategory = await MenuCategory.findByIdAndUpdate(id, data, { new: true });
        if (!menuCategory) {
            throw new Error('Menu category not found');
        }
        return menuCategory;
    } catch (error) {
        throw new Error('Error updating menu category: ' + error.message);
    }
};

const deleteMenuCategory = async (id) => {
    try {
        const menuCategory = await MenuCategory.findByIdAndDelete(id);
        if (!menuCategory) {
            throw new Error('Menu category not found');
        }
        return menuCategory;
    } catch (error) {
        throw new Error('Error deleting menu category: ' + error.message);
    }
};

module.exports = {
    createMenuCategory,
    getAllMenuCategories,
    getMenuCategoryById,
    updateMenuCategory,
    deleteMenuCategory,
};
