// services/contactService.js
const Contact = require('../models/contact');

const createContact = async (contactData) => {
  const contact = new Contact(contactData);
  return await contact.save();
};

const getAllContacts = async () => {
  return await Contact.find();
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const updateContact = async (id, updateData) => {
  return await Contact.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
