const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const studentRoutes = require("./routes/StudentRoutes");
app.use("/api/students", studentRoutes);
//Register routes in server.js Adding Students papers
const studentPaperRoutes = require("./routes/StudentPaperRoutes");
app.use("/api/student-papers", studentPaperRoutes);
//Register routes in server.js Adding StudentScholarship
const scholarshipRoutes = require("./routes/StudentScholarshipRoutes");
app.use("/api/scholarships", scholarshipRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error(err));

// test route
app.get("/", (req, res) => {
  res.send("Student Portal API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
