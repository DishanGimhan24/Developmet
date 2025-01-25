

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Use the useHistory hook for navigation
import axios from 'axios';

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

      console.log('User role:', userRole);
      // Navigate to the appropriate page based on the user's role
      if (userRole === 'admin')
         {
            console.log('Admin');
        navigate('/admin');  // Navigate to the admin page
      } else if (userRole === 'student') {
        console.log('Student');
        navigate('/student');  // Navigate to the student page
      }
    } catch (err) {
      setError('Invalid credentials');  // Set error message if login fails
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
