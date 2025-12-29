const express = require("express");//Import express framework needed for post and get data
const Student = require("../models/Student");//Import Student model
const router = express.Router();//Like "Controller" in ASP .NET
//create mini express app & do the student related routes
//POST -- Add all students
router.post("/", async(req , res ) => {//For post method to save datas to db 
//async means mongodb operations are asynchronous
try{
 const student = await Student.create(req.body);
 res.status(201).json(student);//Response 201
}
catch(err)
{
 res.status(500).json({error : err.message});//Response 500 "server error"
}
});
//GET -- Search all students
router.get("/", async(req , res) => {
 try
 {
  const student = await Student.find();
  res.json(student);
 }  
 catch(err)
 {
  res.status(500).json({error : err.message});
 } 
});
module.exports = router;