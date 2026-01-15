import { useState } from "react";
import axios from "axios";

export default function AddStudentPapers() {
  const [registerNumber, setRegisterNumber] = useState("");
  const [papers, setPapers] = useState([]);

  const addPaper = () => {
    setPapers([
      ...papers,
      { paperName: "", paperCode: "", semester: "", marks: "" }
    ]);
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
      papers,
    });

    alert("Papers added successfully");
  };

  return (
    <>
      {/* 🔮 STYLES */}
      <style>{`
        .paper-container {
          min-height: 100vh;
          padding: 40px;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          color: #fff;
        }

        .glass-form {
          max-width: 900px;
          margin: auto;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(14px);
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
        }

        .form-title {
          text-align: center;
          margin-bottom: 25px;
          font-weight: 600;
          background: linear-gradient(90deg, #00f5ff, #7cffcb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .form-control-custom {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          border-radius: 10px;
          padding: 10px;
          margin-bottom: 15px;
          outline: none;
        }

        .form-control-custom::placeholder {
          color: #ccc;
        }

        .paper-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 15px;
        }

        .btn-add {
          background: linear-gradient(135deg, #00c6ff, #0072ff);
          border: none;
          color: #fff;
          padding: 10px 18px;
          border-radius: 10px;
          margin-right: 10px;
        }

        .btn-save {
          background: linear-gradient(135deg, #00ff96, #00c853);
          border: none;
          color: #fff;
          padding: 10px 24px;
          border-radius: 10px;
        }

        .btn-add:hover,
        .btn-save:hover {
          opacity: 0.9;
        }

        hr {
          border-color: rgba(255,255,255,0.2);
          margin: 20px 0;
        }

        @media (max-width: 768px) {
          .paper-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* 🚀 FORM */}
      <div className="paper-container">
        <form className="glass-form" onSubmit={handleSubmit}>
          <h3 className="form-title"> Add Student Papers</h3>

          <input
            className="form-control-custom"
            placeholder="Register Number"
            value={registerNumber}
            onChange={(e) => setRegisterNumber(e.target.value)}
            required
          />

          <hr />

          {papers.map((p, i) => (
            <div key={i} className="paper-row">
              <input
                className="form-control-custom"
                placeholder="Paper Name"
                onChange={(e) => handleChange(i, "paperName", e.target.value)}
              />

              <input
                className="form-control-custom"
                placeholder="Paper Code"
                onChange={(e) => handleChange(i, "paperCode", e.target.value)}
              />

              <input
                className="form-control-custom"
                placeholder="Semester"
                onChange={(e) => handleChange(i, "semester", e.target.value)}
              />

              <input
                className="form-control-custom"
                placeholder="Marks"
                onChange={(e) => handleChange(i, "marks", e.target.value)}
              />
            </div>
          ))}

          <div className="mt-3">
            <button type="button" className="btn btn-add" onClick={addPaper}>
              Add Paper
            </button>

            <button type="submit" className="btn btn-save">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
