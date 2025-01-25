import User from "../models/User.js";
import express from "express";
const router = express.Router();



// Add a new User
export const addUser = async (req, res) => {
  const User = new User(req.body);
  try {
    if (User) {
      await User.save();
      return res.status(200).json({
        success: true,
        message: "User added successfully",
        data: User,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to add User",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error saving User: ${err.message}`,
    });
  }
};

// Get all Users
export const getAllUser = async (req, res) => {
  try {
    const Users = await User.find();
    return res.status(200).json({
      success: true,
      message: "All Users fetched successfully",
      data: Users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error fetching Users: ${err.message}`,
    });
  }
};

//delete User by id
export const deleteUser = async (req, res) => {
  try {
    const User = await User.findByIdAndDelete(req.params.id);
    if (!User) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: User,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error deleting User: ${err.message}`,
    });
  }
};

//edit User by id
export const editUser = async (req, res) => {
  try {
    // Update the User using the provided ID and new data
    const User = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // { new: true } returns the updated document
    if (!User) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: User, // Send back the updated User
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error updating User: ${err.message}`,
    });
  }
};

//get User by id
export const getUserById = async (req, res) => {
  try {
    const User = await User.findById(req.params.id);
    if (!User) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: User,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error fetching User: ${err.message}`,
    });
  }
};




