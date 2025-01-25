import Course from "../models/Course.js";


// Add a new Course
export const addCourse = async (req, res) => {
  const course = new Course(req.body);
  try {
    if (course) {
      await course.save();
      return res.status(200).json({
        success: true,
        message: "Course added successfully",
        data: course,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to add Course",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// Get all Courses
export const getAllCourse = async (req, res) => {
  try {
    const Courses = await Course.find();
    return res.status(200).json({
      success: true,
      message: "All Courses fetched successfully",
      data: Courses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error fetching Courses: ${err.message}`,
    });
  }
};

//delete Course by id
export const deleteCourse = async (req, res) => {
  try {
    const Course = await Course.findByIdAndDelete(req.params.id);
    if (!Course) {
      return res.status(200).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: Course,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error deleting Course: ${err.message}`,
    });
  }
};

//edit Course by id
export const editCourse = async (req, res) => {
  try {
    // Update the Course using the provided ID and new data
    const Course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }); // { new: true } returns the updated document
    if (!Course) {
      return res.status(200).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: Course, // Send back the updated Course
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error updating Course: ${err.message}`,
    });
  }
};

//get Course by id
export const getCourseById = async (req, res) => {
  try {
    const Course = await Course.findById(req.params.id);
    if (!Course) {
      return res.status(200).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: Course,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error fetching Course: ${err.message}`,
    });
  }
};


