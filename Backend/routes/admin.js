import express from "express";
import courseRoutes from "./Course.js";
import studentRoutes from "./student.js";
import enrollmentRoutes from "./enrollments.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";


const adminRouter = express.Router();



// Apply authentication and admin role middleware to all admin routes
/* adminRouter.use(authMiddleware);
adminRouter.use(roleMiddleware("admin")); */




// Admin-specific routes
adminRouter.use("/courses", courseRoutes);
adminRouter.use("/students", studentRoutes,authMiddleware,roleMiddleware("admin"));
adminRouter.use("/enrollments", enrollmentRoutes);

export default adminRouter;
