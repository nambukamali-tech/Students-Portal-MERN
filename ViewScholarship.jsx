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
    <div className="container mt-4">
      <h3>View Scholarship</h3>

      <div className="mb-2">
        <input
          className="form-control w-25 d-inline-block me-2"
          placeholder="Register Number"
          value={registerNumber}
          onChange={(e) => setRegisterNumber(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchScholarship}>
          Search
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {data.map((s, i) => (
        <div
          key={i}
          className="border p-3 mb-2"
          style={{ borderRadius: "5px" }}
        >
          <p><b>Name:</b> {s.student?.studentName}</p>
          <p><b>Scholarship:</b> {s.scholarshipName}</p>
          <p><b>Community:</b> {s.community}</p>
          <p><b>Amount:</b> ₹{s.amount}</p>
          <p><b>Academic Year:</b> {s.academicYear}</p>
        </div>
      ))}
    </div>
  );
}
