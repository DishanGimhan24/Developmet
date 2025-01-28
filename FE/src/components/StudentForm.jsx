import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const StudentForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: 'Male',
    course: '',
  });
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const Navigate = useNavigate();
  



  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/students/all');
      console.log('Students fetched:', response.data);
      setStudents(response.data.data); // Assuming `data` contains the students
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Error fetching students');
    }
  };

  const handleEdit = (id) => {
    Navigate(`/studentinfo/edit/${id}`);

  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/students/delete/${id}`);
      setStudents((prevStudents) => prevStudents.filter(student => student._id !== id));
    } catch (err) {
      console.error('Error deleting student:', err);
      setError('Error deleting student');
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
  
        <h2>Student List</h2>
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
                <tr key={student._id}>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.email}</td>
                  <td>{student.dateOfBirth}</td>
                  <td>{student.gender}</td>
                  <td>{student.course}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(student._id)}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;