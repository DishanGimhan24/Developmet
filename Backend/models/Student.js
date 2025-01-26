import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: (email) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), // Email validation
            message: "Please provide a valid email address",
        },
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of Birth is required"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"], // Dropdown values
        required: [true, "Gender is required"],
    },
    course: {
        type: String,
        required: [true, "Course is required"],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Student", StudentSchema);
