import express from 'express'
import {
    createContact,
    getAllContacts,
    getContactById,
    updateContactById,
    deleteContactById
} from '../controllers/contacts.controller.js'

const ContactsRouter = express.Router();

// REST API
ContactsRouter.post('/', createContact);
ContactsRouter.get('/', getAllContacts);
ContactsRouter.get('/:id', getContactById);
ContactsRouter.put('/:id', updateContactById);
ContactsRouter.delete('/:id', deleteContactById);

export default ContactsRouter;
