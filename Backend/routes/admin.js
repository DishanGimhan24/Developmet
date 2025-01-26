import express from "express";
import courseRoutes from "./Course.js";
import studentRoutes from "./student.js";
import enrollmentRoutes from "./enrollments.js";


const adminRouter = express.Router();

// Apply authentication and admin role middleware to all admin routes


// Admin-specific routes
adminRouter.use("/courses", courseRoutes);
adminRouter.use("/students", studentRoutes);
adminRouter.use("/enrollments", enrollmentRoutes);

export default adminRouter;
