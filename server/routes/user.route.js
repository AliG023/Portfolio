import express from 'express'
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteAllUsers,
    deleteUserById
} from '../controllers/user.controller.js'

const UserRouter = express.Router();

// REST API
UserRouter.post('api/users', createUser);
UserRouter.get('api/users', getAllUsers);
UserRouter.get('api/users/:id', getUserById);
UserRouter.put('api/users/:id', updateUserById);
UserRouter.delete('api/users', deleteAllUsers);
UserRouter.delete('api/users/:id', deleteUserById);

export default UserRouter;