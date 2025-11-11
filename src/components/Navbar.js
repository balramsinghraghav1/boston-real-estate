import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { auth } from 'firebase/config'; // For signing out
import { signOut } from 'firebase/auth';

function Navbar() {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-bold text-xl text-blue-600">
              Boston Real Estate
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {currentUser && (
              <>
                <Link to="/properties" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium">
                  Properties
                </Link>
                <Link to="/calculator" className="text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                  Calculator
                </Link>
                {/* Show "Upload" only if user is a dealer */}
                {userRole === 'dealer' && (
                  <Link to="/upload" className="text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                    Upload Property
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Right Side: Auth Buttons */}
          <div className="flex items-center space-x-2">
            {currentUser ? (
              // Logged-in view
              <>
                <span className="text-sm text-gray-600 hidden md:block">
                  {currentUser.email} ({userRole})
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              // Logged-out view
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
