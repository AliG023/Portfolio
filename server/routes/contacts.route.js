import express from "express";
import contactsController from "../controllers/contacts.controller.js";
import authController from "../controllers/auth.controller.js";

const ContactsRouter = express.Router();

// REST API
ContactsRouter.post(
  "/api/contacts",
  authController.requireSignin,
  contactsController.createContact
);
ContactsRouter.get(
  "/api/contacts",
  authController.requireSignin,
  contactsController.getAllContacts
);
ContactsRouter.get(
  "/api/contacts/:id",
  authController.requireSignin,
  contactsController.getContactById
);
ContactsRouter.put(
  "/api/contacts/:id",
  authController.requireSignin,
  authController.requiresAdmin,
  contactsController.updateContactById
);
ContactsRouter.delete(
  "/api/contacts",
  authController.requireSignin,
  authController.requiresAdmin,
  contactsController.deleteAllContacts
);
ContactsRouter.delete(
  "/api/contacts/:id",
  authController.requireSignin,
  authController.requiresAdmin,
  contactsController.deleteContactById
);
export default ContactsRouter;
