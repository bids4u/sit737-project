const FixedMenuItem = require('../models/FixedMenuItem');
const { cloudinary } = require('../config/cloudinary');

const createFixedMenuItem = async (data, userId) => {
    try {
        let imageUrl = data.image_url;

        if (data.image_file) {
            const result = await cloudinary.uploader.upload(data.image_file, {
                folder: 'fixed_menu_items'
            });
            imageUrl = result.secure_url;
        }

        const fixedMenuItem = new FixedMenuItem({
            ...data,
            image_url: imageUrl,
            user_id: userId
        });

        return await fixedMenuItem.save();
    } catch (error) {
        throw new Error('Error creating fixed menu item: ' + error.message);
    }
};

const getFixedMenuItemById = async (id) => {
    try {
        const fixedMenuItem = await FixedMenuItem.findById(id).populate('menu_category_id').populate('user_id');
        if (!fixedMenuItem) {
            throw new Error('Fixed menu item not found');
        }
        return fixedMenuItem;
    } catch (error) {
        throw new Error('Error fetching fixed menu item: ' + error.message);
    }
};

const getAllFixedMenuItems = async (query = {}) => {
    try {
        // Query the FixedMenuItem collection with optional filters
        const fixedMenuItems = await FixedMenuItem.find(query)
            .populate('menu_category_id')
            .populate('user_id');
        return fixedMenuItems;
    } catch (error) {
        throw new Error('Error fetching fixed menu items: ' + error.message);
    }
};

const updateFixedMenuItem = async (id, data) => {
    try {
        let imageUrl = data.image_url;

        if (data.image_file) {
            const result = await cloudinary.uploader.upload(data.image_file, {
                folder: 'fixed_menu_items'
            });
            imageUrl = result.secure_url;
        }

        const fixedMenuItem = await FixedMenuItem.findByIdAndUpdate(
            id,
            {
                ...data,
                ...(imageUrl && { image_url: imageUrl })
            },
            { new: true }
        );

        if (!fixedMenuItem) {
            throw new Error('Fixed menu item not found');
        }

        return fixedMenuItem;
    } catch (error) {
        throw new Error('Error updating fixed menu item: ' + error.message);
    }
};

const deleteFixedMenuItem = async (id) => {
    try {
        const fixedMenuItem = await FixedMenuItem.findByIdAndDelete(id);
        if (!fixedMenuItem) {
            throw new Error('Fixed menu item not found');
        }
        return fixedMenuItem;
    } catch (error) {
        throw new Error('Error deleting fixed menu item: ' + error.message);
    }
};

module.exports = {
    createFixedMenuItem,
    getFixedMenuItemById,
    getAllFixedMenuItems,
    updateFixedMenuItem,
    deleteFixedMenuItem,
};
