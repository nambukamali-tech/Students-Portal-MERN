import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    axios.delete(`http://localhost:5000/api/students/${id}`)
      .then(() => {
        setStudents(prev => prev.filter(s => s._id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      {/* 🔮 FUTURISTIC STYLES */}
      <style>{`
        body {
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
        }

        .dashboard-container {
          min-height: 100vh;
          padding: 40px;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(14px);
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
        }

        .dashboard-title {
          text-align: center;
          font-weight: 600;
          margin-bottom: 25px;
          background: linear-gradient(90deg, #00f5ff, #7cffcb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .futuristic-table {
          color: #fff;
          border-collapse: separate;
          border-spacing: 0 10px;
        }

        .futuristic-table thead th {
          border: none;
          color: blue;
          font-size: 14px;
        }

        .futuristic-table tbody tr {
          background: rgba(255, 255, 255, 0.06);
          transition: all 0.3s ease;
        }

        .futuristic-table tbody tr:hover {
          transform: scale(1.01);
          box-shadow: 0 0 12px rgba(0, 245, 255, 0.4);
        }

        .futuristic-table td {
          border: none;
          vertical-align: middle;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
        }

        .present { /* Active */
          background: rgba(0, 255, 150, 0.2);
          color: #00ff96;
        }

        .absent { /* Inactive */
          background: rgba(255, 70, 70, 0.2);
          color: #ff4646;
        }

        .btn-edit {
          background: linear-gradient(135deg, #00c6ff, #0072ff);
          border: none;
          color: #fff;
          padding: 6px 10px;
          border-radius: 8px;
        }

        .btn-delete {
          background: linear-gradient(135deg, #ff4b2b, #ff416c);
          border: none;
          color: #fff;
          padding: 6px 10px;
          border-radius: 8px;
        }

        .btn-edit:hover,
        .btn-delete:hover {
          opacity: 0.85;
        }
      `}</style>

      {/* 🚀 DASHBOARD */}
      <div className="dashboard-container">
        <div className="glass-card">
          <h2 className="dashboard-title"> STUDENT MANAGEMENT</h2>

          <div className="table-responsive">
            <table className="table futuristic-table">
              <thead>
                <tr>
                  <th>REG NO</th>
                  <th>STUDENT NAME</th>
                  <th>STUDENT STATUS</th>
                  <th>DEPARTMENT</th>
                  <th>IN TIME</th>
                  <th>OUT TIME</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {students.map(s => (
                  <tr key={s._id}>
                    <td>{s.registerNumber}</td>
                    <td>{s.studentName}</td>
                    <td>
                      <span className={`status-badge ${s.studentStatus === "Active" ? "present" : "absent"}`}>
                        {s.studentStatus}
                      </span>
                    </td>
                    <td>{s.department}</td>
                    <td>{s.inTime}</td>
                    <td>{s.outTime}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => navigate(`/edit-student/${s._id}`)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-delete ms-2"
                        onClick={() => handleDelete(s._id)}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}
