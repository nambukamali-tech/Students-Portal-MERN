import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function ViewScholarship() {
  const { getAccessTokenSilently } = useAuth0();
  const [registerNumber, setRegisterNumber] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchScholarship = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://student-portal-api",
        },
      });
      const res = await axios.get(
        `http://localhost:5000/api/scholarships/${registerNumber}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "No scholarship found");
      setData([]);
    }
  };

  return (
    <>
      {/* 🔮 STYLES */}
      <style>{`
        .scholarship-view-container {
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
          background: rgba(255,255,255,0.1) !important;
          border: 1px solid rgba(255,255,255,0.25) !important;
          color: #fff !important;
          border-radius: 10px;
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
          margin-top: 15px;
          font-weight: 600;
        }

        .btn-submit:hover {
          opacity: 0.9;
        }

        .scholarship-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          padding: 20px;
          margin-bottom: 15px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          color: #fff;
        }

        .error-text {
          color: #ff7a7a;
          text-align: center;
          margin-top: 15px;
        }

        .search-bar {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-bottom: 25px;
        }

        .search-bar input {
          max-width: 250px;
        }
      `}</style>

      {/* 🚀 UI */}
      <div className="scholarship-view-container">
        <div className="glass-card">
          <h2 className="page-title">🎓 View Scholarship</h2>

          <div className="search-bar">
            <input
              className="form-control futuristic-input"
              placeholder="Register Number"
              value={registerNumber}
              onChange={(e) => setRegisterNumber(e.target.value)}
            />
            <button className="btn btn-submit" onClick={fetchScholarship}>
              🔍 Search
            </button>
          </div>

          {error && <div className="error-text">{error}</div>}

          {data.map((s, i) => (
            <div key={i} className="scholarship-card">
              <p><b>Name:</b> {s.student?.studentName}</p>
              <p><b>Scholarship:</b> {s.scholarshipName}</p>
              <p><b>Community:</b> {s.community}</p>
              <p><b>Amount:</b> ₹{s.amount}</p>
              <p><b>Academic Year:</b> {s.academicYear}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
