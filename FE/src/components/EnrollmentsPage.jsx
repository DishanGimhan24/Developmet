import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const EnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentEnrollment, setCurrentEnrollment] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [response1, setresponse1] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollmentsResponse, studentsResponse, coursesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/enrollments/all'),
          axios.get('http://localhost:5000/api/user/all'),
          axios.get('http://localhost:5000/api/admin/courses/all')
        ]);
        setEnrollments(enrollmentsResponse.data.data);
        setStudents(studentsResponse.data.data);
        setCourses(coursesResponse.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (enrollment) => {
    setCurrentEnrollment(enrollment);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentEnrollment(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEnrollment = {
        userId: currentEnrollment.user._id,
        courseId: currentEnrollment.course._id,
      };
      const response1 =await axios.put(`http://localhost:5000/api/admin/enrollments/edit/${currentEnrollment._id}`, updatedEnrollment, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setShowModal(false);
      setCurrentEnrollment(null);
      setSuccessMessage(`${response1.data.message}`);
      const response = await axios.get('http://localhost:5000/api/admin/enrollments/all');
      setEnrollments(response.data.data);
    
      setTimeout(() => setSuccessMessage(''),5000);
    } catch (err) {
      setError('Error updating enrollment');
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEnrollment((prevEnrollment) => ({
      ...prevEnrollment,
      [name]: { _id: value },
    }));
  };

  const handleDelete = async (enrollmentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/enrollments/delete/${enrollmentId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Refresh enrollments
      const response = await axios.get('http://localhost:5000/api/admin/enrollments/all');
      setEnrollments(response.data.data);
      setSuccessMessage('Enrollment deleted successfully.');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      setError('Error deleting enrollment');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <div className="height-100 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Student Enrollments</h2>
          </div>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>Student Name</th>
                  <th>Enrolled Course</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enrollment) => (
                  <tr key={enrollment._id}>
                    <td>{enrollment.user.name}</td>
                    <td>{enrollment.course ? enrollment.course.title : 'N/A'}</td>
                    <td>
                      <button
                        onClick={() => handleEditClick(enrollment)}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(enrollment._id)}
                        className="btn btn-danger btn-sm ml-2"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Modal show={showModal} onHide={handleModalClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Enrollment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formStudent">
                  <Form.Label>Student</Form.Label>
                  <Form.Control
                    as="select"
                    name="user"
                    value={currentEnrollment?.user._id || ''}
                    onChange={handleInputChange}
                  >
                    {students.map((student) => (
                      <option key={student._id} value={student._id}>
                        {student.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formCourse">
                  <Form.Label>Course</Form.Label>
                  <Form.Control
                    as="select"
                    name="course"
                    value={currentEnrollment?.course?._id || ''}
                    onChange={handleInputChange}
                  >
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentsPage;