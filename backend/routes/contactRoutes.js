// routes/contactRoutes.js
const express = require("express");
const contactController = require("../controllers/contactController");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const router = express.Router();

// POST /api/contact
router.post("/contact", contactController.createContact);

// GET /api/contacts
router.get(
  "/contacts",
  authenticateToken,
  authorizeAdmin,
  contactController.getAllContacts
);

// GET /api/contact/:id
router.get(
  "/contact/:id",
  authenticateToken,
  authorizeAdmin,
  contactController.getContactById
);

// PUT /api/contact/:id
router.put(
  "/contact/:id",
  authenticateToken,
  authorizeAdmin,
  contactController.updateContact
);

// DELETE /api/contact/:id
router.delete(
  "/contact/:id",
  authenticateToken,
  authorizeAdmin,
  contactController.deleteContact
);

module.exports = router;
