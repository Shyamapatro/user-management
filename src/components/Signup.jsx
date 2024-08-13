
import React, { useState } from 'react';
import * as Yup from 'yup';
import { signup } from '../api'; 
import { useNavigate } from 'react-router-dom'; 
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First Name is required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone Number is required'),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      try {
        const response = await signup(formData); 
        alert('Signup successful!');
        if(response){
          navigate('/login');
        }
        
      } catch (error) {
        console.error(error);
        alert('Signup failed!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <div className="mb-4">
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.firstName && <div className="text-red-500">{errors.firstName}</div>}
      </div>
      <div className="mb-4">
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.lastName && <div className="text-red-500">{errors.lastName}</div>}
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.email && <div className="text-red-500">{errors.email}</div>}
      </div>
      <div className="mb-4">
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.phoneNumber && <div className="text-red-500">{errors.phoneNumber}</div>}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Sign Up</button>
    </form>
  );
};

export default Signup;
