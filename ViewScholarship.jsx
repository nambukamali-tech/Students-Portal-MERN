import { useState } from "react";
import axios from "axios";

export default function ViewScholarship() {
  const [registerNumber, setRegisterNumber] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchScholarship = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/scholarships/${registerNumber}`
      );
      setData(res.data);
      setError("");
    } catch (err) {
      setError("No scholarship found");
      setData([]);
    }
  };

  return (
    <div>
      <h3>View Scholarship</h3>

      <input
        placeholder="Register Number"
        value={registerNumber}
        onChange={(e) => setRegisterNumber(e.target.value)}
      />
      <button onClick={fetchScholarship}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data.map((s, i) => (
        <div key={i} style={{ border: "1px solid #ccc", marginTop: 10 }}>
          <p><b>Name:</b> {s.student.studentName}</p>
          <p><b>Scholarship:</b> {s.scholarshipName}</p>
          <p><b>Community:</b> {s.community}</p>
          <p><b>Amount:</b> ₹{s.amount}</p>
          <p><b>Status:</b> {s.status}</p>
        </div>
      ))}
    </div>
  );
}
