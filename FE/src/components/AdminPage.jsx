import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/courses/all");
        setCourses(response.data.data); // Assuming `data` contains the courses
      } catch (err) {
        setError("Error fetching courses");
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  const handleEdit = (id) => {
    navigate(`/course/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/courses/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCourses((prevCourses) => prevCourses.filter(course => course._id !== id));
    } catch (err) {
      setError('Error deleting course');
      console.error(err);
    }
  };

  const handleAddCourse = () => {
    navigate('/course/add');
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <div className="height-100 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Course List</h2>
            <button onClick={handleAddCourse} className="btn btn-success">
              Add Course
            </button>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Course Description</th>
                  <th>Course Duration</th>
                  <th>Course Fee</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses &&
                  courses.map((course) => (
                    <tr key={course._id}>
                      <td>{course._id}</td>
                      <td>{course.title}</td>
                      <td>{course.description}</td>
                      <td>{course.duration}</td>
                      <td>{course.fee}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(course._id)}
                          className="btn btn-warning btn-sm mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;