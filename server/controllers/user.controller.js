import generateToken from "../utils/jwt.js";
import userModel from "../models/user.model.js"

// CREATE NEW USER
export const createUser = async (req, res) => {
    try {
        const newUser = new userModel(req.body);
        const savedUser = await newUser.save();
        const token = generateToken(savedUser._id);
        res.status(201).json({message: 'User created successfully', user: savedUser.username, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//READ ALL USERS
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users.map(user => ({ username: user.username, email: user.email })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
}

// READ USER BY ID
export const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json( {message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// UPDATE USER BY ID
export const updateUserById = async (req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedUser) {
            return res.status(404).json( {message: 'User not found'});
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE ALL USERS
export const deleteAllUsers = async (req, res) => {
    try {
        const users = await userModel.deleteMany({});
        console.log(users);
        res.status(200).json({ message: `${users.deletedCount} users deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// DELETE USER BY ID
export const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default { createUser, getAllUsers, getUserById, updateUserById, deleteAllUsers, deleteUserById };