import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth.jsx";

export default function ProtectedRoute({ children, role }) {
  const { user, userDoc } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (role && userDoc?.role !== role) return <Navigate to="/" />;

  return children;
}

