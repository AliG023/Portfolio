import contactsModel from "../models/contacts.model.js"

// CREATE NEW CONTACT
export const createContact = async (req, res) =>{
    try {
        const newContact = new contactsModel(req.body);
        const savedContact = await newContact.save();
        res.status(200).json(savedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ ALL CONTACTS
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await contactsModel.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// READ CONTACT BY ID
export const getContactById = async (req, res) => {
    try {
        const contact = await contactsModel.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// UPDATE CONTACT BY ID
export const updateContactById = async (req, res) => {
    try {
        const updatedContact = await contactsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE ALL CONTACTS
export const deleteAllContacts = async (req, res) => {
    try {
        const contacts = await contactsModel.deleteMany({});
        res.status(200).json({ message: `${contacts.deletedCount} contacts deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE CONTACT BY ID
export const deleteContactById = async (req, res) => {
    try {
        const deletedContact = await contactsModel.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}