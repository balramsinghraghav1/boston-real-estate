import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Page Components (using absolute paths from 'src')
import Home from 'pages/Home';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Properties from 'pages/Properties';
import Upload from 'pages/Upload';
import Calculator from 'pages/Calculator';

// Import Shared Components (using absolute paths from 'src')
import Navbar from 'components/Navbar';
import ProtectedRoute from 'components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes (Must be logged in) */}
          <Route 
            path="/properties" 
            element={
              <ProtectedRoute>
                <Properties />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/calculator" 
            element={
              <ProtectedRoute>
                <Calculator />
              </ProtectedRoute>
            } 
          />
          
          {/* Dealer-Only Route */}
          <Route 
            path="/upload" 
            element={
              <ProtectedRoute requiredRole="dealer">
                <Upload />
              </ProtectedRoute>
            } 
          />
          
        </Routes>
      </main>
    </div>
  );
}

export default App;
