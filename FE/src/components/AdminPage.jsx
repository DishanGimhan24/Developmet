import React, { useState, useEffect } from "react";
import axios from "axios";
import "./sidebar.css";
import Sidebar from "./sidebar";
const AdminPage = () => {
  const [course, setCourses] = useState();

  /*     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/courses/addCourse', course);
            console.log('Course created', response.data);
            alert('Course created successfully');
        } catch (err) {
            console.error('Error creating course', err);
        }
    }; */

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/courses/all"
        );
        setCourses(response.data.data); // Set the courses in state
      } catch (err) {
        setError("Error fetching courses");
        console.error(err);
      }
    };

    fetchCourses(); // Fetch courses on component mount
  }, []);


  return (

    <div className="container">
    <Sidebar/>
   {/* Add the Sidebar component */}
   <div className="main-content">
     <div className="height-100 bg-light">
     
       <div className="table-responsive">
         <table className="table">
           <thead>
             <tr>
               <th>Course ID</th>
               <th>Course Name</th>
               <th>Course Description</th>
               <th>Course Duration</th>
               <th>Course Fee</th>
                <th>Action</th>
               
             </tr>
           </thead>
           <tbody>
           {course &&
                  course.map((course) => (
                    <tr key={course._id}>
                      <td>{course._id}</td>
                      <td>{course.title}</td>
                      <td>
                        {course.description}
                        <small className="d-block">{course.description}</small>
                      </td>
                      <td> {course.duration}</td>
                      <td> {course.fee}</td>
                      <td>
                       
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

export default AdminPage;
