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
    <div>
      <h3>View Student Papers</h3>

      <input
        placeholder="Register Number"
        value={registerNumber}
        onChange={(e) => setRegisterNumber(e.target.value)}
      />
      <button onClick={fetchPapers}>View Papers</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="5" style={{ marginTop: "15px" }}>
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
    </div>
  );
}
