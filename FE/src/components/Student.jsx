import React, { useState, useEffect } from "react";
import axios from "axios";
import "./sidebar.css";
const Student = () => {
  const [students, setStudent] = useState();

  /*     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/Student/addstudent', student);
            console.log('student created', response.data);
            alert('student created successfully');
        } catch (err) {
            console.error('Error creating student', err);
        }
    }; */

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/students/all"
        );
        setStudent(response.data.data); // Set the Student in state
      } catch (err) {
        setError("Error fetching Student");
        console.error(err);
      }
    };

    fetchStudent(); // Fetch Student on component mount
  }, []);

  document.addEventListener("DOMContentLoaded", function (event) {
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
      const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId);

      // Validate that all variables exist
      if (toggle && nav && bodypd && headerpd) {
        toggle.addEventListener("click", () => {
          // show navbar
          nav.classList.toggle("show");
          // change icon
          toggle.classList.toggle("bx-x");
          // add padding to body
          bodypd.classList.toggle("body-pd");
          // add padding to header
          headerpd.classList.toggle("body-pd");
        });
      }
    };

    showNavbar("header-toggle", "nav-bar", "body-pd", "header");

    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll(".nav_link");

    function colorLink() {
      if (linkColor) {
        linkColor.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    }
    linkColor.forEach((l) => l.addEventListener("click", colorLink));

    // Your code to run since DOM is loaded and ready
  });

  return (
    <div id="body-pd">
      <header class="header" id="header">
        <div class="header_toggle">
          {" "}
          <i class="bx bx-menu" id="header-toggle"></i>{" "}
        </div>
        <div class="header_img">
          {" "}
          <img src="https://i.imgur.com/hczKIze.jpg" alt="" />{" "}
        </div>
      </header>
      <div class="l-navbar" id="nav-bar">
        <nav class="nav">
          <div>
            {" "}
            <a href="#" class="nav_logo">
              {" "}
              <i class="bx bx-layer nav_logo-icon"></i>{" "}
              <span class="nav_logo-name">BBBootstrap</span>{" "}
            </a>
            <div class="nav_list">
              {" "}
              <a href="#" class="nav_link active">
                {" "}
                <i class="bx bx-grid-alt nav_icon"></i>{" "}
                <span class="nav_name">Dashboard</span>{" "}
              </a>{" "}
              <a href="#" class="nav_link">
                {" "}
                <i class="bx bx-user nav_icon"></i>{" "}
                <span class="nav_name">Users</span>{" "}
              </a>{" "}
              <a href="#" class="nav_link">
                {" "}
                <i class="bx bx-message-square-detail nav_icon"></i>{" "}
                <span class="nav_name">Messages</span>{" "}
              </a>{" "}
              <a href="#" class="nav_link">
                {" "}
                <i class="bx bx-bookmark nav_icon"></i>{" "}
                <span class="nav_name">Bookmark</span>{" "}
              </a>{" "}
              <a href="#" class="nav_link">
                {" "}
                <i class="bx bx-folder nav_icon"></i>{" "}
                <span class="nav_name">Files</span>{" "}
              </a>{" "}
              <a href="#" class="nav_link">
                {" "}
                <i class="bx bx-bar-chart-alt-2 nav_icon"></i>{" "}
                <span class="nav_name">Stats</span>{" "}
              </a>{" "}
            </div>
          </div>{" "}
          <a href="#" class="nav_link">
            {" "}
            <i class="bx bx-log-out nav_icon"></i>{" "}
            <span class="nav_name">SignOut</span>{" "}
          </a>
        </nav>
      </div>
      {/*  <!--Container Main start--> */}
      {/*  <div class="height-100 bg-light">
            <h4>Main Components</h4>
        </div> */}
      {/*  <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={student.title}
                    onChange={(e) => setstudent({ ...student, title: e.target.value })}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    value={student.description}
                    onChange={(e) => setstudent({ ...student, description: e.target.value })}
                    required
                />
            </div>
            <div>
                <label>Duration</label>
                <select
                    value={student.duration}
                    onChange={(e) => setstudent({ ...student, duration: parseInt(e.target.value) })}
                    required
                >
                    <option value={1}>1 Month</option>
                    <option value={3}>3 Months</option>
                    <option value={6}>6 Months</option>
                    <option value={12}>12 Months</option>
                </select>
            </div>
            <div>
                <label>Fee</label>
    
                <input
                    type="number"
                    value={student.fee}
                    onChange={(e) => setstudent({ ...student, fee: parseInt(e.target.value) })}
                    required
                />
            </div>
            <button type="submit">Create student</button>
        </form> */}
      <div class="content">
        <div class="container">
          <h2 class="mb-5">Table #9</h2>

          <div class="table-responsive">
            <table class="table custom-table">
              <thead>
                <tr>
                  <th scope="col">
                    <label class="control control--checkbox">
                      <input type="checkbox" class="js-check-all" />
                      <div class="control__indicator"></div>
                    </label>
                  </th>
                  <th scope="col">student ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">E mail</th>
                  <th scope="col">Date Of Birth</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Course</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students &&
                  students.map((student) => (
                    <tr key={student._id}>
                      <th scope="row">
                        <label className="control control--checkbox">
                          <input type="checkbox" />
                          <div className="control__indicator"></div>
                        </label>
                      </th>
                      <td>{student._id}</td>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.email}</td>
                      <td>{student.dateOfBirth}</td>
                      <td>{student.gender}</td>
                      <td>{student.course}</td>
                      <td scope="row">
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
