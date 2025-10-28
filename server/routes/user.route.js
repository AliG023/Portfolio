import express from 'express'
import authController from '../controllers/auth.controller.js';
import userController from '../controllers/user.controller.js'

const UserRouter = express.Router();

// REST API
UserRouter.post('/api/users', userController.createUser);
UserRouter.get('/api/users', authController.requireSignin, userController.getAllUsers);
UserRouter.get('/api/users/:id', authController.requireSignin, userController.getUserById);
UserRouter.put('/api/users/:id', authController.requireSignin, authController.hasAuthorization, userController.updateUserById);
UserRouter.delete('/api/users', authController.requireSignin, userController.deleteAllUsers);
UserRouter.delete('/api/users/:id', authController.requireSignin, authController.hasAuthorization, userController.deleteUserById);

export default UserRouter;