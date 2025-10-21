import express from 'express'
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
} from '../controllers/user.controller.js'

const UserRouter = express.Router();

// REST API
UserRouter.post('/', createUser);
UserRouter.get('/', getAllUsers);
UserRouter.get('/:id', getUserById);
UserRouter.put('/:id', updateUserById);
UserRouter.delete('/:id', deleteUserById);

export default UserRouter;