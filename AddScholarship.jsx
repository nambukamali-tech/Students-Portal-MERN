import { useState } from "react";
import axios from "axios";

export default function AddScholarship() {
  const [form, setForm] = useState({
    studentName: "",
    scholarshipName: "",
    community: "",
    amount: "",
    academicYear: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (fieldValues = form) => {
    let temp = { ...errors };

    if ("studentName" in fieldValues)
      temp.studentName = fieldValues.studentName ? "" : "Student Name required";

    if ("scholarshipName" in fieldValues)
      temp.scholarshipName = fieldValues.scholarshipName ? "" : "Scholarship required";

    if ("community" in fieldValues)
      temp.community = fieldValues.community ? "" : "Community required";

    if ("amount" in fieldValues)
      temp.amount = fieldValues.amount ? "" : "Amount required";

    if ("academicYear" in fieldValues)
      temp.academicYear = fieldValues.academicYear ? "" : "Academic Year required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validate({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await axios.post("http://localhost:5000/api/scholarships", form);
    alert("Scholarship added successfully ✅");

    setForm({
      studentName: "",
      scholarshipName: "",
      community: "",
      amount: "",
      academicYear: "",
    });
  };

  return (
    <>
      {/* 🔮 STYLES */}
      <style>{`
        .scholarship-container {
          min-height: 100vh;
          padding: 40px;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
        }

        .glass-card {
          max-width: 650px;
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
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          border: none;
          padding: 12px;
          border-radius: 12px;
          color: #fff;
          margin-top: 15px;
          font-weight: 600;
        }

        .btn-submit:hover {
          opacity: 0.9;
        }
      `}</style>

      {/* 🚀 FORM */}
      <div className="scholarship-container">
        <div className="glass-card">
          <h2 className="page-title">🎓 Add Scholarship</h2>

          <form onSubmit={handleSubmit}>
            {/* Student Name */}
            <div className="mb-3">
              <label className="form-label text-light">Student Name</label>
              <input
                type="text"
                name="studentName"
                className={`form-control futuristic-input ${errors.studentName ? "is-invalid" : ""}`}
                value={form.studentName}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.studentName}</div>
            </div>

            {/* Scholarship Name */}
            <div className="mb-3">
              <label className="form-label text-light">Scholarship Name</label>
              <input
                type="text"
                name="scholarshipName"
                className={`form-control futuristic-input ${errors.scholarshipName ? "is-invalid" : ""}`}
                value={form.scholarshipName}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.scholarshipName}</div>
            </div>

            {/* Community */}
            <div className="mb-3">
              <label className="form-label text-light">Community</label>
              <input
                type="text"
                name="community"
                className={`form-control futuristic-input ${errors.community ? "is-invalid" : ""}`}
                value={form.community}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.community}</div>
            </div>

            {/* Amount */}
            <div className="mb-3">
              <label className="form-label text-light">Amount</label>
              <input
                type="number"
                name="amount"
                className={`form-control futuristic-input ${errors.amount ? "is-invalid" : ""}`}
                value={form.amount}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.amount}</div>
            </div>

            {/* Academic Year */}
            <div className="mb-3">
              <label className="form-label text-light">Academic Year</label>
              <input
                type="text"
                name="academicYear"
                placeholder="2024 - 2025"
                className={`form-control futuristic-input ${errors.academicYear ? "is-invalid" : ""}`}
                value={form.academicYear}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.academicYear}</div>
            </div>

            <button type="submit" className="btn btn-submit w-100">
              ➕ Add Scholarship
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
