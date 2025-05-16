const express = require("express");
const menuController = require("../controllers/menuController");
const router = express.Router();

router.get("/", menuController.getAllMenu);
router.get("/fixed-menu/:id", menuController.getMenuItemsByCategory);
router.get("/customized-menu/:id", menuController.getCustomizedMenuItemsByCustomizedMenu);


module.exports = router;
