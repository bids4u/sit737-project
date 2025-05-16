const express = require("express");
const router = express.Router();
const specialOfferController = require("../controllers/specialOfferController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
// CRUD routes
router.post(
  "/",
  authMiddleware,
  authorizeAdmin,
  specialOfferController.createSpecialOffer
); // Create
router.get(
  "/",
  specialOfferController.getAllSpecialOffers
); // Get all
router.get("/:id", specialOfferController.getSpecialOfferById); // Get by ID
router.put(
  "/:id",
  authMiddleware,
  authorizeAdmin,
  specialOfferController.updateSpecialOfferById
); // Update by ID
router.delete(
  "/:id",
  authMiddleware,
  authorizeAdmin,
  specialOfferController.deleteSpecialOfferById
); // Delete by ID

// Get all active offers until today
router.get(
  "/active-till-today",
  specialOfferController.getAllActiveOffersTillToday
);

module.exports = router;
