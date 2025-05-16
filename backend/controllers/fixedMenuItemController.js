const fixedMenuItemService = require('../services/fixedMenuItemService');
const cloudinary = require('cloudinary').v2;

const createFixedMenuItem = async (req, res, next) => {
    try {
        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }
        console.log(req.user)
        const fixedMenuItem = await fixedMenuItemService.createFixedMenuItem({
            ...req.body,
            image_url: imageUrl,
            user_id: req.user.id,
        },req.user.id);
        res.status(201).json({ message: 'Fixed menu item created successfully', data: fixedMenuItem });
    } catch (error) {
        next(error);
    }
};

const getFixedMenuItemById = async (req, res, next) => {
    try {
        const fixedMenuItem = await fixedMenuItemService.getFixedMenuItemById(req.params.id);
        res.status(200).json({ message: 'Fixed menu item retrieved successfully', data: fixedMenuItem });
    } catch (error) {
        next(error);
    }
};

const getAllFixedMenuItems = async (req, res, next) => {
    try {
        const query = {}; // You can add query parameters here if needed
        const fixedMenuItems = await fixedMenuItemService.getAllFixedMenuItems(query);
        res.status(200).json({ message: 'Fixed menu items retrieved successfully', data: fixedMenuItems });
    } catch (error) {
        next(error);
    }
};

const updateFixedMenuItem = async (req, res, next) => {
    try {
        const fixedMenuItem = await fixedMenuItemService.updateFixedMenuItem(req.params.id, req.body);
        res.status(200).json({ message: 'Fixed menu item updated successfully', data: fixedMenuItem });
    } catch (error) {
        next(error);
    }
};

const deleteFixedMenuItem = async (req, res, next) => {
    try {
        await fixedMenuItemService.deleteFixedMenuItem(req.params.id);
        res.status(204).json({ message: 'Fixed menu item deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createFixedMenuItem,
    getFixedMenuItemById,
    getAllFixedMenuItems,
    updateFixedMenuItem,
    deleteFixedMenuItem,
};
