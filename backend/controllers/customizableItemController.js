const customizableItemService = require('../services/customizableItemService');

const createCustomizableItem = async (req, res, next) => {
    try {
        const customizableItem = await customizableItemService.createCustomizableItem({
            ...req.body,
            user_id: req.user.id,
        });
        res.status(201).json({ message: 'Customizable item created successfully', data: customizableItem });
    } catch (error) {
        next(error);
    }
};

const getAllCustomizableItems = async (req, res, next) => {
    try {
        const customizableItem = await customizableItemService.getAllCustomizableItems();
        res.status(200).json({ message: 'Customizable item retrieved successfully', data: customizableItem });
    } catch (error) {
        next(error);
    }
};

const getCustomizableItemById = async (req, res, next) => {
    try {
        const customizableItem = await customizableItemService.getCustomizableItemById(req.params.id);
        res.status(200).json({ message: 'Customizable item retrieved successfully', data: customizableItem });
    } catch (error) {
        next(error);
    }
};

const updateCustomizableItem = async (req, res, next) => {
    try {
        const customizableItem = await customizableItemService.updateCustomizableItem(req.params.id, req.body);
        res.status(200).json({ message: 'Customizable item updated successfully', data: customizableItem });
    } catch (error) {
        next(error);
    }
};

const deleteCustomizableItem = async (req, res, next) => {
    try {
        await customizableItemService.deleteCustomizableItem(req.params.id);
        res.status(204).json({ message: 'Customizable item deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCustomizableItem,
    getAllCustomizableItems,
    getCustomizableItemById,
    updateCustomizableItem,
    deleteCustomizableItem,
};
