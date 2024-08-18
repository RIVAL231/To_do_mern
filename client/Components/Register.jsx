import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
const Register = () => {
  // State to capture input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a POST request to your registration endpoint
      const response = await fetch('https://to-do-mern-nine.vercel.app/auth/register', { // Adjust the URL as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
       navigate('/login');
      } else {
        console.error('Registration failed:', data.error);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter name" 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
      />
      <input 
        type="email" 
        placeholder="Enter email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
      />
      <input 
        type="password" 
        placeholder="Set Password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
      />
      <button type="submit">Register</button>
      <Link to="/login">Already have an account? Login</Link>
    </form>
    </div>
  );
};

export default Register;
