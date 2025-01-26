import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Css/StudentPage.css"

const StudentPage = ({ userId }) => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams();

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/courses/all"
        );
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
      const response = await axios.post(
        "http://localhost:5000/api/admin/enrollments/add",
        {
          userId: id,
          courseId: courseId,
        }
      );
      setMessage(`Successfully enrolled in course`);
    } catch (err) {
      console.error("Error enrolling in course:", err);
      setMessage(`You are already enrolled in this course`);
    }
  };

  return (

      <div className="row-cols-auto">
        <div className="col">
          <div className="card-group">
            <div className="card-body text-center">
              <h5 className="card-title m-b-0">Available Courses</h5>
            </div>
            <div className="table-responsive">
              {message && (
                <div className={`alert ${message.includes('Successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
                  {message}
                </div>
              )}
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Course Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Duration (Months)</th>
                    <th scope="col">Fee</th>
                    <th scope="col">Action</th>
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
                        <button
                          onClick={() => handleEnroll(course._id)}
                          className="btn btn-primary"
                        >
                          Enroll
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
};

export default StudentPage;