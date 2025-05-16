const specialOfferService = require('../services/specialOfferService');

// Create a new special offer
const createSpecialOffer = async (req, res, next) => {
    try {
        const newOffer = await specialOfferService.createSpecialOffer(req.body);
        res.status(201).json(newOffer);
    } catch (error) {
        next(error);
    }
};

// Get all special offers
const getAllSpecialOffers = async (req, res, next) => {
    try {
        const offers = await specialOfferService.getAllSpecialOffers();
        res.status(200).json(offers);
    } catch (error) {
        next(error);
    }
};

// Get a special offer by ID
const getSpecialOfferById = async (req, res, next) => {
    try {
        const offer = await specialOfferService.getSpecialOfferById(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Special offer not found' });
        }
        res.status(200).json(offer);
    } catch (error) {
        next(error);
    }
};

// Update a special offer by ID
const updateSpecialOfferById = async (req, res, next) => {
    try {
        const updatedOffer = await specialOfferService.updateSpecialOfferById(req.params.id, req.body);
        if (!updatedOffer) {
            return res.status(404).json({ message: 'Special offer not found' });
        }
        res.status(200).json(updatedOffer);
    } catch (error) {
        next(error);
    }
};

// Delete a special offer by ID
const deleteSpecialOfferById = async (req, res, next) => {
    try {
        const deletedOffer = await specialOfferService.deleteSpecialOfferById(req.params.id);
        if (!deletedOffer) {
            return res.status(404).json({ message: 'Special offer not found' });
        }
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};

// Get all active special offers until today
const getAllActiveOffersTillToday = async (req, res, next) => {
    try {
        const offers = await specialOfferService.getAllActiveOffersTillToday();
        res.status(200).json(offers);
    } catch (error) {
        console.log('errorloggin >>>>>>',error)

        next(error);
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
