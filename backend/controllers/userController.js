const userService = require('../services/userService');

const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ message: 'User created successfully', data: user });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json({ message: 'User retrieved successfully', data: user });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json({ message: 'User updated successfully', data: user });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const authenticateUser = async (req, res, next) => {
    try {
        const { identifier, password } = req.body; // updated to 'identifier'
        const { user, token } = await userService.authenticateUser(identifier, password);
        res.status(200).json({ message: 'Authentication successful', data: { user, token } });
    } catch (error) {
        next(error); // Forward the error to the error-handling middleware
    }
};

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    authenticateUser
};
