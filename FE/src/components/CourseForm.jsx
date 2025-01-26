import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Css/CourseForm.css'
import { useParams,useNavigate } from "react-router-dom";


const CourseForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    duration:'' ,
    fee: ''
  });

  const [message, setMessage] = useState('');
  const { id } = useParams();
    const Navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const response = id ?
      await axios.put(`http://localhost:5000/api/admin/courses/update/${id}`, form, {
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }) :
        await axios.post(`http://localhost:5000/api/admin/courses/addCourse`, form, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
     Navigate('/admin');
    setMessage(response.data.message);
    } catch (error) {
      setMessage('Submission failed.');
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/admin/courses/edit/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setForm({
            title: response.data.data.title,
            description: response.data.data.description,
            duration: response.data.data.duration,
            fee: response.data.data.fee,
          });
          console.log(response.data.data);
        } catch (error) {
          setMessage('Error fetching course data.');
        }
      }
    };

    fetchCourse();
  }, [id]);




  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
       
          <h3>Hello there !!!</h3>
          <p className="blue-text">Fill the all details<br /> </p>
          <div className="card">
            <h5 className="text-center mb-4">{id ? 'Update Course' : 'Add New Course'}</h5>
            <form className="form-card" onSubmit={handleSubmit}>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">Course Name<span className="text-danger"> *</span></label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter course title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">Description<span className="text-danger"> *</span></label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter course description"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row justify-content-between text-left">
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">Duration(Number)<span className="text-danger"> *</span></label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    placeholder="Enter course duration in months"
                    value={form.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group col-sm-6 flex-column d-flex">
                  <label className="form-control-label px-3">Cousrse fee(Number)<span className="text-danger"> *</span></label>
                  <input
                    type="text"
                    id="fee"
                    name="fee"
                    placeholder="Enter course fee"
                    value={form.fee}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row justify-content-end">
                <div className="form-group col-sm-6">
                  <button type="submit" className="btn-block btn-primary">{id ? 'Update Course' : 'Add Course'}</button>
                </div>
              </div>
              {message && (
                <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                  {message}
                </div>
              )}
            </form>
          </div>
      
      </div>
    </div>
  );
};

export default CourseForm;