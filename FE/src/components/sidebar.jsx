import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div className="l-navbar" id="nav-bar">
      <nav className="nav">
        <div>
          <a href="#" className="nav_logo">
            <i className="bx bx-layer nav_logo-icon"></i>
            <span className="nav_logo-name">Learning System</span>
          </a>
          <div className="nav_list">
            <a href="/admin" className="nav_link">
              <i className="bx bx-grid-alt nav_icon"></i>
              <span className="nav_name">Admin</span>
            </a>
            <a href="/studentinfo" className="nav_link">
              <i className="bx bx-user nav_icon"></i>
              <span className="nav_name">Student</span>
            </a>
            <a href="/enrolles" className="nav_link">
              <i className="bx bx-message-square-detail nav_icon"></i>
              <span className="nav_name">Enrollments</span>
            </a>
            <a href="#" className="nav_link">
              <i className="bx bx-bookmark nav_icon"></i>
              <span className="nav_name">Bookmark</span>
            </a>
            <a href="#" className="nav_link">
              <i className="bx bx-folder nav_icon"></i>
              <span className="nav_name">Files</span>
            </a>
            <a href="#" className="nav_link">
              <i className="bx bx-bar-chart-alt-2 nav_icon"></i>
              <span className="nav_name">Stats</span>
            </a>
            <a href="#" className="nav_link" onClick={handleLogout}>
              <i className="bx bx-log-out nav_icon"></i>
              <span className="nav_name">SignOut</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;