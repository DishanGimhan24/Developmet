import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  // Check if user is not authenticated
  if (!user) {
    console.log("User is not authenticated");
    return <Navigate to="/login" />;
  }

  // Check if user role doesn't match requiredRole
  if (requiredRole && user.role !== requiredRole) {

    console.log("User role doesn't match required role");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
