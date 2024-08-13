import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute'; 
import UserListingPage from './components/UserListingPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute element={<UserProfile />} /> 
          }
        />
        <Route path="/UserListingPage" element={<UserListingPage />} />
        <Route path="/" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
