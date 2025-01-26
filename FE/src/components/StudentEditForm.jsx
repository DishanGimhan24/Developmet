import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentEditForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    course: ''
  });
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/admin/students/get/${id}`);
          setFormData({
            firstName: response.data.data.firstName,
            lastName: response.data.data.lastName,
            email: response.data.data.email,
            dateOfBirth: response.data.data.dateOfBirth.split('T')[0],
            
          });
          console.log(response.data);
        } catch (error) {
          setMessage('Error fetching student data.');
        }
      };

      fetchStudent();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/admin/students/edit/${id}`, formData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMessage('Student updated successfully.');
      } else {
        await axios.post('http://localhost:5000/api/admin/students/add', formData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMessage('Student added successfully.');
        ;
      }
      setTimeout(() => {
        navigate('/studentinfo');
    }, 2000);   
  
    } catch (error) {
      setMessage('Error submitting form.');
    }
  };

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <h3>Hello there !!!</h3>
        <p className="blue-text">Fill in all details<br /></p>
        <div className="card">
          <h5 className="text-center mb-4">{id ? 'Update Student' : 'Add New Student'}</h5>
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">First Name<span className="text-danger"> *</span></label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">Last Name<span className="text-danger"> *</span></label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">Email<span className="text-danger"> *</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">Date of Birth<span className="text-danger"> *</span></label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="Enter date of birth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row justify-content-between text-left">
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">Gender<span className="text-danger"> *</span></label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-group col-sm-6 flex-column d-flex">
                <label className="form-control-label px-3">Course<span className="text-danger"> *</span></label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  placeholder="Enter course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row justify-content-end">
              <div className="form-group col-sm-6">
                <button type="submit" className="btn-block btn-primary">{id ? 'Update Student' : 'Add Student'}</button>
              </div>
            </div>
            {message && (
              <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentEditForm;