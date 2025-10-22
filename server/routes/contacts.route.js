import express from 'express'
import {
    createContact,
    getAllContacts,
    getContactById,
    updateContactById,
    deleteAllContacts,
    deleteContactById
} from '../controllers/contacts.controller.js'

const ContactsRouter = express.Router();

// REST API
ContactsRouter.post('api/contacts', createContact);
ContactsRouter.get('api/contacts', getAllContacts);
ContactsRouter.get('api/contacts/:id', getContactById);
ContactsRouter.put('api/contacts/:id', updateContactById);
ContactsRouter.delete('api/contacts', deleteAllContacts);
ContactsRouter.delete('api/contacts/:id', deleteContactById);

export default ContactsRouter;
