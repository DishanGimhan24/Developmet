// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import StudentPage from "./components/StudentPage";
import AdminPage from "./components/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Student from "./components/Student";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/student/:id" element={ <ProtectedRoute role="student"><StudentPage /></ProtectedRoute>}/>
        <Route path="/admin/:id"element={ <ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>}/>
        <Route path="/user"element={<Student/>}/>

      </Routes>
    </Router>
  );
};

export default App;
