import { useState } from "react";
import axios from "axios";

export default function ViewStudentPapers() {
  const [registerNumber, setRegisterNumber] = useState("");
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState("");

  const fetchPapers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/student-papers/${registerNumber}`
      );
      setPapers(res.data);
      setError("");
    } catch (err) {
      setPapers([]);
      setError("No papers found for this student");
    }
  };

  return (
    <>
      {/* 🔮 STYLES */}
      <style>{`
        .papers-container {
          min-height: 100vh;
          padding: 40px;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
        }

        .glass-card {
          max-width: 750px;
          margin: auto;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
        }

        .page-title {
          text-align: center;
          margin-bottom: 25px;
          font-weight: 600;
          background: linear-gradient(90deg, #00f5ff, #7cffcb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .futuristic-input {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          border-radius: 10px;
          padding: 10px 12px;
        }

        .futuristic-input::placeholder {
          color: #ccc;
        }

        .btn-submit {
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          border: none;
          padding: 10px 24px;
          border-radius: 12px;
          color: #fff;
          margin-left: 10px;
          font-weight: 600;
        }

        .btn-submit:hover {
          opacity: 0.9;
        }

        .search-bar {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 25px;
        }

        .paper-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          padding: 20px;
          margin-bottom: 15px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          color: #fff;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
          color: #fff;
        }

        th, td {
          padding: 10px;
          border: 1px solid rgba(255,255,255,0.25);
        }

        th {
          background: rgba(255,255,255,0.1);
        }

        .error-text {
          color: #ff7a7a;
          text-align: center;
          margin-bottom: 15px;
        }
      `}</style>

      {/* 🚀 UI */}
      <div className="papers-container">
        <div className="glass-card">
          <h2 className="page-title">📄 View Student Papers</h2>

          <div className="search-bar">
            <input
              className="futuristic-input"
              placeholder="Register Number"
              value={registerNumber}
              onChange={(e) => setRegisterNumber(e.target.value)}
            />
            <button className="btn-submit" onClick={fetchPapers}>
              🔍 View Papers
            </button>
          </div>

          {error && <div className="error-text">{error}</div>}

          {papers.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Paper Name</th>
                  <th>Paper Code</th>
                  <th>Semester</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {papers.map((p, i) => (
                  <tr key={i}>
                    <td>{p.paperName}</td>
                    <td>{p.paperCode}</td>
                    <td>{p.semester}</td>
                    <td>{p.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
