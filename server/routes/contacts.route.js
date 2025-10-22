import express from 'express'
import contactsController from '../controllers/contacts.controller.js'

const ContactsRouter = express.Router();

// REST API
ContactsRouter.post('/api/contacts', contactsController.createContact);
ContactsRouter.get('/api/contacts', contactsController.getAllContacts);
ContactsRouter.get('/api/contacts/:id', contactsController.getContactById);
ContactsRouter.put('/api/contacts/:id', contactsController.updateContactById);
ContactsRouter.delete('/api/contacts', contactsController.deleteAllContacts);
ContactsRouter.delete('/api/contacts/:id', contactsController.deleteContactById);

export default ContactsRouter;
