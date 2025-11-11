import React from 'react';
import { Navigate } from 'react-router-dom';
// Use absolute path from 'src'
import { useAuth } from 'context/AuthContext';

// This component protects routes from unauthenticated users
// It can also check for a specific role (like "dealer")

function ProtectedRoute({ children, requiredRole }) {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) {
    // While checking auth, show a loading spinner or null
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    // If not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // If logged in, but doesn't have the required role
    // Redirect them to the main properties page (or a "Not Authorized" page)
    console.warn(`User does not have role: ${requiredRole}. Redirecting.`);
    return <Navigate to="/properties" replace />;
  }

  // If logged in AND has the right role (or no role was required),
  // show the page
  return children;
}

export default ProtectedRoute;
