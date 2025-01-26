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
      data: {
        enrollmentId: enrollment._id,
        userId: enrollment.user,
        courseId: enrollment.course,
      },
    });
  } catch (err) {
    console.error("Error enrolling in course:", err.stack);
    res.status(500).json({
      success: false,
      message: `Internal server error: ${err.message}`,
    });
  }
};
