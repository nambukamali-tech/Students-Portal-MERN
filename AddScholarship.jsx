import { useState } from "react";
import axios from "axios";

export default function AddScholarship() {
  const [form, setForm] = useState({
    registerNumber: "",
    dateOfBirth: "",
    studentName: "",
    fatherName: "",
    motherName: "",
    fatherOccupation: "",
    country: "",
    state: "",
    area: "",
    community: "",
    scholarshipName: "",
    amount: "",
    academicYear: "",
    status: "Applied"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try
    {
      await axios.post("http://localhost:5000/api/scholarships", form);
      alert("Scholarship added successfully");
    } 
    catch (err) 
    {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Scholarship</h3>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        <input
          className="form-control mb-3"
          placeholder="Register Number"
          name="registerNumber"
          onChange={handleChange}
          required
        />

        <input type="Date"
        className="form-control mb-3"
        placeholder="Date of Birth"
        name="dateOfBirth"
        onChange={handleChange}
        required
        />

        <input
          className="form-control mb-3"
          placeholder="Student Name"
          name="studentName"
          onChange={handleChange}
          required
        />

        <input
        className="form-control mb-3"
        placeholder="Father Name"
        name="fatherName"
        onChange={handleChange}
        required
        />

        <input 
        className="form-control mb-3"
        placeholder="Mother Name"
        name="motherName"
        onChange={handleChange}
        required
        />

        <input className="form-control mb-3"
        placeholder="Father Occupation"
        name="fatherOccupation"
        onChange={handleChange}
        required
        />

       <input className="form-control mb-3"
       placeholder="Country"
       name="country"
       onChange={handleChange}
       required
       />

        <input className="form-control mb-3"
        placeholder="State"
        name="state"
        onChange={handleChange}
        required
        />
        
        <select
        className="form-select mb-3"
        name="area"
        onChange={handleChange}
        required>
             <option value="">Select Area</option>
             <option value="Coimbatore">Coimbatore</option>
             <option value="Theni">Theni</option>
             <option value="Ramanathapuram">Ramanathapuram</option>
             <option value="Kumbakonam">Kumbakonam</option>
             <option value="Tirunelveli">Tirunelveli</option>
             <option value="Thanjavur">Thanjavur</option>
             <option value="Chennai">chennai</option>
        </select>

        <select
          className="form-select mb-3"
          name="community"
          onChange={handleChange}
          required
        >
          <option value="">Select Community</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="BC">BC</option>
          <option value="MBC">MBC</option>
          <option value="OC">OC</option>
        </select>

       <select
       className="form-select mb-3"
       name="scholarshipName"
       onChange={handleChange}
       required>
        <option value="">Choose Scholarship</option>
        <option value="Pudhumai Pen Scheme">Pudhumai Pen Scheme</option>
        <option value="BC Scholarship Scheme">BC Scholarship Scheme</option>
        <option value="MBC Scholarship Scheme">MBC Scholarship Scheme</option>
        <option value="Postgraduate Scheme">Postgraduate Scheme</option>
        <option value="Doctorate Scheme"> Doctorate Scheme</option>
        <option value="SC Yearly Scheme">SC Yearly Scheme</option>
       </select>

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Amount"
          name="amount"
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Academic Year (2024-25)"
          name="academicYear"
          onChange={handleChange}
          required
        />

        <select
          className="form-select mb-3"
          name="status"
          onChange={handleChange}
        >
          <option>Applied</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        <button className="btn btn-success">Save Scholarship</button>
      </form>
    </div>
  );
}
