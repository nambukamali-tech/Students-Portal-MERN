import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment-timezone";

// TimePicker component
function TimePicker({ label, value, onChange }) {
  const countries = [
    { name: "India", tz: "Asia/Kolkata" },
    { name: "Japan", tz: "Asia/Tokyo" },
    { name: "Singapore", tz: "Asia/Singapore" },
    { name: "USA (New York)", tz: "America/New_York" },
  ];

  const [selectedCountry, setSelectedCountry] = useState(
    countries[0].tz
  );

  const handleCountryChange = (e) => {
    const tz = e.target.value;
    setSelectedCountry(tz);
    if (value) {
      const newTime = moment.tz(value, selectedCountry).tz(tz).format("HH:mm");
      onChange(newTime);
    }
  };

  const handleTimeChange = (e) => {
    onChange(e.target.value);
  };

  const currentTime = value || moment().tz(selectedCountry).format("HH:mm");

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div className="d-flex gap-2">
        <input
          type="time"
          className="form-control"
          value={currentTime}
          onChange={handleTimeChange}
        />
        <select
          className="form-select"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          {countries.map((c) => (
            <option key={c.tz} value={c.tz}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    registerNumber: "",
    studentName: "",
    studentStatus: "Active",
    department: "",
    inTime: "",
    outTime: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/students/${id}`)
      .then((res) => setStudent(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (field, value) => {
    setStudent({ ...student, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/students/${id}`, student)
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2 className="mb-4">Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Register Number</label>
          <input
            type="text"
            className="form-control"
            name="registerNumber"
            value={student.registerNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="studentName"
            value={student.studentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="studentStatus"
            value={student.studentStatus}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Department</label>
          <select
            className="form-select"
            name="department"
            value={student.department}
            onChange={handleChange}
            required
          >
            <option value="">--Select the Course--</option>
            <optgroup label="UG Courses">
              <option value="BSc Computer Science">BSc CS</option>
              <option value="BSc Mathematics">BSc Maths</option>
              <option value="BSc Chemistry">BSc Chem</option>
              <option value="BSc Physics">BSc Phy</option>
              <option value="BCA">BCA</option>
              <option value="BSc Botany">BSc Botany</option>
              <option value="BSc Zoology">BSc Zoology</option>
              <option value="BA Tamil">BA Tamil</option>
              <option value="BA English">BA English</option>
            </optgroup>
            <optgroup label="PG Courses">
              <option value="MSc CS">MSc Computer Science</option>
              <option value="MSc Maths">MSc Mathematics</option>
              <option value="MSc Physics">MSc Physics</option>
              <option value="MSc Zoology">MSc Zoology</option>
              <option value="MA English">MA English</option>
              <option value="MA Tamil">MA Tamil</option>
            </optgroup>
            <optgroup label="Phd Courses">
              <option value="Phd in Computer Science">Phd CS</option>
              <option value="Phd in Tamil">Phd Tamil</option>
              <option value="Phd in Physics">Phd Physics</option>
            </optgroup>
          </select>
        </div>

        <TimePicker
          label="In Time"
          value={student.inTime}
          onChange={(val) => handleTimeChange("inTime", val)}
        />
        <TimePicker
          label="Out Time"
          value={student.outTime}
          onChange={(val) => handleTimeChange("outTime", val)}
        />

        <button type="submit" className="btn btn-primary">
          Update Student
        </button>
      </form>
    </div>
  );
}
