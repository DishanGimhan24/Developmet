// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getUserFromToken, isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children, role }) => {
  const user = getUserFromToken();
  console.log("User from token:", localStorage.getItem('token'));
  localStorage.getItem('token');
  if (!isAuthenticated()) {
    console.log("User is not authenticated");
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
