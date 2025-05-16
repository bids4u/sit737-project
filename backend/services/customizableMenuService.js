const CustomizableMenu = require('../models/CustomizableMenu');

const createCustomizableMenu = async (data) => {
    const customizableMenu = new CustomizableMenu(data);
    return await customizableMenu.save();
};

const getAllCustomizableMenus = async () => {
    return await CustomizableMenu.find(); // Retrieves all customizable menus
};

const getCustomizableMenuById = async (id) => {
    return await CustomizableMenu.findById(id);
};

const updateCustomizableMenu = async (id, data) => {
    return await CustomizableMenu.findByIdAndUpdate(id, data, { new: true });
};

const deleteCustomizableMenu = async (id) => {
    return await CustomizableMenu.findByIdAndDelete(id);
};

module.exports = {
    createCustomizableMenu,
    getAllCustomizableMenus,
    getCustomizableMenuById,
    updateCustomizableMenu,
    deleteCustomizableMenu,
};
