import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { jwtDecode } from "jwt-decode";

export default function AddScholarship() {
  const { getAccessTokenSilently, isAuthenticated, logout } = useAuth0();

  const [form, setForm] = useState({
    registerNumber: "",
    dateOfBirth: "",
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
  });

  const [canAdd, setCanAdd] = useState(false);

  // 🔐 Check permission
  useEffect(() => {
    const checkPermission = async () => {
      if (!isAuthenticated) return;

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: { audience: "https://student-portal-api" },
        });

        const decoded = jwtDecode(token);
        const permissions = decoded.permissions || [];
        setCanAdd(permissions.includes("add:scholarship"));
      } catch (err) {
        console.error("Permission check error:", err);
        setCanAdd(false);
      }
    };

    checkPermission();
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: "https://student-portal-api" },
      });

      await axios.post("http://localhost:5000/api/scholarships", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Scholarship added successfully ✅");

      setForm({
        registerNumber: "",
        dateOfBirth: "",
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
      });
    } catch (err) {
      console.error("Add Scholarship Error:", err.response?.data || err.message);
      alert("Failed to add scholarship ❌");
    }
  };

  // 🔑 Auth checks
  if (!isAuthenticated) {
    return (
      <p style={{ textAlign: "center" }}>
        You must log in first.
        <br />
        <button
          onClick={() =>
            logout({
              logoutParams: { returnTo: window.location.origin },
            })
          }
        >
          Logout
        </button>
      </p>
    );
  }

  if (!canAdd) {
    return <p style={{ textAlign: "center" }}>No permission to add scholarship.</p>;
  }

  // 🎨 UI
  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Add Scholarship
      </h2>

      <form onSubmit={handleSubmit} className="d-grid gap-3">
        <div>
          <label>Register Number</label>
          <input
            className="form-control"
            name="registerNumber"
            value={form.registerNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            className="form-control"
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Father Name</label>
          <input
            className="form-control"
            name="fatherName"
            value={form.fatherName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Mother Name</label>
          <input
            className="form-control"
            name="motherName"
            value={form.motherName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Father Occupation</label>
          <input
            className="form-control"
            name="fatherOccupation"
            value={form.fatherOccupation}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Country</label>
          <input
            className="form-control"
            name="country"
            value={form.country}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>State</label>
          <input
            className="form-control"
            name="state"
            value={form.state}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Area</label>
          <input
            className="form-control"
            name="area"
            value={form.area}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Community</label>
          <input
            className="form-control"
            name="community"
            value={form.community}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Scholarship Name</label>
          <input
            className="form-control"
            name="scholarshipName"
            value={form.scholarshipName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Amount</label>
          <input
            className="form-control"
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Academic Year</label>
          <input
            className="form-control"
            name="academicYear"
            value={form.academicYear}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary mt-3" type="submit">
          Save Scholarship
        </button>
      </form>
    </div>
  );
}
