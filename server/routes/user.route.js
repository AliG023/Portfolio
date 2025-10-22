import express from 'express'
import authController from '../controllers/auth.controller.js';
import userController from '../controllers/user.controller.js'

const UserRouter = express.Router();

// PROTECTED ROUTES — use the actual exported handler names
UserRouter.route('/api/users/:id').get(authController.requireSignin, userController.getUserById);
UserRouter.route('/api/users/:id').put(authController.requireSignin, authController.hasAuthorization, userController.updateUserById);
UserRouter.route('/api/users/:id').delete(authController.requireSignin, authController.hasAuthorization, userController.deleteUserById);

// REST API (fixed paths: added leading '/')
UserRouter.post('/api/users', userController.createUser);
UserRouter.get('/api/users', userController.getAllUsers);
UserRouter.get('/api/users/:id', userController.getUserById);
UserRouter.put('/api/users/:id', userController.updateUserById);
UserRouter.delete('/api/users', userController.deleteAllUsers);
UserRouter.delete('/api/users/:id', userController.deleteUserById);

export default UserRouter;