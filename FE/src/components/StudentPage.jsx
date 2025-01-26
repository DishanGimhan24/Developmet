import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const StudentPage = ({ userId }) => {
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState("");
    const { id } = useParams();

    // Fetch all courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin/courses/all");
                setCourses(response.data.data); // Assuming `data` contains the courses
            } catch (err) {
                console.error("Error fetching courses:", err);
            }
        };

        fetchCourses();
    }, []);

    // Handle course enrollment
    const handleEnroll = async (courseId) => {
        try {
            const response = await axios.post("http://localhost:5000/api/admin/enrollments/add", {
                userId: id,
                courseId: courseId,
               
            });
console.log(response);

            setMessage(`Successfully enrolled in course: ${response.data.course.title}`);
        } catch (err) {
            console.error("Error enrolling in course:", err);
            setMessage("Failed to enroll in the course.");
        }
    };
    return (
        <div>
            <h2>Available Courses</h2>
            {message && <p>{message}</p>}
            <table border="1">
                <thead>
                    <tr>
                        <th>Course Title</th>
                        <th>Description</th>
                        <th>Duration (Months)</th>
                        <th>Fee</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course._id}>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td>{course.duration}</td>
                            <td>{course.fee}</td>
                            <td>
                                <button onClick={() => handleEnroll(course._id)}>Enroll</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentPage;
