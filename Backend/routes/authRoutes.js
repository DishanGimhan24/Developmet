import express from "express";
import { register, login, getProtectedData } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { getUserById } from "../controllers/UserController.js";
const router = express.Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Routes
router.get("/protected", authMiddleware, getProtectedData);

router.get("/student", authMiddleware, roleMiddleware("student"), (req, res) => {
  res.json({ message: "Welcome Student!" });
});

router.get('/student/:id', authMiddleware,getUserById);

router.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});




























router.get("/admin/student", authMiddleware, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Here is the list of all users" });
});

router.post("/admin/system", authMiddleware, roleMiddleware("admin"), (req, res) => {
 
  res.json({ message: "New user created" });
});


router.delete("/admin/user/:id", authMiddleware, roleMiddleware("admin"), (req, res) => {

  res.json({ message: `User with ID ${req.params.id} deleted` });
});





/* {
  "email": "john@student.com",
  "password": "123456"
}
 */

/* {
   "name": "DishanGim",
  "email": "kdgimhan0@gmail.com",
  "password":"password123@",
  "role":"admin"

} */


export default router;
