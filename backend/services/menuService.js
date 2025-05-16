const CustomizableMenu = require("../models/CustomizableMenu");
const MenuCategory = require("../models/MenuCategory");
const FixedMenuItem = require("../models/FixedMenuItem");
const CustomizedItem = require("../models/CustomizableItem");

const getAllMenus = async () => {
  try {
    // Fetch all menu categories and customizable menus concurrently
    const [menuCategories, customizableMenus] = await Promise.all([
      MenuCategory.find().lean(),
      CustomizableMenu.find().lean()
    ]);

    // Map menu categories and customizable menus to a unified format
    const formattedMenuCategories = menuCategories.map(category => ({
      name: category.name,
      id: category._id,
      type: "fixed"
    }));

    const formattedCustomizableMenus = customizableMenus.map(menu => ({
      name: menu.name,
      id: menu._id,
      type: "customized"
    }));

    // Combine both arrays
    return [...formattedMenuCategories, ...formattedCustomizableMenus];
  } catch (error) {
    throw new Error("Error fetching menus: " + error.message);
  }
};

const getMenuItemsByCategory = async (menuCategoryId) => {
  try {
    // Validate the menu category ID
    const menuCategory = await MenuCategory.findById(menuCategoryId);
    if (!menuCategory) {
      throw new Error('Menu category not found');
    }

    // Find all fixed menu items belonging to the specified category
    const menuItems = await FixedMenuItem.find({ menu_category_id: menuCategoryId }).populate('menu_category_id');

    return menuItems;
  } catch (error) {
    throw new Error('Error fetching menu items: ' + error.message);
  }
};

const getCustomizedMenuItemsByCustomizedMenu = async (customizedMenuId) => {
  try {
    // Validate the menu category ID
    const customizedMenu = await CustomizableMenu.findById(customizedMenuId);
    if (!customizedMenu) {
      throw new Error('Customized Menu not found');
    }

    // Find all fixed menu items belonging to the specified category
    const customizedMenuItems = await CustomizedItem.find({ customizable_menu_id: customizedMenuId }).populate('customizable_menu_id');

    return customizedMenuItems;
  } catch (error) {
    throw new Error('Error fetching menu items: ' + error.message);
  }
};
module.exports = {
  getAllMenus,
  getMenuItemsByCategory,
  getCustomizedMenuItemsByCustomizedMenu
};
