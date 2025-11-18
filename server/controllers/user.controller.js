import generateToken from "../utils/jwt.js";
import userModel from "../models/user.model.js";

// CREATE NEW USER
export const createUser = async (req, res) => {
  try {
    console.log("Creating user with data:", {
      ...req.body,
      password: "[REDACTED]",
    });

    // Ensure role is included
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || "user", // Default to "user" if not provided
    };

    const user = new userModel(userData);
    await user.save();

    const token = generateToken(user);

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Create user error:", err);

    // Handle duplicate key error
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const message =
        field === "email"
          ? "Email already exists. Please use a different email."
          : "User already exists. Please use a different username.";

      return res.status(400).json({
        error: message,
      });
    }

    return res.status(500).json({
      error: err.message || "Could not create user",
    });
  }
};

//READ ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-hashed_password -salt");
    res.status(200).json(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ message: error.message });
  }
};

// READ USER BY ID
export const getUserById = async (req, res) => {
  try {
    console.log("Getting user by ID:", req.params.id);

    if (!req.params.id || req.params.id === "undefined") {
      return res.status(400).json({ message: "Valid User ID is required" });
    }

    const user = await userModel
      .findById(req.params.id)
      .select("-hashed_password -salt");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE USER BY ID
export const updateUserById = async (req, res) => {
  try {
    console.log("Update request - ID:", req.params.id);
    console.log("Update request - Body:", {
      ...req.body,
      password: req.body.password ? "[REDACTED]" : undefined,
    });

    if (!req.params.id || req.params.id === "undefined") {
      return res.status(400).json({ message: "Valid User ID is required" });
    }

    // Prepare update data
    const updateData = {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      updated: Date.now(),
    };

    // Only update password if provided
    if (req.body.password && req.body.password.trim() !== "") {
      updateData.password = req.body.password;
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      })
      .select("-hashed_password -salt");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User updated successfully:", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE ALL USERS
export const deleteAllUsers = async (req, res) => {
  try {
    const users = await userModel.deleteMany({});
    console.log("Deleted all users:", users.deletedCount);
    res
      .status(200)
      .json({ message: `${users.deletedCount} users deleted successfully` });
  } catch (error) {
    console.error("Delete all users error:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE USER BY ID
export const deleteUserById = async (req, res) => {
  try {
    console.log("Delete request - ID:", req.params.id);

    if (!req.params.id || req.params.id === "undefined") {
      return res.status(400).json({ message: "Valid User ID is required" });
    }

    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User deleted successfully:", deletedUser._id);
    res
      .status(200)
      .json({ message: "User deleted successfully", userId: deletedUser._id });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteAllUsers,
  deleteUserById,
};
