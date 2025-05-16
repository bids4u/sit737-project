const CustomizableItem = require('../models/CustomizableItem');

const createCustomizableItem = async (data) => {
    const customizableItem = new CustomizableItem(data);
    return await customizableItem.save();
};

const getAllCustomizableItems = async () => {
    return await CustomizableItem.find().populate('customizable_menu_id').populate('user_id'); // Retrieves all customizable menus
};

const getCustomizableItemById = async (id) => {
    return await CustomizableItem.findById(id).populate('customizable_menu_id').populate('user_id');
};

const updateCustomizableItem = async (id, data) => {
    return await CustomizableItem.findByIdAndUpdate(id, data, { new: true }).populate('customizable_menu_id').populate('user_id');
};

const deleteCustomizableItem = async (id) => {
    return await CustomizableItem.findByIdAndDelete(id);
};

module.exports = {
    createCustomizableItem,
    getAllCustomizableItems,
    getCustomizableItemById,
    updateCustomizableItem,
    deleteCustomizableItem,
};
