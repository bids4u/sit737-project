const SpecialOffer = require('../models/SpecialOffer');

// Create a new special offer
const createSpecialOffer = async (offerData) => {
    try {
        const newOffer = new SpecialOffer(offerData);
        return await newOffer.save();
    } catch (error) {
        throw new Error('Error creating special offer');
    }
};

// Get all special offers
const getAllSpecialOffers = async () => {
    try {
        return await SpecialOffer.find();
    } catch (error) {
        throw new Error('Error fetching special offers');
    }
};

// Get a special offer by ID
const getSpecialOfferById = async (id) => {
    try {
        return await SpecialOffer.findById(id);
    } catch (error) {
        throw new Error('Error fetching special offer by ID');
    }
};

// Update a special offer by ID
const updateSpecialOfferById = async (id, offerData) => {
    try {
        return await SpecialOffer.findByIdAndUpdate(id, offerData, { new: true });
    } catch (error) {
        throw new Error('Error updating special offer');
    }
};

// Delete a special offer by ID
const deleteSpecialOfferById = async (id) => {
    try {
        return await SpecialOffer.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error deleting special offer');
    }
};

// Get all active special offers until today
const getAllActiveOffersTillToday = async () => {
    try {
        const today = new Date();
        return await SpecialOffer.find({
            endDate: { $gte: today },
            startDate: { $lte: today }
        });
    } catch (error) {
        throw new Error('Error fetching active special offers');
    }
};

module.exports = {
    createSpecialOffer,
    getAllSpecialOffers,
    getSpecialOfferById,
    updateSpecialOfferById,
    deleteSpecialOfferById,
    getAllActiveOffersTillToday
};
