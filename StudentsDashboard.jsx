import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

 const handleDelete = (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this student?");
  if (!confirmDelete) return;

  axios.delete(`http://localhost:5000/api/students/${id}`)
    .then(() => {
      setStudents(prevStudents => prevStudents.filter(s => s._id !== id));
    })
    .catch(err => console.error(err));
};
  return (
    <div>
      <h2 className="mb-4">Students List</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Register No</th>
            <th>Student Name</th>
            <th>Student Status</th>
            <th>Department</th>
            <th>In Time</th>
            <th>Out Time</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.registerNumber}</td>
              <td>{s.studentName}</td>
              <td>{s.studentStatus}</td>
              <td>{s.department}</td>
              <td>{s.inTime}</td>
              <td>{s.outTime}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => navigate(`/edit-student/${s._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(s._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
