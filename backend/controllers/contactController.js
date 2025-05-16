// controllers/contactController.js
const contactService = require('../services/contactService');

const createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const contactData = { name, email, subject, message };
    const contact = await contactService.createContact(contactData);
    res.status(201).json({ message: 'Contact message received successfully.', contact });
  } catch (error) {
    next(error);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactService.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await contactService.getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contact = await contactService.updateContact(req.params.id, req.body);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json({ message: 'Contact updated successfully.', contact });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contact = await contactService.deleteContact(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
