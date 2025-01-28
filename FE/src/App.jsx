// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import StudentPage from "./components/StudentPage";
import AdminPage from "./components/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentForm from "./components/StudentForm";
import Register from "./components/Register";
import CourseForm from "./components/CourseForm";
import StudentEditForm from "./components/StudentEditForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/student/:id"
          element={
            <ProtectedRoute role="student">
              <StudentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentinfo"
          element={
            <ProtectedRoute role="admin">
              <StudentForm />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/course/edit/:id" element={<CourseForm />} />
        <Route path="/course/add" element={<CourseForm />} />
        <Route path="/studentinfo/edit/:id" element={<StudentEditForm />} />
        <Route path="/studentinfo/add" element={<StudentEditForm />} />

      </Routes>
    </Router>
  );
};

export default App;
