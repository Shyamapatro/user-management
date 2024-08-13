
import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
  
    try {
      const response = await login(formData);
      console.log('API Response:', response);
  
      if (response?.data?.token) {
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        navigate('/profile');
      } else {
        console.log('API Response Message:', response.data.message);
        setError(response.data.message || 'Login failed: No token provided.');
      }
    } catch (error) {
      if (error.response) {
        // Handle specific status codes
        if (error.response.status === 401) {
          setError('Login failed: Invalid credentials. Please check your email and password.');
        } else {
          setError(error.response.data.message || 'Login failed: An unexpected error occurred.');
        }
      } else {
        setError('Login failed: An error occurred while connecting to the server.');
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Log In</h2>
      <div className="mb-4">
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Log In</button>
      {error && <div className="text-red-500 mt-2">{error}</div>} 
    </form>
  );
};

export default Login;
