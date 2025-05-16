const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeAdmin = require('../middlewares/authorizeAdmin');
const router = express.Router();

router.post('/', authenticateToken, authorizeAdmin, userController.createUser);
router.post('/login', userController.authenticateUser); 
router.get('/:id',authenticateToken, userController.getUserById);
router.put('/:id',authenticateToken, authorizeAdmin, userController.updateUser);
router.delete('/:id',authenticateToken, authorizeAdmin, userController.deleteUser);

module.exports = router;
