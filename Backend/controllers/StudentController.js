import Student from "../models/Student.js";
import express from "express";
const router = express.Router();



// Add a new Student
export const addStudent = async (req, res) => {
  const student = new Student(req.body);
  try {
    if (student) {
      await student.save();
      return res.status(200).json({
        success: true,
        message: "Student added successfully",
        data: student,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to add Student",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error saving Student: ${err.message}`,
    });
  }
};

// Get all Students
export const getAllStudent = async (req, res) => {
  try {
    const student = await Student.find();
    return res.status(200).json({
      success: true,
      message: "All Students fetched successfully",
      data: student,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error fetching Students: ${err.message}`,
    });
  }
};

//delete Student by id
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(200).json({
        success: false,
        message: "Student not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: student,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error deleting Student: ${err.message}`,
    });
  }
};

//edit Student by id
export const editStudent = async (req, res) => {
  try {
    // Update the Student using the provided ID and new data
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }); // { new: true } returns the updated document
    if (!student) {
      return res.status(200).json({
        success: false,
        message: "Student not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student, // Send back the updated Student
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error updating Student: ${err.message}`,
    });
  }
};

//get Student by id
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(200).json({
        success: false,
        message: "Student not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error fetching Student: ${err.message}`,
    });
  }
};




