import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

export const EnrollStudent = async (req, res) => {
  const { userId, courseId } = req.body;

  // Validate input data
  if (!userId || !courseId) {
    return res.status(400).json({
      success: false,
      message: "User ID and Course ID are required",
    });
  }

  try {
    // Check if user and course exist
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      console.log("User or Course not found");
      return res.status(404).json({
        success: false,
        message: "User or Course not found",
      });
    }

    // Check if the user is already enrolled
    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (existingEnrollment) {
      console.log("User is already enrolled in this course");
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    // Create new enrollment
    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
    });

    return res.status(201).json({
      success: true,
      message: "Enrolled successfully",
      data: enrollment,
    });
  } catch (err) {
    console.error("Error enrolling in course:", err.stack);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`,
    });
  }
};

// View all enrollments
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('user').populate('course');
    return res.status(200).json({
      success: true,
      data: enrollments,
    });
  } catch (err) {
    console.error("Error fetching enrollments:", err.stack);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`,
    });
  }
};

// Update an enrollment
export const updateEnrollment = async (req, res) => {
  const { userId, courseId } = req.body;

  // Validate input data
  if (!userId || !courseId) {
    return res.status(400).json({
      success: false,
      message: "User ID and Course ID are required",
    });
  }

  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { user: userId, course: courseId },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enrollment updated successfully",
      data: enrollment,
    });
  } catch (err) {
    console.error("Error updating enrollment:", err.stack);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`,
    });
  }
};

// Delete an enrollment
export const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enrollment deleted successfully",
      data: enrollment,
    });
  } catch (err) {
    console.error("Error deleting enrollment:", err.stack);
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`,
    });
  }
};
