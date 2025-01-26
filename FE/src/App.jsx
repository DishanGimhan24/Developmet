// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import StudentPage from "./components/StudentPage";
import AdminPage from "./components/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Student from "./components/Student";
import StudentForm from "./components/StudentForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student/:id" element={ <ProtectedRoute role="student"><StudentPage /></ProtectedRoute>}/>
        <Route path="/admin"element={ <ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>}/>
        <Route path="/studentinfo" element={<StudentForm/>} />

      </Routes>
    </Router>
  );
};

export default App;
