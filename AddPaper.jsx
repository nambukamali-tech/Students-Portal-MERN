import { useState } from "react";
import axios from "axios";

export default function AddStudentPapers() {
  const [registerNumber, setRegisterNumber] = useState("");
  const [papers, setPapers] = useState([]);

  const addPaper = () => {
    setPapers([...papers, { paperName: "", paperCode: "",semester: "", marks: "" }]);
  };

  const handleChange = (i, field, value) => {
    const list = [...papers];
    list[i][field] = value;
    setPapers(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/student-papers", {
      registerNumber,
      papers
    });

    alert("Papers added successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Papers</h3>

      <input
        placeholder="Register Number"
        value={registerNumber}
        onChange={(e) => setRegisterNumber(e.target.value)}
        required
      />

      <hr />

      {papers.map((p, i) => (
        <div key={i}>
          <input
            placeholder="Paper Name"
            onChange={(e) => handleChange(i, "paperName", e.target.value)}
          />
          <input
           placeholder="Paper Code"
           onChange={(e) => handleChange(i, "paperCode", e.target.value)}/>

          <input
            placeholder="Semester"
            onChange={(e) => handleChange(i, "semester", e.target.value)}
          />
          <input
            placeholder="Marks"
            onChange={(e) => handleChange(i, "marks", e.target.value)}
          />
        </div>
      ))}

      <button type="button" onClick={addPaper}>Add Paper</button>
      <br /><br />
      <button type="submit">Save</button>
    </form>
  );
}
