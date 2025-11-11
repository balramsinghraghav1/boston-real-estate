// Home.js placeholder
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="bg-white shadow rounded-lg p-8 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Boston Real Estate
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Your one-stop platform for buying and selling properties in the Boston area.
      </p>
      
      {currentUser ? (
        // User is logged in
        <div>
          <p className="text-xl text-gray-800 mb-6">
            Welcome back, {currentUser.email}!
          </p>
          <Link
            to="/properties"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium shadow-md"
          >
            Browse Properties
          </Link>
        </div>
      ) : (
        // User is logged out
        <div>
          <p className="text-lg text-gray-700 mb-8">
            Dealers can upload listings, and buyers can browse the latest properties in real-time.
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium shadow-md"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-md text-lg font-medium shadow-md border border-gray-300"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
