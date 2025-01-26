import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar';


const StudentForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "Male",
    course: "",
  });
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/addstudent", form);
      console.log("Student created:", response.data);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        gender: "Male",
        course: "",
      });
      setError("");
      onSuccess(); // Callback to refresh the list
      fetchStudents(); // Refresh the student list after adding a new student
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/students/all");
      console.log("Students fetched:", response.data);
      setStudents(response.data.data); // Assuming `data` contains the students
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container">
       <Sidebar/>
      {/* Add the Sidebar component */}
      <div className="main-content">
        <div className="height-100 bg-light">
          {/* <form onSubmit={handleSubmit}>
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label>Course</label>
              <input
                type="text"
                name="course"
                value={form.course}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Add Student</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form> */}
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td>{student.dateOfBirth}</td>
                    <td>{student.gender}</td>
                    <td>{student.course}</td>
                    <td>
                      {/* Add any actions here */}
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

export default StudentForm;