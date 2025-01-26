import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
const app = express();

// Importing routes
import CourseRoute from "./routes/Course.js"
import authRoutes from "./routes/authRoutes.js";
import user from "./routes/user.js";
import Student from "./models/Student.js";
import adminRouter from "./routes/admin.js";



dotenv.config();

const PORT = process.env.PORT || 8070;
const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRETserver:', process.env.JWT_SECRET);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const URL = process.env.MONGODB_URL;
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established successfully!"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/user", user);

/* app.use("/api/course", CourseRoute);
app.use("/api/student", Student);
app.use("/api/enrollment",); */

app.use("/api/admin",adminRouter);



// Start server
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});



