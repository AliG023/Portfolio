import express from 'express'
import authController from '../controllers/auth.controller.js';
import userController from '../controllers/user.controller.js'

const UserRouter = express.Router();

// PROTECTED ROUTES
// UserRouter.route('/api/users').get(authController.requireSignin, userController.getAllUsers);
// UserRouter.route('/api/users/:id').get(authController.requireSignin, userController.getUserById);
// UserRouter.route('/api/users/:id').put(authController.requireSignin, authController.hasAuthorization, userController.updateUserById);
// UserRouter.route('/api/users/:id').delete(authController.requireSignin, authController.hasAuthorization, userController.deleteUserById);



// REST API
// UserRouter.post('/api/users', userController.createUser);
// UserRouter.get('/api/users', userController.getAllUsers);
// UserRouter.get('/api/users/:id', userController.getUserById);
// UserRouter.put('/api/users/:id', userController.updateUserById);
// UserRouter.delete('/api/users', userController.deleteAllUsers);
// UserRouter.delete('/api/users/:id', userController.deleteUserById);

UserRouter.post('/api/users', userController.createUser);
UserRouter.get('/api/users', authController.requireSignin, userController.getAllUsers);
UserRouter.get('/api/users/:id', authController.requireSignin, userController.getUserById);
UserRouter.put('/api/users/:id', authController.requireSignin, authController.hasAuthorization, userController.updateUserById);
UserRouter.delete('/api/users', authController.requireSignin, authController.hasAuthorization, userController.deleteAllUsers);
UserRouter.delete('/api/users/:id', authController.requireSignin, authController.hasAuthorization, userController.deleteUserById);

export default UserRouter;