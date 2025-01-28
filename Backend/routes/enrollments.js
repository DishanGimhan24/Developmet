import express from "express";
import { deleteEnrollment, EnrollStudent, getAllEnrollments, updateEnrollment } from "../controllers/EnrollmentController.js";

const router = express.Router();

// Enroll a student in a course
router.post("/add",EnrollStudent);

// Get all enrollments
router.get("/all",getAllEnrollments);

// Update an enrollment
router.put("/edit/:id",updateEnrollment );

// Delete an enrollment
router.delete("/delete/:id",deleteEnrollment);

export default router;
