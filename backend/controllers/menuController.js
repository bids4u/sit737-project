const menuService = require("../services/menuService");

const getAllMenu = async (req, res, next) => {
  try {
    const menus = await menuService.getAllMenus();
    return res
      .status(200)
      .json({ message: "Menus retrieved successfully", data: menus });
  } catch (error) {
    next(error);
  }
};

const getMenuItemsByCategory = async (req, res, next) => {
  try {
    const menus = await menuService.getMenuItemsByCategory(req.params.id);
    return res
      .status(200)
      .json({ message: "Menus Items retrieved successfully", data: menus });
  } catch (error) {
    next(error);
  }
};

const getCustomizedMenuItemsByCustomizedMenu = async (req, res, next) => {
  try {
    const menus = await menuService.getCustomizedMenuItemsByCustomizedMenu(req.params.id);
    return res
      .status(200)
      .json({ message: "Menus Items retrieved successfully", data: menus });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMenu,
  getMenuItemsByCategory,
  getCustomizedMenuItemsByCustomizedMenu
};
