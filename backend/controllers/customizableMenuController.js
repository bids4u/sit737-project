const customizableMenuService = require('../services/customizableMenuService');
const cloudinary = require('cloudinary').v2;

const createCustomizableMenu = async (req, res, next) => {
    try {
        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const customizableMenu = await customizableMenuService.createCustomizableMenu({
            ...req.body,
            image_url: imageUrl,
            user_id: req.user.id,
        });
        res.status(201).json({ message: 'Customizable menu created successfully', data: customizableMenu });
    } catch (error) {
        next(error);
    }
};

const getAllCustomizableMenus = async (req, res, next) => {
    try {
        const customizableMenus = await customizableMenuService.getAllCustomizableMenus();
        res.status(200).json({ message: 'Customizable menus retrieved successfully', data: customizableMenus });
    } catch (error) {
        next(error);
    }
};

const getCustomizableMenuById = async (req, res, next) => {
    try {
        const customizableMenu = await customizableMenuService.getCustomizableMenuById(req.params.id);
        res.status(200).json({ message: 'Customizable menu retrieved successfully', data: customizableMenu });
    } catch (error) {
        next(error);
    }
};

const updateCustomizableMenu = async (req, res, next) => {
    try {
        const customizableMenu = await customizableMenuService.updateCustomizableMenu(req.params.id, req.body);
        res.status(200).json({ message: 'Customizable menu updated successfully', data: customizableMenu });
    } catch (error) {
        next(error);
    }
};

const deleteCustomizableMenu = async (req, res, next) => {
    try {
        await customizableMenuService.deleteCustomizableMenu(req.params.id);
        res.status(204).json({ message: 'Customizable menu deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCustomizableMenu,
    getAllCustomizableMenus,  // Export the new function
    getCustomizableMenuById,
    updateCustomizableMenu,
    deleteCustomizableMenu,
};
