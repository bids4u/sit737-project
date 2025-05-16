const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/jwt');

const createUser = async (userData) => {
    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
    }
};

const updateUser = async (userId, updateData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

const deleteUser = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

const authenticateUser = async (identifier, password) => {
    try {
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = generateToken(user);
        return { user, token };
    } catch (error) {
        throw new Error('Error authenticating user: ' + error.message);
    }
};

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    authenticateUser
};
