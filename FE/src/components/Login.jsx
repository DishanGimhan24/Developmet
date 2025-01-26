import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Use the useHistory hook for navigation
import axios from 'axios';
import './Css/Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Initialize the history object for navigation

  // Handle form submission (login)
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      // Get the JWT token from the response
      const { token } = response.data;
      // Store the token in localStorage (or sessionStorage)
      localStorage.setItem('token', token);

      console.log('Token:', token);

      // Decode the JWT to extract the user's role (you can use jwt-decode library if necessary)
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token (base64)
      const userRole = decodedToken.role;  // Extract the role (admin or student)
      const userId = decodedToken.id;
    
      if (userRole === 'admin')
         {
            console.log('Admin');
        navigate('/admin'); 
      } else if (userRole === 'student') {
        console.log('Student');
        navigate(`/student/${userId}`);  
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img 
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" 
              className="img-fluid" 
              alt="Login illustration" 
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleLogin}>
              <div className="input-group mb-4">
                <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"><i className="bi bi-lock"></i></span>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  Login
                </button>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
              </div>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Don't have an account? <a href="/" className="link-danger">Register</a>
              </p>
              <div>
                <a href="#!" className="text-white me-4">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#!" className="text-white me-4">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#!" className="text-white me-4">
                  <i className="bi bi-google"></i>
                </a>
                <a href="#!" className="text-white me-4">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2024. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default Login;
