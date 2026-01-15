import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

/* 🌍 Country-based TimePicker */
function TimePicker({ label, value, onChange }) {
  const countries = [
    { name: "India", tz: "Asia/Kolkata" },
    { name: "Japan", tz: "Asia/Tokyo" },
    { name: "Singapore", tz: "Asia/Singapore" },
    { name: "USA (New York)", tz: "America/New_York" },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0].tz);

  const handleCountryChange = (e) => {
    const tz = e.target.value;
    setSelectedCountry(tz);

    if (value) {
      const newTime = moment.tz(value, selectedCountry).tz(tz).format("HH:mm");
      onChange(newTime);
    }
  };

  const currentTime = value || moment().tz(selectedCountry).format("HH:mm");

  return (
    <div className="mb-3">
      <label className="form-label text-light">{label}</label>
      <div className="d-flex gap-2">
        <input
          type="time"
          className="form-control futuristic-input"
          value={currentTime}
          onChange={(e) => onChange(e.target.value)}
        />
        <select
          className="form-select futuristic-input"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          {countries.map((c) => (
            <option key={c.tz} value={c.tz}>{c.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    registerNumber: "",
    studentName: "",
    studentStatus: "Active",
    department: "",
    inTime: "",
    outTime: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (fieldValues = student) => {
    let temp = { ...errors };

    if ("registerNumber" in fieldValues)
      temp.registerNumber = fieldValues.registerNumber ? "" : "Register Number required";

    if ("studentName" in fieldValues)
      temp.studentName = fieldValues.studentName ? "" : "Student Name required";

    if ("department" in fieldValues)
      temp.department = fieldValues.department ? "" : "Department required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
    validate({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios
      .post("http://localhost:5000/api/students", student)
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  return (
    <>
      {/* 🔮 STYLES */}
      <style>{`
        .student-container {
          min-height: 100vh;
          padding: 40px;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
        }

        .glass-card {
          max-width: 700px;
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

        .is-invalid {
          border-color: #ff4b5c !important;
        }

        .invalid-feedback {
          color: #ff7a7a;
        }

        .btn-submit {
          background: linear-gradient(135deg, #00ff96, #00c853);
          border: none;
          padding: 10px 24px;
          border-radius: 12px;
          color: #fff;
          margin-top: 15px;
        }

        .btn-submit:hover {
          opacity: 0.9;
        }
      `}</style>

      {/* 🚀 FORM */}
      <div className="student-container">
        <div className="glass-card">
          <h2 className="page-title">👤 Add Student</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-light">Register Number</label>
              <input
                type="text"
                name="registerNumber"
                className={`form-control futuristic-input ${errors.registerNumber ? "is-invalid" : ""}`}
                value={student.registerNumber}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.registerNumber}</div>
            </div>

            <div className="mb-3">
              <label className="form-label text-light">Student Name</label>
              <input
                type="text"
                name="studentName"
                className={`form-control futuristic-input ${errors.studentName ? "is-invalid" : ""}`}
                value={student.studentName}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.studentName}</div>
            </div>

            <div className="mb-3">
              <label className="form-label text-light">Status</label>
              <select
                name="studentStatus"
                className="form-select futuristic-input"
                value={student.studentStatus}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label text-light">Department</label>
              <select
                name="department"
                className={`form-select futuristic-input ${errors.department ? "is-invalid" : ""}`}
                value={student.department}
                onChange={handleChange}
              >
                <option value="">-- Select Course --</option>
                <optgroup label="UG Courses">
                  <option>BSc CS</option>
                  <option>BSc Maths</option>
                  <option>BSc Chemistry</option>
                </optgroup>
                <optgroup label="PG Courses">
                  <option>MSc CS</option>
                  <option>MSc Maths</option>
                </optgroup>
              </select>
              <div className="invalid-feedback">{errors.department}</div>
            </div>

            <TimePicker label="In Time" value={student.inTime} onChange={(v) => setStudent({ ...student, inTime: v })} />
            <TimePicker label="Out Time" value={student.outTime} onChange={(v) => setStudent({ ...student, outTime: v })} />

            <button type="submit" className="btn btn-submit w-100">
              ➕ Add Student
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
